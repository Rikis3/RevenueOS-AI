-- Model: fact_pipeline_velocity
-- Purpose: Calculates pipeline velocity grouped by Sales Rep, Region, and Industry to understand sales execution speed.

CREATE OR REPLACE TABLE gold_fact_pipeline_velocity AS
WITH closed_deals AS (
    SELECT 
        o.owner_id,
        a.region_name,
        a.industry_name,
        COUNT(CASE WHEN o.is_won = TRUE THEN 1 END) AS won_deals,
        COUNT(CASE WHEN o.is_closed = TRUE THEN 1 END) AS total_closed_deals,
        SUM(CASE WHEN o.is_won = TRUE THEN o.amount ELSE 0 END) AS won_amount,
        AVG(CASE WHEN o.is_won = TRUE THEN DATE_DIFF('day', o.created_date, o.close_date) END) AS avg_sales_cycle_days
    FROM fct_opportunities o
    LEFT JOIN dim_account a ON o.account_id = a.account_id
    GROUP BY 1, 2, 3
),
open_pipeline AS (
    SELECT
        o.owner_id,
        a.region_name,
        a.industry_name,
        COUNT(*) AS open_opp_count,
        SUM(o.amount) AS open_pipeline_amount
    FROM fct_opportunities o
    LEFT JOIN dim_account a ON o.account_id = a.account_id
    WHERE o.is_closed = FALSE
    GROUP BY 1, 2, 3
)
SELECT 
    st.name AS sales_rep_name,
    COALESCE(op.region_name, cd.region_name) AS region_name,
    COALESCE(op.industry_name, cd.industry_name) AS industry_name,
    COALESCE(op.open_pipeline_amount, 0) AS open_pipeline_value,
    COALESCE(cd.won_amount / NULLIF(cd.won_deals, 0), 0) AS avg_deal_size,
    COALESCE(cd.won_deals * 100.0 / NULLIF(cd.total_closed_deals, 0), 0) AS win_rate_pct,
    COALESCE(cd.avg_sales_cycle_days, 1) AS avg_sales_cycle_days,
    
    -- Pipeline Velocity Formula: (Number of Open Opps * Win Rate * Average Deal Size) / Sales Cycle Length
    -- Note: Number of Open Opps * Avg Deal Size = Open Pipeline Value
    CASE WHEN COALESCE(cd.avg_sales_cycle_days, 0) > 0 
         THEN (COALESCE(op.open_pipeline_amount, 0) * (COALESCE(cd.won_deals * 1.0 / NULLIF(cd.total_closed_deals, 0), 0))) / cd.avg_sales_cycle_days
         ELSE 0 
    END AS daily_pipeline_velocity

FROM dim_sales_team st
LEFT JOIN open_pipeline op ON st.user_id = op.owner_id
LEFT JOIN closed_deals cd ON st.user_id = cd.owner_id 
    AND op.region_name = cd.region_name 
    AND op.industry_name = cd.industry_name;
