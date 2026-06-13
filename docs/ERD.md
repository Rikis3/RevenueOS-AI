# Entity Relationship Diagram (ERD)

This document visualizes the relationships between the core Silver Layer tables. It uses Mermaid syntax, which is widely used in modern documentation and GitHub.

```mermaid
erDiagram
    dim_accounts ||--o{ fct_opportunities : "has many"
    dim_accounts ||--o{ fct_leads : "has many"
    
    fct_leads ||--o{ fct_attribution_touchpoints : "generates"
    fct_leads ||--o| fct_opportunities : "converts to"
    
    dim_campaigns ||--o{ fct_attribution_touchpoints : "drives"
    
    fct_opportunities ||--o{ fct_attribution_touchpoints : "influenced by"

    dim_accounts {
        string account_id PK
        string account_name
        string industry
        string region
    }

    dim_campaigns {
        string campaign_id PK
        string campaign_name
        string channel
        decimal budget
    }

    fct_leads {
        string lead_id PK
        string account_id FK
        string status
        timestamp mql_date
    }

    fct_opportunities {
        string opportunity_id PK
        string account_id FK
        decimal amount
        string stage
        boolean is_won
    }

    fct_attribution_touchpoints {
        string touchpoint_id PK
        string lead_id FK
        string campaign_id FK
        string opportunity_id FK
        timestamp interaction_date
    }
```

## Architectural Notes
*   **Star Schema Approach**: The design heavily leans toward a star schema (fact tables surrounded by dimension tables) to optimize for analytical queries and BI tool ingestion.
*   **Attribution Linkage**: The `fct_attribution_touchpoints` table is the critical junction that links Marketing effort (`dim_campaigns`) to Sales outcomes (`fct_opportunities`), enabling multi-touch attribution models.
