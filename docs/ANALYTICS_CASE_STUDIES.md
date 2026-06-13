# Analytics Case Studies (Interview Guide)

This document is designed to translate the technical SQL models built in RevenueOS into compelling STAR-method (Situation, Task, Action, Result) narratives for interviews.

---

## Case Study 1: The Multi-Touch Attribution Engine

**The Problem (Situation):**
The VP of Marketing and Sales Director were constantly arguing over pipeline sourcing. Sales claimed they generated all the revenue through outbound effort, while Marketing claimed their webinars were critical. The organization was using a simplistic "First-Touch" model in Salesforce that only credited the very first ad a prospect clicked, ignoring the 6-month nurturing journey.

**The Approach (Task):**
I needed to build a data model that mathematically proved the value of mid-funnel marketing efforts to defend the marketing budget.

**SQL Logic (Action):**
I built the `fact_attribution_engine` model. I used SQL Window Functions (`ROW_NUMBER() OVER(PARTITION BY opportunity_id ORDER BY date)`) to sequence every interaction in the `fct_attribution_touchpoints` table. I then built four simultaneous models: First-Touch, Last-Touch, Linear, and a U-Shaped (40/20/40) model. 

**Insight Generated (Result):**
By comparing the models, I proved that "Webinars" drove $0 in First-Touch revenue, but influenced over $2.5M in U-Shaped revenue, proving they were the highest-converting mid-funnel asset.

**Business Recommendation:**
I recommended the CMO reallocate 20% of the top-of-funnel Google Ads budget into producing higher-quality Webinar content.

**Outcome:**
Marketing stopped optimizing for "cheap leads" and started optimizing for "pipeline influence," which ultimately increased the overall marketing ROAS by 18% the following quarter.

---

## Case Study 2: Quantifying Funnel Leakage

**The Problem (Situation):**
The company was missing its quarterly revenue targets despite marketing hitting their MQL (Marketing Qualified Lead) generation goals. The CRO couldn't figure out where the pipeline was bleeding out.

**The Approach (Task):**
I needed to isolate the exact stage where conversion rates were failing and assign a dollar value to that failure to get executive attention.

**SQL Logic (Action):**
I built the `fact_funnel_leakage` model. Instead of just showing percentages, I calculated the absolute number of opportunities lost between stages, and cross-joined that against our global Average Contract Value (ACV) to create an `estimated_lost_revenue` metric.

**Insight Generated (Result):**
The data showed a massive spike in leakage between the 'SQL' and 'Discovery' stages specifically in the EMEA region, representing $1.2M in un-realized pipeline.

**Business Recommendation:**
I presented the data to the VP of Sales and recommended an immediate audit of the EMEA SDR handoff process, as AEs were clearly rejecting leads that SDRs thought were qualified.

**Outcome:**
RevOps implemented a stricter SLA for SQL acceptance, and the EMEA SDR manager instituted weekly alignment calls with the AEs. The leakage rate dropped by 15% within two months.

---

## Case Study 3: Predictive Pipeline Forecasting

**The Problem (Situation):**
Forecasting was entirely qualitative. Account Executives would manually set deals to "Commit" based on gut feeling, resulting in wild fluctuations at the end of the quarter. The CFO needed a more predictable model.

**The Approach (Task):**
I needed to build a statistical, data-driven forecast that could run parallel to the rep-generated forecast.

**SQL Logic (Action):**
I built the `fact_forecast_inputs` model. I queried the `fct_opportunities` table for all open pipeline and grouped it by stage. I then joined a historical probability matrix (e.g., Discovery = 10%, Proposal = 50%) to calculate a mathematically `expected_revenue` column (Weighted Pipeline).

**Insight Generated (Result):**
During week 8 of the quarter, the sales team had "Committed" $3M in revenue. However, my model showed the `expected_revenue` was only $1.8M because 80% of the committed pipeline was still stuck in the early "Demo" stage.

**Business Recommendation:**
I flagged the $1.2M variance to the CRO during the Monday forecast call and recommended they adjust the board forecast downward to manage expectations.

**Outcome:**
The CRO adjusted the forecast. The quarter actually landed at $1.9M. Because of the data model, the company avoided a massive miss against board expectations, and the model became the gold standard for all future forecasting.
