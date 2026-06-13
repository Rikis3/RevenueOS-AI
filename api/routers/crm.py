from fastapi import APIRouter, HTTPException
from api.database import fetch_all_as_dict

router = APIRouter()

# ----------------- ACCOUNTS -----------------
@router.get("/accounts")
def list_accounts():
    query = """
        SELECT account_id, account_name, industry_name, region_name, employee_count, annual_revenue, account_tier
        FROM dim_account
        ORDER BY annual_revenue DESC NULLS LAST
        LIMIT 100
    """
    return fetch_all_as_dict(query)

@router.get("/accounts/{account_id}")
def get_account_360(account_id: str):
    account_query = f"SELECT * FROM dim_account WHERE account_id = '{account_id}'"
    account = fetch_all_as_dict(account_query)
    
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    opps_query = f"SELECT * FROM fct_opportunities WHERE account_id = '{account_id}' ORDER BY created_date DESC"
    contacts_query = f"SELECT * FROM dim_contact WHERE account_id = '{account_id}'"
    
    return {
        "account": account[0],
        "opportunities": fetch_all_as_dict(opps_query),
        "contacts": fetch_all_as_dict(contacts_query)
    }

# ----------------- OPPORTUNITIES -----------------
@router.get("/opportunities")
def list_opportunities():
    query = """
        SELECT o.opportunity_id, o.amount, o.stage, o.forecast_category, o.win_probability, o.close_date, a.account_name
        FROM fct_opportunities o
        LEFT JOIN dim_account a ON o.account_id = a.account_id
        ORDER BY o.amount DESC NULLS LAST
        LIMIT 100
    """
    return fetch_all_as_dict(query)

@router.get("/opportunities/{opportunity_id}")
def get_opportunity_detail(opportunity_id: str):
    opp_query = f"""
        SELECT o.*, a.account_name, a.industry_name 
        FROM fct_opportunities o
        LEFT JOIN dim_account a ON o.account_id = a.account_id
        WHERE opportunity_id = '{opportunity_id}'
    """
    opp = fetch_all_as_dict(opp_query)
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    history_query = f"SELECT * FROM fct_opportunity_history WHERE opportunity_id = '{opportunity_id}' ORDER BY change_date DESC"
    
    return {
        "opportunity": opp[0],
        "history": fetch_all_as_dict(history_query)
    }

# ----------------- CAMPAIGNS -----------------
@router.get("/campaigns")
def list_campaigns():
    query = "SELECT * FROM dim_campaign ORDER BY start_date DESC LIMIT 100"
    return fetch_all_as_dict(query)

@router.get("/campaigns/{campaign_id}")
def get_campaign_detail(campaign_id: str):
    camp_query = f"SELECT * FROM dim_campaign WHERE campaign_id = '{campaign_id}'"
    camp = fetch_all_as_dict(camp_query)
    if not camp:
        raise HTTPException(status_code=404, detail="Campaign not found")

    leads_query = f"SELECT * FROM fct_leads WHERE campaign_id = '{campaign_id}'"
    
    return {
        "campaign": camp[0],
        "leads_generated": fetch_all_as_dict(leads_query)
    }

# ----------------- CONTACTS, LEADS, ACTIVITIES -----------------
@router.get("/contacts")
def list_contacts():
    query = "SELECT c.*, a.account_name FROM dim_contact c LEFT JOIN dim_account a ON c.account_id = a.account_id LIMIT 100"
    return fetch_all_as_dict(query)

@router.get("/leads")
def list_leads():
    query = "SELECT * FROM fct_leads ORDER BY created_at DESC LIMIT 100"
    return fetch_all_as_dict(query)

@router.get("/activities")
def list_activities():
    query = "SELECT * FROM fct_sdr_activities ORDER BY activity_date DESC LIMIT 100"
    return fetch_all_as_dict(query)
