-- Model: fact_campaign_roi
-- Purpose: Merges marketing spend with attributed pipeline and revenue to calculate ROI/ROAS.

CREATE OR REPLACE TABLE gold_fact_campaign_roi AS
WITH campaign_attrib AS (
    -- Simplistic last-touch attribution for baseline ROI
    SELECT 
        lead_source_id AS campaign_id,
        COUNT(opportunity_id) AS total_opportunities_generated,
        SUM(amount) AS pipeline_generated,
        SUM(CASE WHEN is_won = TRUE THEN amount ELSE 0 END) AS revenue_generated
    FROM fct_opportunities
    GROUP BY 1
),
lead_attrib AS (
    SELECT 
        campaign_id,
        COUNT(lead_id) AS leads_generated,
        COUNT(CASE WHEN mql_date IS NOT NULL THEN lead_id END) AS mqls_generated
    FROM fct_leads
    GROUP BY 1
)
SELECT 
    c.campaign_id,
    c.campaign_name,
    c.channel_name,
    c.spend,
    c.impressions,
    c.clicks,
    COALESCE(la.leads_generated, 0) AS leads_generated,
    COALESCE(la.mqls_generated, 0) AS mqls_generated,
    COALESCE(ca.total_opportunities_generated, 0) AS opportunities_generated,
    COALESCE(ca.pipeline_generated, 0) AS pipeline_generated,
    COALESCE(ca.revenue_generated, 0) AS revenue_generated,
    
    -- Efficiency Metrics
    CASE WHEN COALESCE(la.leads_generated, 0) > 0 THEN c.spend / la.leads_generated ELSE NULL END AS cost_per_lead,
    CASE WHEN COALESCE(la.mqls_generated, 0) > 0 THEN c.spend / la.mqls_generated ELSE NULL END AS cost_per_mql,
    CASE WHEN COALESCE(ca.total_opportunities_generated, 0) > 0 THEN c.spend / ca.total_opportunities_generated ELSE NULL END AS cost_per_opportunity,
    
    -- Financial ROI
    CASE WHEN c.spend > 0 THEN (COALESCE(ca.revenue_generated, 0) - c.spend) / c.spend ELSE 0 END AS roi_pct,
    CASE WHEN c.spend > 0 THEN COALESCE(ca.revenue_generated, 0) / c.spend ELSE 0 END AS roas

FROM dim_campaign c
LEFT JOIN campaign_attrib ca ON c.campaign_id = ca.campaign_id
LEFT JOIN lead_attrib la ON c.campaign_id = la.campaign_id;
