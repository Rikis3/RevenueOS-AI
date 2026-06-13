-- RevenueOS Data Warehouse Schema (DuckDB)
-- Run this script via DuckDB CLI or seed_data.py after CSVs are generated.

---------------------------------------------------------
-- 1. BRONZE LAYER (RAW DATA INGESTION)
---------------------------------------------------------
-- DuckDB can read CSVs directly, but we will create persistent tables
-- to hold the raw data for performance and explicit typing.

CREATE TABLE IF NOT EXISTS raw_regions (
    region_id VARCHAR,
    region_name VARCHAR,
    sub_region VARCHAR
);

CREATE TABLE IF NOT EXISTS raw_industries (
    industry_id VARCHAR,
    industry_name VARCHAR
);

CREATE TABLE IF NOT EXISTS raw_marketing_channels (
    channel_id VARCHAR,
    channel_name VARCHAR
);

CREATE TABLE IF NOT EXISTS raw_sales_users (
    user_id VARCHAR,
    role VARCHAR,
    manager_id VARCHAR,
    region_id VARCHAR,
    name VARCHAR
);

CREATE TABLE IF NOT EXISTS raw_accounts (
    account_id VARCHAR,
    account_name VARCHAR,
    industry_id VARCHAR,
    region_id VARCHAR,
    employee_count INT,
    annual_revenue DECIMAL(18, 2),
    account_tier VARCHAR,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS raw_contacts (
    contact_id VARCHAR,
    account_id VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    title VARCHAR,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS raw_campaigns (
    campaign_id VARCHAR,
    campaign_name VARCHAR,
    channel_id VARCHAR,
    budget DECIMAL(18, 2),
    spend DECIMAL(18, 2),
    impressions INT,
    clicks INT,
    start_date DATE,
    end_date DATE
);

CREATE TABLE IF NOT EXISTS raw_leads (
    lead_id VARCHAR,
    contact_id VARCHAR,
    account_id VARCHAR,
    campaign_id VARCHAR, -- First touch source
    status VARCHAR,
    created_at TIMESTAMP,
    mql_date TIMESTAMP,
    sql_date TIMESTAMP,
    is_converted BOOLEAN
);

CREATE TABLE IF NOT EXISTS raw_opportunities (
    opportunity_id VARCHAR,
    account_id VARCHAR,
    owner_id VARCHAR, -- AE ID
    lead_source_id VARCHAR, -- Campaign ID
    amount DECIMAL(18, 2), -- ACV/ARR representation
    tcv DECIMAL(18, 2),
    mrr DECIMAL(18, 2),
    contract_months INT,
    stage VARCHAR,
    forecast_category VARCHAR,
    win_probability DECIMAL(5, 2),
    created_date TIMESTAMP,
    close_date TIMESTAMP,
    renewal_date TIMESTAMP,
    is_won BOOLEAN,
    is_closed BOOLEAN
);

CREATE TABLE IF NOT EXISTS raw_opportunity_history (
    history_id VARCHAR,
    opportunity_id VARCHAR,
    from_stage VARCHAR,
    to_stage VARCHAR,
    change_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS raw_attribution_touchpoints (
    touchpoint_id VARCHAR,
    lead_id VARCHAR,
    opportunity_id VARCHAR,
    campaign_id VARCHAR,
    interaction_date TIMESTAMP,
    interaction_type VARCHAR
);

CREATE TABLE IF NOT EXISTS raw_sdr_activities (
    activity_id VARCHAR,
    sdr_id VARCHAR,
    lead_id VARCHAR,
    activity_type VARCHAR, -- Call, Email, Meeting, Demo
    activity_date TIMESTAMP
);

---------------------------------------------------------
-- 2. SILVER LAYER (CONFORMED VIEWS)
---------------------------------------------------------
-- In a true Medallion architecture, Silver is cleaned, deduplicated, 
-- and typed correctly. We use views over Bronze for simplicity here.

-- Date Dimension (Generated via DuckDB sequence)
CREATE OR REPLACE VIEW dim_date AS
SELECT 
    CAST(d AS DATE) AS date_id,
    EXTRACT(YEAR FROM d) AS calendar_year,
    EXTRACT(MONTH FROM d) AS calendar_month,
    EXTRACT(QUARTER FROM d) AS calendar_quarter,
    EXTRACT(DAY FROM d) AS calendar_day
FROM generate_series(DATE '2022-01-01', DATE '2026-12-31', INTERVAL 1 DAY) AS t(d);

CREATE OR REPLACE VIEW dim_region AS SELECT * FROM raw_regions;
CREATE OR REPLACE VIEW dim_marketing_channel AS SELECT * FROM raw_marketing_channels;

CREATE OR REPLACE VIEW dim_campaign AS 
SELECT 
    c.campaign_id,
    c.campaign_name,
    m.channel_name,
    c.budget,
    c.spend,
    c.impressions,
    c.clicks,
    -- CTR calculation
    CASE WHEN c.impressions > 0 THEN CAST(c.clicks AS DOUBLE) / c.impressions ELSE 0 END AS ctr,
    -- CPC calculation
    CASE WHEN c.clicks > 0 THEN c.spend / c.clicks ELSE 0 END AS cpc,
    c.start_date,
    c.end_date
FROM raw_campaigns c
LEFT JOIN raw_marketing_channels m ON c.channel_id = m.channel_id;

CREATE OR REPLACE VIEW dim_sales_team AS SELECT * FROM raw_sales_users;

CREATE OR REPLACE VIEW dim_account AS 
SELECT 
    a.account_id,
    a.account_name,
    i.industry_name,
    r.region_name,
    a.employee_count,
    a.annual_revenue,
    a.account_tier,
    a.created_at
FROM raw_accounts a
LEFT JOIN raw_industries i ON a.industry_id = i.industry_id
LEFT JOIN raw_regions r ON a.region_id = r.region_id;

CREATE OR REPLACE VIEW dim_contact AS SELECT * FROM raw_contacts;

-- Fact Tables
CREATE OR REPLACE VIEW fct_leads AS SELECT * FROM raw_leads;
CREATE OR REPLACE VIEW fct_opportunities AS SELECT * FROM raw_opportunities;
CREATE OR REPLACE VIEW fct_opportunity_history AS SELECT * FROM raw_opportunity_history;
CREATE OR REPLACE VIEW fct_attribution_touchpoints AS SELECT * FROM raw_attribution_touchpoints;
CREATE OR REPLACE VIEW fct_sdr_activities AS SELECT * FROM raw_sdr_activities;
