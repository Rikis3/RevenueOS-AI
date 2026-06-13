# Model: Lead Scoring (`fact_lead_score`)

## 1. Business Purpose
To help SDRs prioritize their daily outreach. Instead of calling leads randomly, they can sort their queue by the highest propensity to convert.

## 2. SQL Logic
A rules-based scoring model that assigns points across two axes: Demographic (Fit) and Behavioral (Intent). Enterprise accounts get higher base points, and every recorded marketing touchpoint adds 15 points (capped at 60). The total score generates an A/B/C letter grade.

## 3. Business Impact
Increases SDR efficiency and MQL-to-SQL conversion rates by ensuring reps are calling the people who are actually engaging with marketing material, rather than wasting time on cold, unqualified leads.

## 4. Executive Usage
RevOps uses this to set SLAs (Service Level Agreements). For example, any lead graded "A - Hot" must be called by an SDR within 15 minutes of creation.

## 5. Interview Explanation
**"How do you align Marketing and Sales on lead quality?"**
*Candidate:* "By implementing a transparent, data-driven Lead Scoring model. In my RevenueOS architecture, I wrote a SQL model that looked at both Firmographics (is this an Enterprise account?) and Behavior (how many touchpoints do they have in `fct_attribution_touchpoints`?). It automatically grades leads A, B, or C. If sales complains about lead quality, we don't argue—we just pull up the model and look at the conversion rate of 'A' leads vs 'C' leads to validate the scoring."
