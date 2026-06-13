# Model: Lead Funnel Analysis (`fact_lead_funnel`)

## 1. Business Purpose
To provide the VP of Marketing and SDR Managers with absolute visibility into top-of-funnel conversion efficiency, grouped by cohort month and geographic region.

## 2. SQL Logic
The model aggregates `fct_leads` and `fct_opportunities` by `cohort_month` (the month the lead or opportunity was created). It calculates the sheer volume of entities hitting each stage (Lead, MQL, SQL, Opp, Won) and mathematically derives the conversion percentage between sequential stages.

## 3. Business Impact
Without this model, Marketing cannot determine if their generated leads are actually viable. If `total_leads` is high but `lead_to_mql_pct` is below 20%, the organization knows the problem is top-of-funnel lead quality, not SDR execution.

## 4. Executive Usage
The CRO uses this model during quarterly planning to reverse-engineer revenue targets. If the goal is $1M ARR, and the `opp_to_won_pct` is 25%, they know they need $4M in pipeline, which dictates the number of MQLs marketing must generate based on historical conversion rates.

## 5. Interview Explanation
**"How do you measure marketing efficiency?"**
*Candidate:* "In RevenueOS, I built the `fact_lead_funnel` model using a cohort-based SQL aggregation. I didn't just count leads; I calculated the sequential conversion rates (`lead_to_mql`, `mql_to_sql`, etc.) segmented by region. This allowed me to tell the VP of Marketing exactly where the bottleneck was. For example, if EMEA had a 45% MQL-to-SQL rate but North America only had 20%, I could proactively recommend the RevOps team audit the North American SDR qualification process."
