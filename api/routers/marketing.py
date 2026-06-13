from fastapi import APIRouter
from api.database import fetch_all_as_dict

router = APIRouter()

@router.get("/campaign-roi")
def get_campaign_roi():
    query = "SELECT * FROM gold_fact_campaign_roi ORDER BY roi_pct DESC"
    return fetch_all_as_dict(query)

@router.get("/attribution")
def get_marketing_attribution():
    query = "SELECT * FROM gold_fact_attribution_engine"
    return fetch_all_as_dict(query)

@router.get("/channel-performance")
def get_channel_performance():
    query = """
        SELECT 
            channel_name, 
            SUM(spend) as total_spend,
            SUM(pipeline_generated) as total_pipeline,
            SUM(revenue_generated) as total_revenue,
            AVG(roi_pct) as avg_roi
        FROM gold_fact_campaign_roi 
        GROUP BY 1 
        ORDER BY total_revenue DESC
    """
    return fetch_all_as_dict(query)

@router.get("/funnel")
def get_marketing_funnel():
    query = "SELECT * FROM gold_fact_lead_funnel ORDER BY cohort_month DESC"
    return fetch_all_as_dict(query)
