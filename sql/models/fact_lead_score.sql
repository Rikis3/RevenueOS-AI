-- Model: fact_lead_score
-- Purpose: Generates a 0-100 propensity score for Leads based on demographic and behavioral data.

CREATE OR REPLACE TABLE gold_fact_lead_score AS
WITH base_scoring AS (
    SELECT 
        l.lead_id,
        l.account_id,
        -- Demographic Score (Max 40 points)
        CASE 
            WHEN a.account_tier = 'Enterprise' THEN 40
            WHEN a.account_tier = 'Mid-Market' THEN 25
            ELSE 10 
        END AS demographic_score,
        
        -- Behavioral Score (Max 60 points based on touchpoints)
        LEAST(60, COALESCE((SELECT COUNT(*) FROM fct_attribution_touchpoints t WHERE t.lead_id = l.lead_id) * 15, 0)) AS behavioral_score

    FROM fct_leads l
    LEFT JOIN dim_account a ON l.account_id = a.account_id
)
SELECT 
    lead_id,
    account_id,
    demographic_score,
    behavioral_score,
    (demographic_score + behavioral_score) AS total_lead_score,
    CASE 
        WHEN (demographic_score + behavioral_score) >= 80 THEN 'A - Hot'
        WHEN (demographic_score + behavioral_score) >= 50 THEN 'B - Warm'
        ELSE 'C - Cold'
    END AS lead_grade
FROM base_scoring;
