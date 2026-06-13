# Model: Campaign ROI (`fact_campaign_roi`)

## 1. Business Purpose
To provide the Marketing team with exact financial metrics regarding the efficiency of their ad spend, allowing them to shift budget away from underperforming channels.

## 2. SQL Logic
The model aggregates top-of-funnel volume (`leads_generated`) and bottom-of-funnel revenue (`revenue_generated`) mapped to the specific `campaign_id`. It then calculates Cost Per Lead (CPL), Cost Per MQL, Return on Ad Spend (ROAS), and overall ROI.

## 3. Business Impact
Eliminates marketing vanity metrics. A campaign might generate 50,000 impressions and a 5% CTR, but if the ROAS is 0.5x, the company is losing money. This model enforces revenue-accountability for the marketing team.

## 4. Executive Usage
The VP of Marketing uses this to justify budget requests to the CFO. If they can prove that 'Webinar' campaigns consistently yield a 4.0x ROAS while 'Google Ads' yield 1.2x, they can confidently reallocate $100k to Webinars.

## 5. Interview Explanation
**"How do you tie marketing efforts to revenue?"**
*Candidate:* "By building a unified fact table that bridges the gap between ad platforms and the CRM. In RevenueOS, I built the `fact_campaign_roi` model. It doesn't just look at Cost-Per-Click; it joins Campaign Spend to `fct_opportunities` to calculate the actual Cost-Per-Opportunity and Return on Ad Spend (ROAS). This allows marketing leadership to defend their budget based on pipeline contribution, not just lead volume."
