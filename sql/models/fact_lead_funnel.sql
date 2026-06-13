-- Model: fact_lead_funnel
-- Purpose: Aggregates lead volume and conversion metrics by month and region.

CREATE OR REPLACE TABLE gold_fact_lead_funnel AS
WITH lead_base AS (
    SELECT
        DATE_TRUNC('month', l.created_at) AS cohort_month,
        a.region_name,
        COUNT(l.lead_id) AS total_leads,
        COUNT(CASE WHEN l.mql_date IS NOT NULL THEN l.lead_id END) AS total_mqls,
        COUNT(CASE WHEN l.sql_date IS NOT NULL THEN l.lead_id END) AS total_sqls,
        COUNT(CASE WHEN l.is_converted = TRUE THEN l.lead_id END) AS total_opportunities
    FROM fct_leads l
    LEFT JOIN dim_account a ON l.account_id = a.account_id
    GROUP BY 1, 2
),
opp_base AS (
    SELECT
        DATE_TRUNC('month', created_date) AS cohort_month,
        a.region_name,
        COUNT(CASE WHEN is_won = TRUE THEN opportunity_id END) AS total_won
    FROM fct_opportunities o
    LEFT JOIN dim_account a ON o.account_id = a.account_id
    GROUP BY 1, 2
)
SELECT
    lb.cohort_month,
    lb.region_name,
    lb.total_leads,
    lb.total_mqls,
    lb.total_sqls,
    lb.total_opportunities,
    COALESCE(ob.total_won, 0) AS total_won,
    -- Conversion Rates
    CASE WHEN lb.total_leads > 0 THEN (lb.total_mqls * 100.0 / lb.total_leads) ELSE 0 END AS lead_to_mql_pct,
    CASE WHEN lb.total_mqls > 0 THEN (lb.total_sqls * 100.0 / lb.total_mqls) ELSE 0 END AS mql_to_sql_pct,
    CASE WHEN lb.total_sqls > 0 THEN (lb.total_opportunities * 100.0 / lb.total_sqls) ELSE 0 END AS sql_to_opp_pct,
    CASE WHEN lb.total_opportunities > 0 THEN (COALESCE(ob.total_won, 0) * 100.0 / lb.total_opportunities) ELSE 0 END AS opp_to_won_pct
FROM lead_base lb
LEFT JOIN opp_base ob ON lb.cohort_month = ob.cohort_month AND lb.region_name = ob.region_name;
