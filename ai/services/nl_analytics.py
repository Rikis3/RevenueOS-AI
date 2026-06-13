import os
import duckdb
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from ai.models.common import NLQueryResult
from ai.prompts.prompts import NL_SQL_PROMPT_TEMPLATE

load_dotenv()

class NaturalLanguageAnalytics:
    def __init__(self, db_path='database/revenueos.duckdb'):
        self.db_path = db_path
        self.api_key = os.getenv("OPENAI_API_KEY", "mock-key")
        self.schema = """
        gold_fact_executive_kpis (reporting_month, net_new_arr, won_deals, total_marketing_spend, pipeline_created, blended_cac, pipeline_coverage_ratio, marketing_roi)
        gold_fact_campaign_roi (campaign_id, campaign_name, channel_name, spend, impressions, clicks, leads_generated, mqls_generated, opportunities_generated, pipeline_generated, revenue_generated, cost_per_lead, cost_per_mql, cost_per_opportunity, roi_pct, roas)
        """
        
    def ask_question(self, question: str):
        if self.api_key == "mock-key":
            return NLQueryResult(
                generated_sql="SELECT campaign_name, revenue_generated FROM gold_fact_campaign_roi ORDER BY revenue_generated DESC LIMIT 1;",
                business_explanation="This query looks at the Campaign ROI table and sorts by total revenue generated to find the single most profitable marketing campaign."
            )
            
        llm = ChatOpenAI(model="gpt-4o", temperature=0.0).with_structured_output(NLQueryResult)
        prompt = PromptTemplate.from_template(NL_SQL_PROMPT_TEMPLATE)
        chain = prompt | llm
        
        return chain.invoke({
            "schema_context": self.schema,
            "user_question": question
        })

if __name__ == "__main__":
    nla = NaturalLanguageAnalytics()
    print(nla.ask_question("Which campaign generated the highest revenue?").model_dump_json(indent=2))
