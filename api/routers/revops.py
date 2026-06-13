from fastapi import APIRouter
from api.database import fetch_all_as_dict

router = APIRouter()

@router.get("/pipeline-velocity")
def get_pipeline_velocity():
    query = "SELECT * FROM gold_fact_pipeline_velocity ORDER BY daily_pipeline_velocity DESC"
    return fetch_all_as_dict(query)

@router.get("/funnel-leakage")
def get_funnel_leakage():
    query = "SELECT * FROM gold_fact_funnel_leakage ORDER BY cohort_month DESC"
    return fetch_all_as_dict(query)

@router.get("/account-health")
def get_account_health():
    query = "SELECT * FROM gold_fact_account_health ORDER BY account_risk_score DESC"
    return fetch_all_as_dict(query)

@router.get("/sdr-performance")
def get_sdr_performance():
    query = "SELECT * FROM gold_fact_sdr_performance ORDER BY pipeline_generated DESC"
    return fetch_all_as_dict(query)
