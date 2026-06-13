# Go-To-Market (GTM) Use Cases

This document maps out the specific use cases for RevenueOS, categorized by the primary GTM stakeholder. These use cases drive the data modeling and metric definitions in the downstream analytics layer.

## 1. Executive Leadership (CEO, CRO, CFO)

**Primary Focus**: Revenue predictability, overall efficiency, and high-level growth trajectory.

*   **Use Case 1.1: The Weekly Business Review (WBR)**
    *   *Scenario*: The executive team needs a snapshot of the business's health every Monday morning.
    *   *Requirement*: AI-generated summary highlighting net-new ARR, pipeline created, and critical risks, powered by the Gold-layer executive metrics.
*   **Use Case 1.2: Forecast Validation**
    *   *Scenario*: The CRO needs to report quarter-end revenue projections to the board.
    *   *Requirement*: An AI-driven forecast that compares the sales team's manual commit against historical pipeline velocity and conversion probabilities to provide a confidence score.
*   **Use Case 1.3: Revenue Growth Efficiency (Rule of 40)**
    *   *Scenario*: The CFO needs to ensure growth is not coming at an unsustainable cost.
    *   *Requirement*: A unified view of CAC (Customer Acquisition Cost) vs. LTV (Life Time Value) blended from marketing spend, sales headcount, and realized revenue.

## 2. VP of Marketing

**Primary Focus**: Top-of-funnel generation, campaign ROI, and pipeline contribution.

*   **Use Case 2.1: Marketing Attribution to Revenue**
    *   *Scenario*: Marketing is spending $1M/quarter on LinkedIn Ads, but Sales says the leads are weak. The VP needs to prove pipeline impact.
    *   *Requirement*: A multi-touch attribution dashboard showing exactly how much Closed-Won ARR was influenced by LinkedIn Ads vs. Organic Search.
*   **Use Case 2.2: Campaign Optimization**
    *   *Scenario*: Deciding where to allocate budget for Q3.
    *   *Requirement*: SQL models calculating the Cost per SQL and ROAS for every active campaign to identify the most efficient acquisition channels.

## 3. Sales Director

**Primary Focus**: Pipeline execution, win rates, and rep performance.

*   **Use Case 3.1: Pipeline Risk Analysis**
    *   *Scenario*: Ensuring the team hits their quarterly quota.
    *   *Requirement*: The AI Copilot flagging opportunities that are in the "Proposal" stage but haven't had an associated activity (email/meeting) in >14 days.
*   **Use Case 3.2: Win/Loss Analysis**
    *   *Scenario*: Understanding why the win rate dropped by 5% last month.
    *   *Requirement*: Analytics slicing win rate by competitor, deal size, and industry to isolate the root cause.

## 4. SDR Manager

**Primary Focus**: Lead response times, qualification efficiency, and outbound pipeline generation.

*   **Use Case 4.1: Lead Funnel Leakage**
    *   *Scenario*: Marketing generated 5,000 MQLs, but only 200 converted to SQLs.
    *   *Requirement*: A funnel analysis model showing the exact drop-off rate between MQL → Accepted → Working → SQL to identify where SDRs are struggling to convert.
*   **Use Case 4.2: SDR Activity vs. Output**
    *   *Scenario*: Evaluating SDR performance for promotions.
    *   *Requirement*: A dashboard mapping the number of activities (calls, emails) to actual pipeline generated (SQLs) to find the most efficient reps.

## 5. Revenue Operations (RevOps) Manager

**Primary Focus**: Data integrity, system architecture, and cross-functional alignment.

*   **Use Case 5.1: Data Quality Monitoring**
    *   *Scenario*: Ensuring the Analytics Engineering layer remains pristine.
    *   *Requirement*: Automated SQL tests (via dbt/custom scripts) checking for orphaned records, missing stage dates, and duplicate accounts.
*   **Use Case 5.2: Ad-Hoc Business Intelligence**
    *   *Scenario*: The CRO asks a complex, multi-dimensional question ("What is our win rate for Enterprise deals in EMEA originating from Webinars?").
    *   *Requirement*: A well-documented semantic layer (metrics.yml) allowing RevOps to quickly write a SQL query against the Gold layer without navigating messy raw data.
