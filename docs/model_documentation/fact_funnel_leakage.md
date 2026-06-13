# Model: Funnel Leakage Analysis (`fact_funnel_leakage`)

## 1. Business Purpose
To quantify the exact points where prospective customers are dropping out of the sales process and attach a dollar value (Lost Revenue) to that attrition to prioritize operational fixes.

## 2. SQL Logic
This model reads from the previously aggregated `gold_fact_lead_funnel`. It calculates the absolute numeric difference between sequential stages to find the "dropped" count. It then cross-joins the global Average Contract Value (ACV) from `fct_opportunities` to estimate the financial cost of losing those qualified opportunities.

## 3. Business Impact
Transforms theoretical conversion percentages into hard dollar figures. Telling a Sales Director "Our win rate dropped 2%" is less impactful than saying "We lost $1.2M in estimated revenue due to opportunities stalling before the Proposal stage this month."

## 4. Executive Usage
RevOps uses this dashboard to deploy enablement resources. If `leakage_pct_sql` is spiking, it means SDRs are qualifying leads but AEs are rejecting them during Discovery. The organization needs to fix AE/SDR alignment.

## 5. Interview Explanation
**"How do you identify operational bottlenecks?"**
*Candidate:* "I prefer to look at Funnel Leakage. In my RevenueOS project, I built a `fact_funnel_leakage` model that not only calculated the percentage of drop-off at each stage but also multiplied the lost opportunities by our global ACV to calculate an `estimated_lost_revenue` metric. When you present data to a CRO, showing them that a specific regional bottleneck is costing them $500k a month in un-realized pipeline gets immediate executive buy-in to fix the process."
