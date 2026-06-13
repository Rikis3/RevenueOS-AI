from pydantic import BaseModel, Field
from typing import List, Optional

class WBRSummary(BaseModel):
    executive_summary: str = Field(description="A 2-3 sentence high-level summary of business performance.")
    wins: List[str] = Field(description="Top 3 positive highlights backed by metrics.")
    risks: List[str] = Field(description="Top 3 areas of concern backed by metrics.")
    recommendations: List[str] = Field(description="Top 3 actionable recommendations to address risks or accelerate wins.")

class RevenueRisk(BaseModel):
    risk_category: str = Field(description="e.g., Pipeline Coverage, Stage Aging, Win Rate.")
    description: str = Field(description="Detailed explanation of the risk.")
    impacted_metric: str = Field(description="The specific metric at risk.")
    root_cause: str = Field(description="The underlying cause found in the data.")
    severity: str = Field(description="High, Medium, or Low")

class RiskReport(BaseModel):
    summary: str = Field(description="Executive summary of current risk exposure.")
    identified_risks: List[RevenueRisk]

class ForecastInsight(BaseModel):
    expected_revenue: float
    commit_forecast: float
    best_case_forecast: float
    upside_forecast: float
    confidence_score: int = Field(description="Score from 0-100 indicating confidence in hitting the forecast.")
    driving_factors: List[str] = Field(description="What is pushing the forecast up or down.")
    key_deals_at_risk: List[str] = Field(description="Deals that could swing the forecast.")
    explanation: str = Field(description="Narrative explanation of the forecast.")

class NextBestAction(BaseModel):
    action_type: str = Field(description="e.g., Marketing Allocation, Sales Coaching, Pipeline Generation.")
    recommendation: str = Field(description="Specific recommended action.")
    supporting_metric: str = Field(description="The exact metric backing this recommendation.")
    expected_impact: str = Field(description="What will happen if this action is taken.")

class ActionPlan(BaseModel):
    actions: List[NextBestAction]

class AttributionNarrative(BaseModel):
    narrative: str = Field(description="A compelling business explanation of the attribution differences.")
    first_touch_highlight: str
    multi_touch_highlight: str
    budget_recommendation: str

class NLQueryResult(BaseModel):
    generated_sql: str = Field(description="The DuckDB SQL query generated to answer the question.")
    business_explanation: str = Field(description="A plain-English explanation of the results.")

class KPINarrative(BaseModel):
    metric_name: str
    current_value: str
    narrative: str = Field(description="Why is this metric performing the way it is? What is the context?")
