import os
import duckdb
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from ai.models.common import AttributionNarrative
from ai.prompts.prompts import ATTRIBUTION_PROMPT_TEMPLATE

load_dotenv()

class AttributionNarrativeGenerator:
    def __init__(self, db_path='database/revenueos.duckdb'):
        self.db_path = db_path
        self.api_key = os.getenv("OPENAI_API_KEY", "mock-key")
        
    def _fetch_data(self):
        try:
            con = duckdb.connect(self.db_path)
            attrib = con.execute("SELECT * FROM gold_fact_attribution_engine LIMIT 5").fetchdf()
            con.close()
            return attrib.to_string(index=False)
        except Exception as e:
            return f"Error fetching data: {str(e)}"

    def generate_narrative(self):
        data_context = self._fetch_data()
        
        if self.api_key == "mock-key":
            return AttributionNarrative(
                narrative="While Paid Search drives the highest volume of first-touch conversions, Webinars act as the critical mid-funnel accelerator, heavily influencing multi-touch revenue.",
                first_touch_highlight="Paid Search generated $1.2M in First-Touch Revenue.",
                multi_touch_highlight="Webinars influenced $2.8M in Multi-Touch (U-Shaped) Revenue despite $0 First-Touch.",
                budget_recommendation="Maintain Paid Search for top-of-funnel volume, but increase Webinar production budget by 15% to accelerate mid-funnel velocity."
            )
            
        llm = ChatOpenAI(model="gpt-4o", temperature=0.3).with_structured_output(AttributionNarrative)
        prompt = PromptTemplate.from_template(ATTRIBUTION_PROMPT_TEMPLATE)
        chain = prompt | llm
        
        return chain.invoke({"data_context": data_context})

if __name__ == "__main__":
    ang = AttributionNarrativeGenerator()
    print(ang.generate_narrative().model_dump_json(indent=2))
