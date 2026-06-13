from fastapi import APIRouter
from api.database import fetch_all_as_dict

router = APIRouter()

@router.get("/summary")
def get_forecast_summary():
    query = """
        SELECT 
            SUM(expected_revenue) as total_expected_revenue,
            SUM(total_pipeline_amount) as total_open_pipeline
        FROM gold_fact_forecast_inputs
    """
    return fetch_all_as_dict(query)

@router.get("/stage-breakdown")
def get_stage_breakdown():
    query = "SELECT * FROM gold_fact_forecast_inputs ORDER BY expected_revenue DESC"
    return fetch_all_as_dict(query)

@router.get("/confidence")
def get_forecast_confidence():
    query = """
        SELECT 
            forecast_category, 
            SUM(expected_revenue) as expected,
            SUM(total_pipeline_amount) as stated
        FROM gold_fact_forecast_inputs
        GROUP BY 1
    """
    return fetch_all_as_dict(query)

@router.get("/risk-drivers")
def get_risk_drivers():
    # Identify stages where stated pipeline is high but expected revenue is low
    query = """
        SELECT 
            stage,
            total_pipeline_amount,
            expected_revenue,
            (total_pipeline_amount - expected_revenue) as risk_gap
        FROM gold_fact_forecast_inputs
        ORDER BY risk_gap DESC
    """
    return fetch_all_as_dict(query)
