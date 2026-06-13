import pandas as pd
import numpy as np
from faker import Faker
import random
from datetime import datetime, timedelta
import os
import uuid

# Initialize Faker
fake = Faker()
Faker.seed(42)
np.random.seed(42)
random.seed(42)

# Configuration
NUM_ACCOUNTS = 10000
NUM_CONTACTS = 20000
NUM_LEADS = 50000
NUM_CAMPAIGNS = 100
START_DATE = datetime(2022, 1, 1)
END_DATE = datetime(2023, 12, 31)

REGIONS = ['North America', 'EMEA', 'APAC', 'LATAM', 'India']
INDUSTRIES = ['SaaS', 'FinTech', 'Healthcare', 'Manufacturing', 'Retail', 
              'Education', 'Logistics', 'Telecommunications', 'Cybersecurity', 'Professional Services']
CHANNELS = ['Google Ads', 'LinkedIn Ads', 'Organic Search', 'Direct', 'Referral', 
            'Outbound SDR', 'Webinars', 'Events', 'Partner', 'Email Marketing']
STAGES = ['Discovery', 'Demo', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']
TIERS = ['SMB', 'Mid-Market', 'Enterprise']

OUTPUT_DIR = "database/bronze"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def random_date(start, end):
    return start + timedelta(days=random.randint(0, (end - start).days))

print("Generating Dimensions...")

# 1. Regions
regions_df = pd.DataFrame({
    'region_id': [f"REG-{i}" for i in range(len(REGIONS))],
    'region_name': REGIONS,
    'sub_region': ['NA', 'EU', 'AP', 'LA', 'IN']
})
regions_df.to_csv(f"{OUTPUT_DIR}/raw_regions.csv", index=False)

# 2. Industries
industries_df = pd.DataFrame({
    'industry_id': [f"IND-{i}" for i in range(len(INDUSTRIES))],
    'industry_name': INDUSTRIES
})
industries_df.to_csv(f"{OUTPUT_DIR}/raw_industries.csv", index=False)

# 3. Channels
channels_df = pd.DataFrame({
    'channel_id': [f"CHN-{i}" for i in range(len(CHANNELS))],
    'channel_name': CHANNELS
})
channels_df.to_csv(f"{OUTPUT_DIR}/raw_marketing_channels.csv", index=False)

# 4. Sales Users (50 SDRs, 20 AEs, 5 Managers)
sales_users = []
for i in range(5):
    mgr_id = f"MGR-{i}"
    sales_users.append({'user_id': mgr_id, 'role': 'Manager', 'manager_id': None, 'region_id': f"REG-{i}", 'name': fake.name()})
for i in range(20):
    ae_id = f"AE-{i}"
    sales_users.append({'user_id': ae_id, 'role': 'Account Executive', 'manager_id': f"MGR-{i%5}", 'region_id': f"REG-{i%5}", 'name': fake.name()})
for i in range(50):
    sdr_id = f"SDR-{i}"
    sales_users.append({'user_id': sdr_id, 'role': 'SDR', 'manager_id': f"MGR-{i%5}", 'region_id': f"REG-{i%5}", 'name': fake.name()})

users_df = pd.DataFrame(sales_users)
users_df.to_csv(f"{OUTPUT_DIR}/raw_sales_users.csv", index=False)

# 5. Accounts
print("Generating Accounts...")
accounts = []
for i in range(NUM_ACCOUNTS):
    tier = np.random.choice(TIERS, p=[0.6, 0.3, 0.1])
    emp = random.randint(10, 100) if tier == 'SMB' else (random.randint(100, 1000) if tier == 'Mid-Market' else random.randint(1000, 10000))
    rev = emp * random.randint(100000, 500000)
    accounts.append({
        'account_id': f"ACC-{i}",
        'account_name': fake.company(),
        'industry_id': f"IND-{random.randint(0, len(INDUSTRIES)-1)}",
        'region_id': f"REG-{random.randint(0, len(REGIONS)-1)}",
        'employee_count': emp,
        'annual_revenue': rev,
        'account_tier': tier,
        'created_at': random_date(START_DATE, END_DATE)
    })
accounts_df = pd.DataFrame(accounts)
accounts_df.to_csv(f"{OUTPUT_DIR}/raw_accounts.csv", index=False)

# 6. Contacts
print("Generating Contacts...")
contacts = []
for i in range(NUM_CONTACTS):
    acc = random.choice(accounts)
    contacts.append({
        'contact_id': f"CON-{i}",
        'account_id': acc['account_id'],
        'first_name': fake.first_name(),
        'last_name': fake.last_name(),
        'email': fake.company_email(),
        'title': fake.job(),
        'created_at': random_date(acc['created_at'], END_DATE)
    })
contacts_df = pd.DataFrame(contacts)
contacts_df.to_csv(f"{OUTPUT_DIR}/raw_contacts.csv", index=False)

# 7. Campaigns
print("Generating Campaigns...")
campaigns = []
for i in range(NUM_CAMPAIGNS):
    budget = random.randint(5000, 100000)
    spend = budget * random.uniform(0.8, 1.0)
    impressions = int(spend * random.uniform(10, 100))
    clicks = int(impressions * random.uniform(0.01, 0.05))
    start_d = random_date(START_DATE, END_DATE - timedelta(days=30))
    end_d = start_d + timedelta(days=random.randint(14, 90))
    campaigns.append({
        'campaign_id': f"CMP-{i}",
        'campaign_name': f"Campaign {fake.catch_phrase()}",
        'channel_id': f"CHN-{random.randint(0, len(CHANNELS)-1)}",
        'budget': round(budget, 2),
        'spend': round(spend, 2),
        'impressions': impressions,
        'clicks': clicks,
        'start_date': start_d.date(),
        'end_date': end_d.date()
    })
campaigns_df = pd.DataFrame(campaigns)
campaigns_df.to_csv(f"{OUTPUT_DIR}/raw_campaigns.csv", index=False)

# 8. Leads and Funnel Math
print("Generating Leads and Pipeline...")
leads = []
opportunities = []
opp_history = []
touchpoints = []
sdr_activities = []

# Funnel targets
# Leads -> MQL (20-35%) -> SQL (35-55%) -> Opp (20-40%) -> Won (15-35%)
opp_count = 0
for i in range(NUM_LEADS):
    acc = random.choice(accounts)
    cmp = random.choice(campaigns)
    created_at = random_date(datetime.combine(cmp['start_date'], datetime.min.time()), END_DATE)
    
    lead_id = f"LD-{i}"
    
    # Touchpoint 1: First Touch
    touchpoints.append({
        'touchpoint_id': str(uuid.uuid4()),
        'lead_id': lead_id,
        'opportunity_id': None,
        'campaign_id': cmp['campaign_id'],
        'interaction_date': created_at,
        'interaction_type': 'Form Fill'
    })
    
    is_mql = random.random() < random.uniform(0.20, 0.35)
    is_sql = is_mql and random.random() < random.uniform(0.35, 0.55)
    is_opp = is_sql and random.random() < random.uniform(0.20, 0.40)
    
    mql_date = created_at + timedelta(days=random.randint(1, 5)) if is_mql else None
    sql_date = mql_date + timedelta(days=random.randint(1, 14)) if is_sql else None
    
    status = 'Raw'
    if is_opp: status = 'Converted'
    elif is_sql: status = 'SQL'
    elif is_mql: status = 'MQL'

    leads.append({
        'lead_id': lead_id,
        'contact_id': random.choice(contacts)['contact_id'] if random.random() > 0.5 else None,
        'account_id': acc['account_id'],
        'campaign_id': cmp['campaign_id'],
        'status': status,
        'created_at': created_at,
        'mql_date': mql_date,
        'sql_date': sql_date,
        'is_converted': is_opp
    })

    # SDR Activities
    if is_mql:
        sdr = random.choice([u for u in sales_users if u['role'] == 'SDR'])
        for _ in range(random.randint(2, 8)):
            act_date = mql_date + timedelta(days=random.randint(0, 10))
            sdr_activities.append({
                'activity_id': str(uuid.uuid4()),
                'sdr_id': sdr['user_id'],
                'lead_id': lead_id,
                'activity_type': random.choice(['Call', 'Email', 'LinkedIn']),
                'activity_date': act_date
            })
    
    if is_opp:
        opp_id = f"OPP-{opp_count}"
        opp_count += 1
        ae = random.choice([u for u in sales_users if u['role'] == 'Account Executive'])
        
        # Additional Touchpoints before Opp creation
        touchpoints.append({
            'touchpoint_id': str(uuid.uuid4()),
            'lead_id': lead_id,
            'opportunity_id': opp_id,
            'campaign_id': random.choice(campaigns)['campaign_id'],
            'interaction_date': sql_date - timedelta(days=random.randint(1, 5)),
            'interaction_type': 'Webinar'
        })
        
        # Enterprise accounts have higher ACV and longer cycles
        is_ent = acc['account_tier'] == 'Enterprise'
        base_arr = random.randint(50000, 250000) if is_ent else random.randint(5000, 25000)
        contract_months = random.choice([12, 24, 36])
        tcv = base_arr * (contract_months / 12.0)
        mrr = base_arr / 12.0
        
        cycle_days = random.randint(60, 180) if is_ent else random.randint(14, 60)
        
        is_won = random.random() < random.uniform(0.15, 0.35)
        is_closed = is_won or (random.random() < 0.6) # some are still open
        
        final_stage = 'Closed Won' if is_won else ('Closed Lost' if is_closed else random.choice(['Discovery', 'Demo', 'Proposal', 'Negotiation']))
        
        # Generate stage history
        current_date = sql_date
        stages_flow = ['Discovery', 'Demo', 'Proposal', 'Negotiation']
        for stage in stages_flow:
            next_date = current_date + timedelta(days=random.randint(1, max(2, int(cycle_days/4)+1)))
            opp_history.append({
                'history_id': str(uuid.uuid4()),
                'opportunity_id': opp_id,
                'from_stage': stage,
                'to_stage': None, # handled below conceptually
                'change_date': current_date
            })
            if stage == final_stage:
                break
            current_date = next_date
            if current_date > END_DATE:
                break
                
        # If closed, add final history
        close_date = None
        if is_closed and current_date <= END_DATE:
            close_date = current_date
            opp_history.append({
                'history_id': str(uuid.uuid4()),
                'opportunity_id': opp_id,
                'from_stage': final_stage,
                'to_stage': final_stage,
                'change_date': close_date
            })
            
        fc = 'Closed' if is_closed else random.choice(['Commit', 'Upside', 'Best Case', 'Pipeline'])
        if is_won: fc = 'Closed'
        
        opportunities.append({
            'opportunity_id': opp_id,
            'account_id': acc['account_id'],
            'owner_id': ae['user_id'],
            'lead_source_id': cmp['campaign_id'],
            'amount': round(base_arr, 2),
            'tcv': round(tcv, 2),
            'mrr': round(mrr, 2),
            'contract_months': contract_months,
            'stage': final_stage,
            'forecast_category': fc,
            'win_probability': 1.0 if is_won else (0.0 if is_closed else random.uniform(0.1, 0.8)),
            'created_date': sql_date,
            'close_date': close_date,
            'renewal_date': close_date + timedelta(days=contract_months*30) if (is_won and close_date) else None,
            'is_won': is_won,
            'is_closed': is_closed
        })

leads_df = pd.DataFrame(leads)
leads_df.to_csv(f"{OUTPUT_DIR}/raw_leads.csv", index=False)

opps_df = pd.DataFrame(opportunities)
opps_df.to_csv(f"{OUTPUT_DIR}/raw_opportunities.csv", index=False)

hist_df = pd.DataFrame(opp_history)
hist_df.to_csv(f"{OUTPUT_DIR}/raw_opportunity_history.csv", index=False)

touch_df = pd.DataFrame(touchpoints)
touch_df.to_csv(f"{OUTPUT_DIR}/raw_attribution_touchpoints.csv", index=False)

sdr_df = pd.DataFrame(sdr_activities)
sdr_df.to_csv(f"{OUTPUT_DIR}/raw_sdr_activities.csv", index=False)

print(f"Data Generation Complete! Created {opp_count} Opportunities.")
