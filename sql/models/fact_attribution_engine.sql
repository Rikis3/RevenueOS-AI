-- Model: fact_attribution_engine
-- Purpose: Generates First-Touch, Last-Touch, Linear, and Multi-Touch (W-Shaped) attribution models.

-- Base CTE to count touchpoints per opportunity
CREATE OR REPLACE TABLE gold_fact_attribution_engine AS
WITH touchpoint_ranks AS (
    SELECT 
        t.opportunity_id,
        t.campaign_id,
        o.amount AS opportunity_amount,
        ROW_NUMBER() OVER (PARTITION BY t.opportunity_id ORDER BY t.interaction_date ASC) as touch_order_asc,
        ROW_NUMBER() OVER (PARTITION BY t.opportunity_id ORDER BY t.interaction_date DESC) as touch_order_desc,
        COUNT(*) OVER (PARTITION BY t.opportunity_id) as total_touches
    FROM fct_attribution_touchpoints t
    JOIN fct_opportunities o ON t.opportunity_id = o.opportunity_id
    WHERE t.opportunity_id IS NOT NULL AND o.is_won = TRUE
),
attribution_models AS (
    SELECT
        opportunity_id,
        campaign_id,
        opportunity_amount,
        total_touches,
        
        -- 1. First Touch Attribution (100% to first touch)
        CASE WHEN touch_order_asc = 1 THEN opportunity_amount ELSE 0 END AS first_touch_revenue,
        
        -- 2. Last Touch Attribution (100% to last touch before opp creation)
        CASE WHEN touch_order_desc = 1 THEN opportunity_amount ELSE 0 END AS last_touch_revenue,
        
        -- 3. Linear Attribution (Equal split)
        opportunity_amount / total_touches AS linear_revenue,
        
        -- 4. U-Shaped (Simplified Multi-Touch: 40% First, 40% Last, 20% Middle spread)
        CASE 
            WHEN total_touches = 1 THEN opportunity_amount
            WHEN total_touches = 2 THEN opportunity_amount * 0.5
            WHEN touch_order_asc = 1 THEN opportunity_amount * 0.4
            WHEN touch_order_desc = 1 THEN opportunity_amount * 0.4
            ELSE (opportunity_amount * 0.2) / (total_touches - 2)
        END AS multi_touch_revenue

    FROM touchpoint_ranks
)
SELECT 
    a.campaign_id,
    c.campaign_name,
    c.channel_name,
    COUNT(DISTINCT a.opportunity_id) AS influenced_opportunities,
    SUM(a.first_touch_revenue) AS sum_first_touch_revenue,
    SUM(a.last_touch_revenue) AS sum_last_touch_revenue,
    SUM(a.linear_revenue) AS sum_linear_revenue,
    SUM(a.multi_touch_revenue) AS sum_multi_touch_revenue
FROM attribution_models a
LEFT JOIN dim_campaign c ON a.campaign_id = c.campaign_id
GROUP BY 1, 2, 3;
