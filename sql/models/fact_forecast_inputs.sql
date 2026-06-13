-- Model: fact_forecast_inputs
-- Purpose: Aggregates current pipeline by stage and forecast category to predict end-of-quarter revenue.

CREATE OR REPLACE TABLE gold_fact_forecast_inputs AS
WITH current_pipeline AS (
    SELECT 
        o.forecast_category,
        o.stage,
        a.region_name,
        COUNT(o.opportunity_id) AS opp_count,
        SUM(o.amount) AS total_pipeline_amount
    FROM fct_opportunities o
    LEFT JOIN dim_account a ON o.account_id = a.account_id
    WHERE o.is_closed = FALSE
    GROUP BY 1, 2, 3
),
stage_probabilities AS (
    -- Static mapping of stage to historical close probability (usually derived dynamically from Win Rate)
    SELECT 'Discovery' AS stage, 0.10 AS probability UNION ALL
    SELECT 'Demo' AS stage, 0.25 AS probability UNION ALL
    SELECT 'Proposal' AS stage, 0.50 AS probability UNION ALL
    SELECT 'Negotiation' AS stage, 0.75 AS probability
)
SELECT 
    cp.forecast_category,
    cp.stage,
    cp.region_name,
    cp.opp_count,
    cp.total_pipeline_amount,
    COALESCE(sp.probability, 0) AS historical_probability,
    
    -- Weighted Pipeline (Amount * Probability)
    (cp.total_pipeline_amount * COALESCE(sp.probability, 0)) AS expected_revenue
    
FROM current_pipeline cp
LEFT JOIN stage_probabilities sp ON cp.stage = sp.stage;
