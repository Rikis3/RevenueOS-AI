from fastapi import APIRouter
from api.database import fetch_all_as_dict

router = APIRouter()

@router.get("/kpis")
def get_executive_kpis():
    """
    Returns the executive macro metrics.
    Includes: ARR, MRR, Pipeline, Forecast, Coverage, Marketing ROI, Win Rate.
    """
    query = """
        SELECT 
            reporting_month,
            net_new_arr,
            won_deals,
            total_marketing_spend,
            pipeline_created,
            blended_cac,
            pipeline_coverage_ratio,
            marketing_roi
        FROM gold_fact_executive_kpis
        ORDER BY reporting_month DESC
    """
    return fetch_all_as_dict(query)
