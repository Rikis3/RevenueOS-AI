# Analytics Decisions & Methodology

This document outlines the strategic choices made regarding metric definitions, attribution models, and forecasting methodologies within RevenueOS.

## 1. Attribution Methodology
Attribution is notoriously difficult in B2B SaaS due to long sales cycles and multiple stakeholders (the buying committee). RevenueOS implements four models to allow RevOps to compare impact:

*   **First-Touch**: 100% credit to the campaign that generated the net-new Lead. Useful for understanding top-of-funnel brand awareness.
*   **Last-Touch**: 100% credit to the last campaign touched before the Opportunity was created. Useful for understanding high-intent conversion drivers.
*   **Linear**: Equal credit distributed across all touchpoints. Provides a balanced view but under-values critical conversion events.
*   **W-Shaped (Multi-Touch Focus)**: 30% credit to First Touch, 30% to Lead Creation, 30% to Opportunity Creation, and 10% distributed to remaining touchpoints. *This is the recommended model for B2B SaaS as it credits the critical lifecycle transitions.*

## 2. Forecasting Approach
RevenueOS moves away from qualitative forecasting (Sales Reps "committing" deals based on gut feel) to quantitative, data-driven forecasting.

*   **Pipeline Velocity Model**: `(Number of Opportunities * Historical Win Rate * Average Deal Size) / Average Sales Cycle Length`
*   **Why this matters**: If a Sales Director claims they will close $1M this quarter, but the Pipeline Velocity calculation only shows $600k, the RevOps team can immediately flag the gap and adjust the executive forecast.
*   **Stage-Weighted Forecasting**: Multiplying the pipeline amount by the historical probability of closing from that specific stage (e.g., a $100k deal in "Discovery" is forecasted at $10k, while a $100k deal in "Negotiation" is forecasted at $75k).

## 3. Lead vs. Account Focus
While marketing often focuses on individual *Leads*, B2B sales sell to *Accounts*. 
*   **Decision**: The RevenueOS data model forces all Opportunities to tie to an `account_id`, not just a `lead_id`. This enables Account-Based Marketing (ABM) analytics, allowing us to aggregate all marketing touchpoints across multiple contacts within the same company to determine the true influence on the final deal.

## 4. Defining "Active" Pipeline
*   **Decision**: Pipeline is only considered "active" if there has been a logged activity (email, call, meeting) in the last 14 days, or if the close date is in the future. Stagnant deals are automatically excluded from the AI Forecast to prevent pipeline bloat.
