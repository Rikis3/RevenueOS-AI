# Model: Executive KPI Layer (`fact_executive_kpis`)

## 1. Business Purpose
To provide the CEO and Board of Directors with a single, unarguable source of truth for the company's macro performance. 

## 2. SQL Logic
This is the highest level of aggregation in the Gold layer. It uses `FULL OUTER JOIN` on a `reporting_month` key to bring together disparate business concepts: Total Marketing Spend, Net New ARR, and Pipeline Created. It then calculates the blended Customer Acquisition Cost (CAC) and Pipeline Coverage Ratios.

## 3. Business Impact
Prevents the classic "board meeting argument" where the VP of Sales brings one set of numbers from Salesforce and the CMO brings a different set from HubSpot. This model forces alignment.

## 4. Executive Usage
This powers the primary 'Command Center' dashboard. If Pipeline Coverage drops below 3.0x, the CEO knows the company is at high risk of missing next quarter's revenue targets and will instruct marketing to increase top-of-funnel spend immediately.

## 5. Interview Explanation
**"How do you design a dashboard for a CEO?"**
*Candidate:* "A CEO doesn't want to see 50 filters and tables. They want the 5 numbers that matter. In RevenueOS, I built the `fact_executive_kpis` model specifically for this. It joined marketing spend, pipeline creation, and closed-won ARR by month to calculate macro-efficiency metrics like Blended CAC and Pipeline Coverage. By pre-aggregating this in SQL, the resulting dashboard was lightning fast, completely locked-down from accidental filter errors, and provided an instant read on the health of the business."
