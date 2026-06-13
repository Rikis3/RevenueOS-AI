-- Model: fact_executive_kpis
-- Purpose: The single, executive-level table summarizing the most important metrics in the business by month.

CREATE OR REPLACE TABLE gold_fact_executive_kpis AS
WITH monthly_revenue AS (
    SELECT 
        DATE_TRUNC('month', close_date) AS reporting_month,
        SUM(amount) AS net_new_arr,
        COUNT(opportunity_id) AS won_deals
    FROM fct_opportunities 
    WHERE is_won = TRUE
    GROUP BY 1
),
monthly_spend AS (
    SELECT 
        DATE_TRUNC('month', start_date) AS reporting_month,
        SUM(spend) AS total_marketing_spend
    FROM dim_campaign
    GROUP BY 1
),
monthly_pipeline AS (
    SELECT 
        DATE_TRUNC('month', created_date) AS reporting_month,
        SUM(amount) AS pipeline_created
    FROM fct_opportunities
    GROUP BY 1
)
SELECT 
    COALESCE(r.reporting_month, s.reporting_month, p.reporting_month) AS reporting_month,
    COALESCE(r.net_new_arr, 0) AS net_new_arr,
    COALESCE(r.won_deals, 0) AS won_deals,
    COALESCE(s.total_marketing_spend, 0) AS total_marketing_spend,
    COALESCE(p.pipeline_created, 0) AS pipeline_created,
    
    -- Blended CAC (Marketing Spend / New Deals Won)
    CASE WHEN COALESCE(r.won_deals, 0) > 0 THEN COALESCE(s.total_marketing_spend, 0) / r.won_deals ELSE 0 END AS blended_cac,
    
    -- Pipeline Coverage (Pipeline Created / Net New ARR actually closed)
    CASE WHEN COALESCE(r.net_new_arr, 0) > 0 THEN COALESCE(p.pipeline_created, 0) / r.net_new_arr ELSE 0 END AS pipeline_coverage_ratio,
    
    -- High Level ROI
    CASE WHEN COALESCE(s.total_marketing_spend, 0) > 0 THEN COALESCE(r.net_new_arr, 0) / s.total_marketing_spend ELSE 0 END AS marketing_roi

FROM monthly_revenue r
FULL OUTER JOIN monthly_spend s ON r.reporting_month = s.reporting_month
FULL OUTER JOIN monthly_pipeline p ON COALESCE(r.reporting_month, s.reporting_month) = p.reporting_month
WHERE COALESCE(r.reporting_month, s.reporting_month, p.reporting_month) IS NOT NULL;
