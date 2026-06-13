-- Model: fact_funnel_leakage
-- Purpose: Identifies stage-by-stage attrition and calculates the lost revenue impact.

CREATE OR REPLACE TABLE gold_fact_funnel_leakage AS
WITH funnel_base AS (
    SELECT 
        cohort_month,
        region_name,
        total_leads,
        total_mqls,
        total_sqls,
        total_opportunities,
        total_won,
        -- Calculate absolute drop-offs
        (total_leads - total_mqls) AS dropped_before_mql,
        (total_mqls - total_sqls) AS dropped_before_sql,
        (total_sqls - total_opportunities) AS dropped_before_opp,
        (total_opportunities - total_won) AS lost_opportunities
    FROM gold_fact_lead_funnel
),
acv_base AS (
    -- Get the average deal size to estimate lost revenue
    SELECT AVG(amount) as global_acv FROM fct_opportunities WHERE is_won = TRUE
)
SELECT
    f.cohort_month,
    f.region_name,
    f.dropped_before_mql,
    f.dropped_before_sql,
    f.dropped_before_opp,
    f.lost_opportunities,
    -- Leakage percentages relative to total leads entering the top of funnel
    (f.dropped_before_mql * 100.0 / NULLIF(f.total_leads, 0)) AS leakage_pct_mql,
    (f.dropped_before_sql * 100.0 / NULLIF(f.total_leads, 0)) AS leakage_pct_sql,
    (f.dropped_before_opp * 100.0 / NULLIF(f.total_leads, 0)) AS leakage_pct_opp,
    -- Estimated Lost Revenue (Opportunities that didn't close * Average ACV)
    f.lost_opportunities * a.global_acv AS estimated_lost_revenue
FROM funnel_base f
CROSS JOIN acv_base a;
