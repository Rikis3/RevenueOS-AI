import os
import duckdb
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from ai.models.common import ForecastInsight
from ai.prompts.prompts import FORECAST_PROMPT_TEMPLATE

load_dotenv()

class ForecastIntelligence:
    def __init__(self, db_path='database/revenueos.duckdb'):
        self.db_path = db_path
        self.api_key = os.getenv("OPENAI_API_KEY", "mock-key")
        
    def _fetch_data(self):
        try:
            con = duckdb.connect(self.db_path)
            forecast = con.execute("SELECT * FROM gold_fact_forecast_inputs").fetchdf()
            con.close()
            return forecast.to_string(index=False)
        except Exception as e:
            return f"Error fetching data: {str(e)}"

    def analyze_forecast(self):
        data_context = self._fetch_data()
        
        if self.api_key == "mock-key":
            return ForecastInsight(
                expected_revenue=1850000.0,
                commit_forecast=2100000.0,
                best_case_forecast=2500000.0,
                upside_forecast=3000000.0,
                confidence_score=65,
                driving_factors=["High volume of deals stuck in 'Demo' stage", "Commit forecast outpaces mathematical probability"],
                key_deals_at_risk=["Enterprise deal in EMEA stalling"],
                explanation="The sales team has committed $2.1M, but the statistical expected revenue is only $1.85M due to a high concentration of early-stage pipeline. The confidence score is 65%."
            )
            
        llm = ChatOpenAI(model="gpt-4o", temperature=0.1).with_structured_output(ForecastInsight)
        prompt = PromptTemplate.from_template(FORECAST_PROMPT_TEMPLATE)
        chain = prompt | llm
        
        return chain.invoke({"data_context": data_context})

if __name__ == "__main__":
    fi = ForecastIntelligence()
    print(fi.analyze_forecast().model_dump_json(indent=2))
