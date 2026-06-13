from fastapi import APIRouter
from api.database import fetch_all_as_dict

router = APIRouter()

@router.get("/first-touch")
def get_first_touch():
    query = "SELECT campaign_name, sum_first_touch_revenue FROM gold_fact_attribution_engine ORDER BY sum_first_touch_revenue DESC"
    return fetch_all_as_dict(query)

@router.get("/last-touch")
def get_last_touch():
    query = "SELECT campaign_name, sum_last_touch_revenue FROM gold_fact_attribution_engine ORDER BY sum_last_touch_revenue DESC"
    return fetch_all_as_dict(query)

@router.get("/linear")
def get_linear():
    query = "SELECT campaign_name, sum_linear_revenue FROM gold_fact_attribution_engine ORDER BY sum_linear_revenue DESC"
    return fetch_all_as_dict(query)

@router.get("/u-shaped")
def get_u_shaped():
    query = "SELECT campaign_name, sum_multi_touch_revenue FROM gold_fact_attribution_engine ORDER BY sum_multi_touch_revenue DESC"
    return fetch_all_as_dict(query)

@router.get("/comparison")
def get_attribution_comparison():
    query = "SELECT * FROM gold_fact_attribution_engine"
    return fetch_all_as_dict(query)
