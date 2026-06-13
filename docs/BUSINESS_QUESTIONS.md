# Business Questions & Metric Mapping

This document maps the critical business questions asked by GTM leadership directly to the underlying data models and metrics designed in RevenueOS. 

## 1. Marketing Analytics
| Business Question | Required Metric | Dashboard/View | Underlying SQL Model |
| :--- | :--- | :--- | :--- |
| Which campaigns generated the most actual revenue (not just leads)? | Multi-Touch Attributed ARR | Attribution Analysis | `gold_attribution_roi` |
| Are we spending too much to acquire a qualified lead? | Cost per MQL / Cost per SQL | Marketing Analytics | `gold_marketing_efficiency` |
| What is the ROAS for our LinkedIn Ads channel? | ROAS (Return on Ad Spend) | Marketing Analytics | `gold_attribution_roi` |

## 2. Pipeline & SDR Performance
| Business Question | Required Metric | Dashboard/View | Underlying SQL Model |
| :--- | :--- | :--- | :--- |
| Where are leads falling out of the funnel? | Funnel Stage Conversion Rates | Pipeline Intelligence | `gold_funnel_metrics` |
| Which SDRs are the most efficient at generating pipeline? | Activities to SQL Ratio | RevOps Dashboard | `gold_sdr_performance` |
| Is our pipeline aging too slowly? | Sales Cycle Length, Stage Duration | Pipeline Intelligence | `gold_pipeline_velocity` |

## 3. Revenue Operations & Forecasting
| Business Question | Required Metric | Dashboard/View | Underlying SQL Model |
| :--- | :--- | :--- | :--- |
| Do we have enough pipeline to hit our Q3 quota? | Pipeline Coverage Ratio | Exec Command Center | `gold_forecast_inputs` |
| Based on historical win rates, what will we actually close this month? | Predictive Forecast Value | AI Insights Center | `gold_forecast_inputs` + AI |
| Why did our Win Rate decrease in the Enterprise segment? | Win Rate segmented by Account Size | RevOps Dashboard | `gold_win_loss_analysis` |

## 4. Executive Leadership
| Business Question | Required Metric | Dashboard/View | Underlying SQL Model |
| :--- | :--- | :--- | :--- |
| What is the overall health of the business? | ARR, Net New ARR, Win Rate | Exec Command Center | `gold_executive_kpis` |
| Are we acquiring customers efficiently? | Blended CAC | Exec Command Center | `gold_executive_kpis` |
| What are the biggest risks to the business this week? | AI Risk Summary | AI Insights Center | Copilot Prompt + Gold Layer |
