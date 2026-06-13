# Model: Account Health Model (`fact_account_health`)

## 1. Business Purpose
B2B SaaS is an Account-Based motion, not just a Lead-Based motion. This model aggregates all pipeline and activity at the Account level to detect risk.

## 2. SQL Logic
Joins open pipeline data with aggregated SDR activity logs. It flags an account as "High Risk" (Score 80) if they have open pipeline but no one from the sales team has logged an activity against any contact in that account in the last 14 days.

## 3. Business Impact
Prevents deals from dying of neglect. By shifting from a "Deal View" to an "Account View", Sales Managers can easily see if an Account Executive is failing to work a high-value logo.

## 4. Executive Usage
The Sales Director uses this to conduct weekly 1:1 deal reviews. Any Enterprise account with a Risk Score > 50 must be explained by the Account Executive.

## 5. Interview Explanation
**"How do you monitor pipeline risk?"**
*Candidate:* "By combining CRM data with activity data. I built a `fact_account_health` model in RevenueOS that looked for the absence of data—specifically, open opportunities that hadn't had a call or email logged in the last 14 days. This generates an automated risk score, allowing sales leadership to proactively intervene before a deal goes dark."
