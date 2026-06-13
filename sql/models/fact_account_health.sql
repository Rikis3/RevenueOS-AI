-- Model: fact_account_health
-- Purpose: Consolidates engagement, open pipeline, and activity metrics to score account health.

CREATE OR REPLACE TABLE gold_fact_account_health AS
WITH account_pipeline AS (
    SELECT 
        account_id,
        COUNT(opportunity_id) AS open_opportunities,
        SUM(amount) AS total_open_pipeline
    FROM fct_opportunities
    WHERE is_closed = FALSE
    GROUP BY 1
),
account_activity AS (
    SELECT 
        l.account_id,
        COUNT(a.activity_id) AS total_sdr_activities,
        MAX(a.activity_date) AS last_activity_date
    FROM fct_sdr_activities a
    JOIN fct_leads l ON a.lead_id = l.lead_id
    GROUP BY 1
)
SELECT 
    dim.account_id,
    dim.account_name,
    dim.account_tier,
    COALESCE(p.open_opportunities, 0) AS open_opportunities,
    COALESCE(p.total_open_pipeline, 0) AS total_open_pipeline,
    COALESCE(act.total_sdr_activities, 0) AS historical_activities,
    act.last_activity_date,
    
    -- Risk Score Logic (0 = No Risk, 100 = High Risk)
    CASE 
        WHEN p.open_opportunities > 0 AND (DATE_DIFF('day', act.last_activity_date, CURRENT_DATE()) > 14 OR act.last_activity_date IS NULL) THEN 80
        WHEN p.open_opportunities > 0 THEN 20
        ELSE 50
    END AS account_risk_score
    
FROM dim_account dim
LEFT JOIN account_pipeline p ON dim.account_id = p.account_id
LEFT JOIN account_activity act ON dim.account_id = act.account_id;
