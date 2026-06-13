import os
import duckdb
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from ai.models.common import WBRSummary
from ai.prompts.prompts import WBR_PROMPT_TEMPLATE

load_dotenv()

class WBRGenerator:
    def __init__(self, db_path='database/revenueos.duckdb'):
        self.db_path = db_path
        # Requires OPENAI_API_KEY in .env. Using mock logic if unavailable for demo purposes.
        self.api_key = os.getenv("OPENAI_API_KEY", "mock-key")
        
    def _fetch_data(self):
        try:
            con = duckdb.connect(self.db_path)
            kpis = con.execute("SELECT * FROM gold_fact_executive_kpis ORDER BY reporting_month DESC LIMIT 3").fetchdf()
            con.close()
            return kpis.to_string(index=False)
        except Exception as e:
            return f"Error fetching data: {str(e)}"

    def generate_wbr(self):
        data_context = self._fetch_data()
        
        if self.api_key == "mock-key":
            # Return mock for local execution without API key
            return WBRSummary(
                executive_summary="Pipeline increased 12% month-over-month while Marketing ROI stabilized.",
                wins=["Blended CAC decreased by 5%", "Net New ARR hit quarterly target"],
                risks=["Pipeline coverage dropped to 2.8x, indicating future risk"],
                recommendations=["Increase top-of-funnel LinkedIn spend to rebuild coverage ratio"]
            )
        
        llm = ChatOpenAI(model="gpt-4o", temperature=0.2).with_structured_output(WBRSummary)
        prompt = PromptTemplate.from_template(WBR_PROMPT_TEMPLATE)
        chain = prompt | llm
        
        return chain.invoke({"data_context": data_context})

if __name__ == "__main__":
    wbr = WBRGenerator()
    print(wbr.generate_wbr().model_dump_json(indent=2))
