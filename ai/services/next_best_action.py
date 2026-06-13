import os
import duckdb
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from ai.models.common import ActionPlan, NextBestAction
from ai.prompts.prompts import NBA_PROMPT_TEMPLATE

load_dotenv()

class NextBestActionEngine:
    def __init__(self, db_path='database/revenueos.duckdb'):
        self.db_path = db_path
        self.api_key = os.getenv("OPENAI_API_KEY", "mock-key")
        
    def _fetch_data(self):
        try:
            con = duckdb.connect(self.db_path)
            roi = con.execute("SELECT * FROM gold_fact_campaign_roi ORDER BY roi_pct DESC LIMIT 3").fetchdf()
            con.close()
            return f"Top Campaigns by ROI:\n{roi.to_string(index=False)}"
        except Exception as e:
            return f"Error fetching data: {str(e)}"

    def generate_actions(self):
        data_context = self._fetch_data()
        
        if self.api_key == "mock-key":
            return ActionPlan(
                actions=[
                    NextBestAction(
                        action_type="Marketing Allocation",
                        recommendation="Reallocate $50k budget from Google Ads to LinkedIn Campaigns.",
                        supporting_metric="LinkedIn campaigns show a 4.2x ROAS compared to Google Ads' 1.5x.",
                        expected_impact="Expected to generate an additional $135k in pipeline next quarter."
                    )
                ]
            )
            
        llm = ChatOpenAI(model="gpt-4o", temperature=0.2).with_structured_output(ActionPlan)
        prompt = PromptTemplate.from_template(NBA_PROMPT_TEMPLATE)
        chain = prompt | llm
        
        return chain.invoke({"data_context": data_context})

if __name__ == "__main__":
    nba = NextBestActionEngine()
    print(nba.generate_actions().model_dump_json(indent=2))
