# Model: Attribution Engine (`fact_attribution_engine`)

## 1. Business Purpose
B2B SaaS sales cycles are long and complex. A single buyer might click a LinkedIn ad, attend a webinar, and read an email before booking a demo. This model ensures that revenue credit is distributed mathematically across all those touchpoints to accurately reflect marketing's influence.

## 2. SQL Logic
The model uses SQL window functions (`ROW_NUMBER() OVER PARTITION BY opportunity_id ORDER BY date`) to rank every interaction a customer had before purchasing. It then calculates four different columns: First-Touch (100% to rank 1), Last-Touch (100% to max rank), Linear (Amount / Count), and Multi-Touch/U-Shaped (40/20/40 split). 

## 3. Business Impact
It stops the internal war between Marketing and Sales regarding "who sourced the deal". By providing a Multi-Touch revenue column, leadership can see the holistic journey and justify spending on mid-funnel content (like Webinars) that rarely generate the *first* click but are critical for *closing*.

## 4. Executive Usage
The CMO uses this to prove that their expensive Brand Awareness campaigns (which only ever show up as First-Touch) are actually driving downstream revenue, even if they aren't the Last-Touch before the deal closes.

## 5. Interview Explanation
**"How do you handle multi-touch attribution in B2B?"**
*Candidate:* "In RevenueOS, I built a `fact_attribution_engine` using SQL Window functions to sequence every campaign touchpoint associated with a Closed-Won opportunity. I didn't just build one model; I built First-Touch, Last-Touch, Linear, and U-Shaped models into the same view. This allowed stakeholders to see the delta. For example, we could see that 'Webinars' had zero First-Touch revenue, but $500k in U-Shaped revenue, proving it was a critical mid-funnel conversion driver that shouldn't be cut from the budget."
