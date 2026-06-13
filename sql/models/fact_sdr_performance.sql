-- Model: fact_sdr_performance
-- Purpose: Evaluates SDR activity volume vs pipeline generation efficiency.

CREATE OR REPLACE TABLE gold_fact_sdr_performance AS
WITH activity_counts AS (
    SELECT 
        sdr_id,
        COUNT(activity_id) AS total_activities,
        COUNT(CASE WHEN activity_type = 'Call' THEN activity_id END) AS total_calls,
        COUNT(CASE WHEN activity_type = 'Email' THEN activity_id END) AS total_emails,
        COUNT(CASE WHEN activity_type = 'LinkedIn' THEN activity_id END) AS total_linkedin
    FROM fct_sdr_activities
    GROUP BY 1
),
pipeline_gen AS (
    -- Assuming Leads created by/assigned to this SDR that converted to Opps
    SELECT 
        a.sdr_id,
        COUNT(DISTINCT l.lead_id) as leads_worked,
        COUNT(DISTINCT CASE WHEN l.sql_date IS NOT NULL THEN l.lead_id END) AS sqls_generated,
        SUM(CASE WHEN l.is_converted = TRUE THEN o.amount ELSE 0 END) AS pipeline_generated
    FROM fct_sdr_activities a
    JOIN fct_leads l ON a.lead_id = l.lead_id
    LEFT JOIN fct_opportunities o ON l.account_id = o.account_id AND o.created_date >= l.sql_date
    GROUP BY 1
)
SELECT 
    u.name AS sdr_name,
    u.region_id,
    COALESCE(ac.total_activities, 0) AS total_activities,
    COALESCE(ac.total_calls, 0) AS total_calls,
    COALESCE(ac.total_emails, 0) AS total_emails,
    COALESCE(pg.leads_worked, 0) AS leads_worked,
    COALESCE(pg.sqls_generated, 0) AS sqls_generated,
    COALESCE(pg.pipeline_generated, 0) AS pipeline_generated,
    
    -- Efficiency Ratios
    CASE WHEN COALESCE(pg.sqls_generated, 0) > 0 THEN ac.total_activities / pg.sqls_generated ELSE 0 END AS activities_per_sql
FROM dim_sales_team u
LEFT JOIN activity_counts ac ON u.user_id = ac.sdr_id
LEFT JOIN pipeline_gen pg ON u.user_id = pg.sdr_id
WHERE u.role = 'SDR';
