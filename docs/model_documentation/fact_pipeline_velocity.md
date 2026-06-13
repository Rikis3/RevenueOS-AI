# Model: Pipeline Velocity (`fact_pipeline_velocity`)

## 1. Business Purpose
Pipeline Velocity is the ultimate metric for measuring the health of a sales organization. It calculates how much revenue is flowing through the pipeline every single day. 

## 2. SQL Logic
The model combines two CTEs: `closed_deals` (to establish the historical Win Rate and Sales Cycle length for a specific segment) and `open_pipeline` (to determine current value). The output applies the standard RevOps formula: `(Open Pipeline * Win Rate) / Sales Cycle Length`.

## 3. Business Impact
It stops sales teams from having a false sense of security. A team might have a massive $5M pipeline, but if their Win Rate is 5% and their Sales Cycle is 180 days, their true velocity is very low, meaning they will miss quota. 

## 4. Executive Usage
The CRO uses this model to hold Regional Sales Directors accountable. By segmenting by Region and Industry, they can see that the APAC region's velocity is stalling because their Sales Cycle length is inflating, allowing for targeted coaching.

## 5. Interview Explanation
**"How do you evaluate sales performance beyond just looking at quota attainment?"**
*Candidate:* "Quota is a lagging indicator. I prefer to look at Pipeline Velocity as a leading indicator. In my RevenueOS model, I calculate velocity segmented by rep and industry. It mathematically factors in four levers: Pipeline Volume, Deal Size, Win Rate, and Sales Cycle. If a rep is missing their velocity targets, I can look at the sub-metrics to see exactly why—maybe they generate enough pipeline, but their win rate is atrocious. It changes the conversation from 'sell more' to 'sell better'."
