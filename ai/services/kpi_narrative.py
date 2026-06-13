import os
import duckdb
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from ai.models.common import KPINarrative
from ai.prompts.prompts import KPI_NARRATIVE_PROMPT_TEMPLATE

load_dotenv()

class KPINarrativeGenerator:
    def __init__(self, db_path='database/revenueos.duckdb'):
        self.db_path = db_path
        self.api_key = os.getenv("OPENAI_API_KEY", "mock-key")
        
    def _fetch_data(self):
        try:
            con = duckdb.connect(self.db_path)
            kpis = con.execute("SELECT * FROM gold_fact_executive_kpis ORDER BY reporting_month DESC LIMIT 2").fetchdf()
            con.close()
            return kpis.to_string(index=False)
        except Exception as e:
            return f"Error fetching data: {str(e)}"

    def explain_kpi(self, metric_name: str, metric_value: str):
        data_context = self._fetch_data()
        
        if self.api_key == "mock-key":
            return KPINarrative(
                metric_name=metric_name,
                current_value=metric_value,
                narrative=f"The {metric_name} is currently {metric_value}. This represents a slight decline from the previous month, driven primarily by lower top-of-funnel conversion rates despite stable marketing spend. To improve this, focus should shift to mid-funnel enablement."
            )
            
        llm = ChatOpenAI(model="gpt-4o", temperature=0.3).with_structured_output(KPINarrative)
        prompt = PromptTemplate.from_template(KPI_NARRATIVE_PROMPT_TEMPLATE)
        chain = prompt | llm
        
        return chain.invoke({
            "metric_name": metric_name,
            "metric_value": metric_value,
            "data_context": data_context
        })

if __name__ == "__main__":
    kpi_gen = KPINarrativeGenerator()
    print(kpi_gen.explain_kpi("Pipeline Coverage Ratio", "2.8x").model_dump_json(indent=2))
