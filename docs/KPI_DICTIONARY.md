# KPI Dictionary

This dictionary defines the exact mathematical calculation and business context for the core metrics used across the RevenueOS analytics layer. Standardizing these definitions is a critical function of Revenue Operations.

## 1. Top of Funnel (Marketing)

| KPI Name | Definition / Formula | Business Context |
| :--- | :--- | :--- |
| **Leads Generated** | `COUNT(DISTINCT lead_id)` | Total volume of net-new individuals entering the database. |
| **MQL (Marketing Qualified Lead)** | `COUNT(DISTINCT lead_id) WHERE status = 'MQL'` | Leads that meet a predefined demographic and behavioral threshold. |
| **Cost Per Lead (CPL)** | `Total Marketing Spend / Leads Generated` | Efficiency of marketing spend in generating top-of-funnel interest. |
| **Cost Per MQL** | `Total Marketing Spend / MQLs Generated` | Efficiency of marketing spend in generating *qualified* interest. |
| **ROAS (Return on Ad Spend)** | `(Attributed Revenue - Campaign Cost) / Campaign Cost` | The financial return generated for every dollar spent on advertising. |

## 2. Mid Funnel (SDR / Pipeline Generation)

| KPI Name | Definition / Formula | Business Context |
| :--- | :--- | :--- |
| **SQL (Sales Qualified Lead)** | `COUNT(DISTINCT opp_id) WHERE type = 'New Business'` | An MQL that has been vetted by an SDR and accepted by an Account Executive as a valid opportunity. |
| **MQL to SQL Conversion Rate** | `(Total SQLs / Total MQLs) * 100` | Measures the quality of marketing leads and the efficiency of the SDR qualification process. |
| **Pipeline Generated** | `SUM(amount) WHERE stage = 'SQL' or higher` | The total dollar value of all new opportunities created in a given period. |
| **Lead Response Time** | `AVG(first_activity_date - created_date)` | The average time it takes for sales to engage a newly created lead. Critical for conversion. |

## 3. Bottom Funnel (Sales Execution)

| KPI Name | Definition / Formula | Business Context |
| :--- | :--- | :--- |
| **Win Rate** | `(Closed Won Opps / (Closed Won + Closed Lost Opps)) * 100` | The percentage of decided opportunities that result in a sale. |
| **Sales Cycle Length** | `AVG(close_date - created_date) WHERE stage = 'Closed Won'` | The average number of days it takes to close a winning deal. Used for forecasting. |
| **Pipeline Velocity** | `(Number of SQLs * Win Rate * Average Deal Size) / Sales Cycle Length` | The estimated amount of revenue flowing through the pipeline every day. A critical RevOps metric. |
| **Average Deal Size (ACV/ARR)** | `AVG(amount) WHERE stage = 'Closed Won'` | The average annualized value of a closed-won contract. |

## 4. Executive Metrics (Financials)

| KPI Name | Definition / Formula | Business Context |
| :--- | :--- | :--- |
| **ARR (Annual Recurring Revenue)** | `SUM(active_contracts_annual_value)` | The total annualized value of all active customer subscriptions. The north star SaaS metric. |
| **Pipeline Coverage Ratio** | `Total Open Pipeline / Sales Quota` | Indicates if there is enough pipeline to hit target. A healthy ratio is typically 3x to 4x. |
| **Forecast Accuracy** | `(Actual Closed Won Revenue / Forecasted Revenue) * 100` | Measures how closely the sales organization can predict their own performance. |
| **CAC (Customer Acquisition Cost)** | `(Total S&M Spend) / Net New Customers` | The fully loaded cost to acquire one new logo. |
