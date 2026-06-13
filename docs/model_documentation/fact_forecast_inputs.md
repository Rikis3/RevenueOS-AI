# Model: Forecasting Inputs (`fact_forecast_inputs`)

## 1. Business Purpose
To move the organization away from "gut-feel" sales forecasting by applying mathematical probabilities to the current pipeline to predict where the quarter will land.

## 2. SQL Logic
The model aggregates all open pipeline by `forecast_category` (Commit, Upside, Pipeline, Best Case) and `stage`. It then joins a mapping of historical stage probabilities to calculate the `expected_revenue` (Weighted Pipeline = Amount * Probability).

## 3. Business Impact
Allows executives to accurately report quarterly numbers to the board of directors. If the sales team is manually "committing" $2M for the quarter, but the statistical `expected_revenue` model is only showing $1.2M based on the current stages of those deals, leadership has early warning to intervene.

## 4. Executive Usage
The CRO uses this model as the primary view during Monday morning forecast calls. They compare the bottom-up rep forecast against the top-down data forecast.

## 5. Interview Explanation
**"How do you improve forecast accuracy?"**
*Candidate:* "Sales reps are notoriously optimistic. In RevenueOS, I built a `fact_forecast_inputs` model to provide a mathematical counterweight to rep sentiment. I aggregated the open pipeline and applied a stage-weighted probability score to generate an `expected_revenue` column. During forecast calls, RevOps could flag if the manual 'Commit' number was severely deviating from the statistical reality, which improved our forecasting accuracy to within a 5% margin of error."
