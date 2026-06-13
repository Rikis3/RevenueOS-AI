# Data Dictionary (Silver Layer)

This dictionary defines the clean, conformed tables in the Silver Layer of the Medallion Architecture. These tables serve as the foundation for the Gold Layer analytics models.

## Table: `dim_accounts`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `account_id` | STRING (PK) | Unique identifier for the company. |
| `account_name` | STRING | Legal name of the company. |
| `industry` | STRING | Vertical market (e.g., Healthcare, FinTech, SaaS). |
| `employee_count` | INTEGER | Estimated number of employees. |
| `region` | STRING | Geographic territory (e.g., NAMER, EMEA, APAC). |
| `created_at` | TIMESTAMP | Date the account was first created in CRM. |

## Table: `dim_campaigns`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `campaign_id` | STRING (PK) | Unique identifier for the marketing initiative. |
| `campaign_name` | STRING | Descriptive name of the campaign. |
| `channel` | STRING | Marketing channel (e.g., LinkedIn Ads, SEO, Events). |
| `budget` | DECIMAL | Total allocated budget for the campaign. |
| `start_date` | TIMESTAMP | Launch date. |

## Table: `fct_leads`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `lead_id` | STRING (PK) | Unique identifier for the person. |
| `account_id` | STRING (FK) | Maps to `dim_accounts` if known. |
| `status` | STRING | Current funnel stage (e.g., Raw, MQL, Working, Converted). |
| `lead_source` | STRING | The original source of acquisition. |
| `created_at` | TIMESTAMP | Timestamp of lead creation. |
| `mql_date` | TIMESTAMP | Timestamp when lead reached MQL threshold. |
| `converted_date` | TIMESTAMP | Timestamp when lead was converted to an Opportunity. |

## Table: `fct_opportunities`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `opportunity_id` | STRING (PK) | Unique identifier for the deal. |
| `account_id` | STRING (FK) | Maps to `dim_accounts`. |
| `amount` | DECIMAL | Pipeline value (ARR) of the deal. |
| `stage` | STRING | Current sales stage (e.g., Discovery, Proposal, Closed Won). |
| `probability` | INTEGER | 0-100% likelihood to close based on stage. |
| `created_date` | TIMESTAMP | Date the opportunity was created (SQL date). |
| `close_date` | TIMESTAMP | Expected or actual close date. |
| `is_won` | BOOLEAN | True if Closed Won. |

## Table: `fct_attribution_touchpoints`
| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `touchpoint_id` | STRING (PK) | Unique ID for the interaction. |
| `lead_id` | STRING (FK) | The person interacting. |
| `campaign_id` | STRING (FK) | The campaign driving the interaction. |
| `opportunity_id` | STRING (FK) | Nullable. The opportunity this touchpoint influenced. |
| `interaction_date` | TIMESTAMP | When the interaction occurred. |
| `interaction_type` | STRING | Type (e.g., Form Fill, Webinar Attendee, Ad Click). |
