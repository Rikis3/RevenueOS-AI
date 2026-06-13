import os
import duckdb
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from ai.models.common import RiskReport, RevenueRisk
from ai.prompts.prompts import RISK_DETECTOR_PROMPT_TEMPLATE

load_dotenv()

class RiskDetector:
    def __init__(self, db_path='database/revenueos.duckdb'):
        self.db_path = db_path
        self.api_key = os.getenv("OPENAI_API_KEY", "mock-key")
        
    def _fetch_data(self):
        try:
            con = duckdb.connect(self.db_path)
            health = con.execute("SELECT * FROM gold_fact_account_health WHERE account_risk_score > 60 LIMIT 5").fetchdf()
            leakage = con.execute("SELECT * FROM gold_fact_funnel_leakage ORDER BY cohort_month DESC LIMIT 1").fetchdf()
            con.close()
            return f"Account Health Risks:\n{health.to_string(index=False)}\n\nRecent Funnel Leakage:\n{leakage.to_string(index=False)}"
        except Exception as e:
            return f"Error fetching data: {str(e)}"

    def detect_risks(self):
        data_context = self._fetch_data()
        
        if self.api_key == "mock-key":
            return RiskReport(
                summary="Critical risk identified in Enterprise account engagement and mid-funnel conversion.",
                identified_risks=[
                    RevenueRisk(
                        risk_category="Account Health",
                        description="3 Enterprise opportunities have no SDR activity in 14+ days.",
                        impacted_metric="Open Pipeline",
                        root_cause="AE/SDR alignment gap on Tier 1 target accounts.",
                        severity="High"
                    )
                ]
            )
            
        llm = ChatOpenAI(model="gpt-4o", temperature=0.1).with_structured_output(RiskReport)
        prompt = PromptTemplate.from_template(RISK_DETECTOR_PROMPT_TEMPLATE)
        chain = prompt | llm
        
        return chain.invoke({"data_context": data_context})

if __name__ == "__main__":
    detector = RiskDetector()
    print(detector.detect_risks().model_dump_json(indent=2))
