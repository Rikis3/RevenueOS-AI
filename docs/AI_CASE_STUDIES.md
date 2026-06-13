# AI Case Studies (Interview Guide)

This document translates the RevenueOS AI capabilities into compelling STAR-method narratives for interviews, proving that the candidate understands how AI augments Revenue Operations rather than just building generic chatbots.

---

## Case Study 1: Automating the Weekly Business Review (WBR)

**Business Problem (Situation):**
Every Monday, the RevOps and Analytics teams spent 4 hours manually pulling data from Salesforce and HubSpot, pasting it into Excel, and writing bullet points for the executive team's Weekly Business Review. By the time the meeting started, the data was already stale, and the analysts were doing busywork instead of strategic thinking.

**Input Metrics:**
Net New ARR, Blended CAC, Pipeline Coverage Ratio, Marketing Spend.

**Prompt Strategy (Task/Action):**
I didn't want a chatbot. I wanted an automated analyst. I built `wbr_generator.py` using LangChain and OpenAI. I fed it the `gold_fact_executive_kpis` table from DuckDB and forced the LLM, via Pydantic, to output a strict JSON structure: Executive Summary, Top 3 Wins, Top 3 Risks, and Top 3 Recommendations. The system prompt explicitly instructed the AI to "find the signal in the noise and never generate a recommendation without citing the metric."

**Business Impact (Result):**
The AI generated a board-ready WBR in 3 seconds, saving the analytics team 4 hours a week.

**Interview Explanation:**
*Candidate:* "Most companies try to build AI chatbots that let you 'talk to your data.' I find executives don't want to chat—they want the answer. In RevenueOS, I built a generative Weekly Business Review. It ingests the Gold-Layer KPI table and uses Langchain's structured output parsers to generate a strict, formatted executive summary of Wins, Risks, and Recommendations. It essentially automated the junior analyst role, allowing the analytics team to focus on resolving the risks the AI identified rather than just reporting them."

---

## Case Study 2: Revenue Risk Detection

**Business Problem (Situation):**
Opportunities were dying in the pipeline because Sales Managers couldn't manually monitor every single deal. Deals would go 3 weeks without a logged SDR activity, but because they were still marked "Open" in the CRM, the CRO thought the pipeline was healthy.

**Input Metrics:**
Account Health Score, Funnel Leakage Rates, Days Since Last Activity.

**Prompt Strategy (Task/Action):**
I built `risk_detector.py`. It queried the `fact_account_health` model for any account with a Risk Score > 60. I fed this to the LLM and asked it to act as a Revenue Risk Copilot (similar to Clari). The AI parsed the data and generated specific alerts, identifying the root cause (e.g., "Enterprise deal stalling at Proposal stage due to lack of executive engagement").

**Business Impact (Result):**
Managers shifted from reactive pipeline reviews to proactive deal interventions.

**Interview Explanation:**
*Candidate:* "I built an AI Risk Detector that behaves like Clari or Gong. It looks at the `fact_account_health` model, finds open opportunities that haven't had an activity logged in 14 days, and generates an automated warning explaining the specific revenue at risk. When you show a hiring manager that you can use AI to save a $50k deal from going dark, they stop seeing you as a dashboard builder and start seeing you as a revenue driver."

---

## Case Study 3: Next Best Action Engine

**Business Problem (Situation):**
Dashboards show you what happened yesterday. They rarely tell you what to do tomorrow. Marketing leadership had 15 different campaigns running and didn't know which lever to pull to fix a dropping pipeline coverage ratio.

**Input Metrics:**
Campaign ROAS, Pipeline Velocity by Region.

**Prompt Strategy (Task/Action):**
I built `next_best_action.py` as an AI Strategy Engine. The prompt explicitly banned the AI from generating generic advice (like "make more calls"). Every `NextBestAction` Pydantic object required a `supporting_metric` field. 

**Business Impact (Result):**
The AI analyzed the campaign ROI table and specifically recommended shifting $50k from Google Ads to LinkedIn, citing the 4.2x vs 1.5x ROAS differential.

**Interview Explanation:**
*Candidate:* "The hardest part of analytics is driving action. I built a Next Best Action engine in RevenueOS that forces the LLM to tie every recommendation to a specific metric. If it recommends cutting a campaign, it has to cite the Cost-Per-Opportunity. It acts as an automated strategist, ensuring that every GTM decision is backed by hard data rather than gut feeling."
