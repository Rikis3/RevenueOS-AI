# System Architecture (Medallion & AI)

This diagram illustrates how raw siloed data flows through the Analytics Engineering pipeline to become executive-ready insights. 

```mermaid
flowchart TD
    subgraph Data Sources
        CRM[(Salesforce CRM)]
        MA[(HubSpot Marketing)]
    end

    subgraph Data Warehouse / Analytics Layer
        direction TB
        
        subgraph Bronze Layer (Raw)
            RAW_ACCOUNTS[raw_accounts]
            RAW_LEADS[raw_leads]
            RAW_OPPS[raw_opportunities]
            RAW_CAMPAIGNS[raw_campaigns]
        end
        
        subgraph Silver Layer (Conformed)
            DIM_ACC[dim_accounts]
            FCT_LEADS[fct_leads]
            FCT_OPPS[fct_opportunities]
            DIM_CAMP[dim_campaigns]
            FCT_TOUCH[fct_attribution_touchpoints]
        end
        
        subgraph Gold Layer (Business Value)
            GOLD_FUNNEL[gold_funnel_metrics]
            GOLD_ATTRIB[gold_attribution_roi]
            GOLD_FCST[gold_forecast_inputs]
            GOLD_EXEC[gold_executive_kpis]
        end
        
        Bronze Layer -->|Standardize & Clean| Silver Layer
        Silver Layer -->|Aggregate & Model| Gold Layer
    end

    subgraph Backend API (FastAPI)
        API_EXEC[Executive Endpoints]
        API_MKT[Marketing Endpoints]
        API_REV[RevOps Endpoints]
    end

    subgraph AI Analytics Copilot
        LLM[LangChain + LLM]
        PROMPTS[Prompt Templates]
        WBR_GEN[WBR Generator]
        SQL_GEN[Text-to-SQL Agent]
    end

    subgraph Frontend Application (Next.js)
        UI_EXEC[Executive Command Center]
        UI_MKT[Marketing Analytics]
        UI_REV[RevOps Dashboard]
        UI_COPILOT[AI Insights Center]
    end

    CRM --> RAW_ACCOUNTS
    CRM --> RAW_LEADS
    CRM --> RAW_OPPS
    MA --> RAW_LEADS
    MA --> RAW_CAMPAIGNS

    Gold Layer --> API_EXEC
    Gold Layer --> API_MKT
    Gold Layer --> API_REV
    Gold Layer --> SQL_GEN

    API_EXEC --> UI_EXEC
    API_MKT --> UI_MKT
    API_REV --> UI_REV

    SQL_GEN --> LLM
    WBR_GEN --> LLM
    LLM --> UI_COPILOT
```

## Architectural Design Choices (GTM Focus)
*   **Separation of Concerns**: The Frontend does not do heavy data processing. It solely fetches pre-aggregated metrics from the API, simulating a modern enterprise BI architecture.
*   **Gold Layer Supremacy**: All AI prompts and backend endpoints point strictly to the Gold Layer. This ensures the AI Copilot never hallucinates a metric definition (e.g., calculating Win Rate differently than the Executive dashboard).
*   **Analytics Engineering over Software Engineering**: The complexity of this project lives in the SQL transformations moving data from Bronze to Gold, not in complex API routing or UI state management.
