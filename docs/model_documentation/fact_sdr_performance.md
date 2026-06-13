# Model: SDR Performance (`fact_sdr_performance`)

## 1. Business Purpose
To evaluate the Sales Development team on both volume (how hard are they working?) and efficiency (are their activities actually generating pipeline?).

## 2. SQL Logic
Aggregates `fct_sdr_activities` to count calls, emails, and LinkedIn messages per rep. It joins this against the leads they interacted with to see how many converted to SQLs, calculating the ultimate metric: `activities_per_sql`.

## 3. Business Impact
Identifies coaching opportunities. If Rep A makes 500 calls and gets 10 SQLs (50:1 ratio), and Rep B makes 200 calls and gets 10 SQLs (20:1 ratio), the manager knows Rep B has a much better pitch or targeting strategy, despite lower volume.

## 4. Executive Usage
The SDR Manager uses this dashboard to determine promotions to Account Executive. It proves who is generating the most actual dollar-value pipeline, not just who talks on the phone the longest.

## 5. Interview Explanation
**"How do you measure Sales Development performance?"**
*Candidate:* "Most SDR managers just look at activity counts—how many calls did you make today? In RevenueOS, I built `fact_sdr_performance` to connect activities directly to `fct_opportunities`. By generating an `activities_per_sql` and `pipeline_generated` metric, I could rank reps by efficiency, not just raw output. It allowed leadership to easily identify which reps were spamming vs which reps were strategically generating revenue."
