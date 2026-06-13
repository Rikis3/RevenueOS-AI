import duckdb
import pandas as pd

con = duckdb.connect('database/revenueos.duckdb')

print("# Phase 2: Data Generation Summary\n")

print("## Table Row Counts\n")
tables = con.execute("SHOW TABLES").fetchall()
for t in tables:
    table_name = t[0]
    cnt = con.execute(f"SELECT COUNT(*) FROM {table_name}").fetchone()[0]
    print(f"- **{table_name}**: {cnt:,} rows")

print("\n## Sample Data: Opportunities (fct_opportunities)\n")
print(con.execute("SELECT opportunity_id, stage, amount, mrr, forecast_category, is_won FROM fct_opportunities LIMIT 5").fetchdf().to_markdown(index=False))

print("\n## Sample Data: Attribution Touchpoints (fct_attribution_touchpoints)\n")
print(con.execute("SELECT touchpoint_id, lead_id, opportunity_id, interaction_type, interaction_date FROM fct_attribution_touchpoints LIMIT 5").fetchdf().to_markdown(index=False))

print("\n## Sample Data: Campaigns (dim_campaign)\n")
print(con.execute("SELECT campaign_name, channel_name, budget, spend, ctr, cpc FROM dim_campaign LIMIT 5").fetchdf().to_markdown(index=False))

con.close()
