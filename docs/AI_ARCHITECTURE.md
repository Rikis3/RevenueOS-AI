# RevenueOS AI Architecture

## Overview
The RevenueOS AI Layer is not a generic chatbot. It is a highly opinionated **Revenue Intelligence Copilot** modeled after enterprise tools like Clari, Gong, and Tableau Pulse. 

Its primary purpose is to sit on top of the structured Gold-Layer data warehouse (DuckDB) and translate raw metrics into board-meeting-ready business narratives, risk assessments, and action plans.

## Tech Stack
*   **Core Framework**: LangChain
*   **LLM Interface**: OpenAI (`gpt-4o`)
*   **Structured Outputs**: Pydantic models to enforce strict, parsable JSON responses instead of unstructured chat blocks.
*   **Database**: DuckDB (for fast, in-process analytical querying)

## The 7 AI Capabilities

1.  **Weekly Business Review (`wbr_generator.py`)**
    *   **Input**: `gold_fact_executive_kpis`
    *   **Logic**: Ingests the last 3 months of macro-KPIs and uses an LLM to find the "signal in the noise," outputting explicit Wins, Risks, and Recommendations.

2.  **Revenue Risk Detection (`risk_detector.py`)**
    *   **Input**: `gold_fact_account_health`, `gold_fact_funnel_leakage`
    *   **Logic**: Scans the account health scores and funnel drop-offs to generate alerts (e.g., "3 Enterprise opportunities have no SDR activity in 14+ days").

3.  **Forecast Intelligence (`forecast_intelligence.py`)**
    *   **Input**: `gold_fact_forecast_inputs`
    *   **Logic**: Analyzes the mathematical expected revenue against the rep-committed forecast to generate a confidence score and explain the variance.

4.  **Next Best Action Engine (`next_best_action.py`)**
    *   **Input**: `gold_fact_campaign_roi`, `gold_fact_pipeline_velocity`
    *   **Logic**: An AI strategy engine that requires every recommendation to be backed by a specific metric (e.g., "Reallocate $50k from Google Ads to LinkedIn because LinkedIn ROAS is 4.2x vs 1.5x").

5.  **Attribution Narrative (`attribution_narrative.py`)**
    *   **Input**: `gold_fact_attribution_engine`
    *   **Logic**: Translates the complex differences between First-Touch and U-Shaped attribution into a business narrative suitable for a CMO.

6.  **Natural Language Analytics (`nl_analytics.py`)**
    *   **Input**: DuckDB Schema
    *   **Logic**: Text-to-SQL copilot that allows executives to ask questions ("Which campaigns generated the highest ARR?") and returns both the SQL and the business translation.

7.  **Executive KPI Narratives (`kpi_narrative.py`)**
    *   **Input**: Specific KPI values + historical context
    *   **Logic**: Automatically generates the "Why?" behind a dashboard metric so executives don't have to guess why a number is red or green.

## Design Philosophy
We explicitly avoided building a conversational chatbot because GTM Executives don't want to chat with their data—they want their data to tell them what to do. By enforcing strict Pydantic outputs, the AI behaves like an automated RevOps Analyst generating structured reports.
