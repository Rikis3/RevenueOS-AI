# RevenueOS API Reference

This document outlines the lightweight Analytics API designed to expose the Gold-Layer Data Warehouse (DuckDB) and AI Copilot services to the frontend.

**Base URL:** `http://localhost:8000/api`

---

## 1. Executive Group (`/executive`)

### `GET /executive/kpis`
*   **Business Purpose:** Powers the top-level command center for the CEO.
*   **Input:** None
*   **Output:** Array of monthly KPIs (ARR, MRR, Pipeline Created, Marketing Spend, CAC, Coverage Ratio).
*   **Executive Use Case:** Assessing macro business health at a glance.

---

## 2. Marketing Group (`/marketing`)

### `GET /marketing/campaign-roi`
*   **Business Purpose:** Calculates true Return on Ad Spend (ROAS).
*   **Input:** None
*   **Output:** Campaign performance metrics including `cost_per_opportunity` and `roi_pct`.
*   **Executive Use Case:** Defending the marketing budget to the CFO.

### `GET /marketing/funnel`
*   **Business Purpose:** Evaluates top-of-funnel conversion efficiency.
*   **Input:** None
*   **Output:** Cohort-based conversion rates (Lead -> MQL -> SQL).
*   **Executive Use Case:** Identifying if leads are too low quality for sales to convert.

---

## 3. RevOps Group (`/revops`)

### `GET /revops/pipeline-velocity`
*   **Business Purpose:** Measures the speed of sales execution.
*   **Input:** None
*   **Output:** Pipeline velocity segmented by Sales Rep and Region.
*   **Executive Use Case:** Identifying reps who have large pipelines but atrocious win rates.

### `GET /revops/account-health`
*   **Business Purpose:** Detects risk in the pipeline.
*   **Input:** None
*   **Output:** Account engagement and risk scores based on historical SDR activity.
*   **Executive Use Case:** Forcing an AE to call an Enterprise account that hasn't been touched in 14 days.

---

## 4. Forecasting Group (`/forecast`)

### `GET /forecast/summary`
*   **Business Purpose:** Replaces gut-feel forecasting with statistics.
*   **Input:** None
*   **Output:** Total expected revenue vs Total open pipeline.
*   **Executive Use Case:** Adjusting the board commit based on statistical probability.

---

## 5. AI Services Group (`/ai`)

### `POST /ai/wbr`
*   **Business Purpose:** Automates the Weekly Business Review.
*   **Input:** None (pulls from DB internally).
*   **Output:** JSON containing `executive_summary`, `wins`, `risks`, and `recommendations`.
*   **Executive Use Case:** Saving 4 hours of analyst busywork every Monday.

### `POST /ai/next-best-actions`
*   **Business Purpose:** An AI strategy engine that requires data citations.
*   **Input:** None.
*   **Output:** List of recommended actions mapped to specific supporting metrics.
*   **Executive Use Case:** Deciding where to reallocate $50k of unused marketing budget.

---

## 6. Natural Language Query (`/nlq`)

### `POST /nlq/query`
*   **Business Purpose:** Allows executives to self-serve data without submitting a Jira ticket to the analytics team.
*   **Input:** `{ "question": "Which campaign generated the highest revenue?" }`
*   **Output:** Generates the DuckDB SQL and returns a plain-English business explanation.
*   **Executive Use Case:** Answering ad-hoc questions during a board meeting instantly.
