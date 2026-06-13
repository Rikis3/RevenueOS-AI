import duckdb
import pandas as pd

con = duckdb.connect('database/revenueos.duckdb')

# 1. Funnel Counts
leads_query = "SELECT COUNT(*) FROM fct_leads"
mqls_query = "SELECT COUNT(*) FROM fct_leads WHERE mql_date IS NOT NULL"
sqls_query = "SELECT COUNT(*) FROM fct_leads WHERE sql_date IS NOT NULL"
opps_query = "SELECT COUNT(*) FROM fct_opportunities"
won_query = "SELECT COUNT(*) FROM fct_opportunities WHERE is_won = TRUE"

total_leads = con.execute(leads_query).fetchone()[0]
total_mqls = con.execute(mqls_query).fetchone()[0]
total_sqls = con.execute(sqls_query).fetchone()[0]
total_opps = con.execute(opps_query).fetchone()[0]
total_won = con.execute(won_query).fetchone()[0]

# 2. Conversion Rates
lead_to_mql = (total_mqls / total_leads * 100) if total_leads else 0
mql_to_sql = (total_sqls / total_mqls * 100) if total_mqls else 0
sql_to_opp = (total_opps / total_sqls * 100) if total_sqls else 0
opp_to_won = (total_won / total_opps * 100) if total_opps else 0
win_rate = (total_won / con.execute("SELECT COUNT(*) FROM fct_opportunities WHERE is_closed = TRUE").fetchone()[0] * 100)

# 3. Averages
avg_deal_size = con.execute("SELECT AVG(amount) FROM fct_opportunities WHERE is_won = TRUE").fetchone()[0]
avg_sales_cycle = con.execute("SELECT AVG(DATE_DIFF('day', created_date, close_date)) FROM fct_opportunities WHERE is_won = TRUE").fetchone()[0]

print("# Funnel Validation Report")
print("\nThis report validates the synthetic SaaS data generated in Phase 2 to ensure realistic Go-To-Market conversion rates and metrics.")
print("\n## 1. Funnel Volumes")
print(f"- **Total Leads**: {total_leads:,}")
print(f"- **MQLs**: {total_mqls:,}")
print(f"- **SQLs**: {total_sqls:,}")
print(f"- **Opportunities**: {total_opps:,}")
print(f"- **Closed Won**: {total_won:,}")

print("\n## 2. Stage-to-Stage Conversion Rates")
print(f"- **Lead to MQL**: {lead_to_mql:.1f}% *(Target: 20-35%)*")
print(f"- **MQL to SQL**: {mql_to_sql:.1f}% *(Target: 35-55%)*")
print(f"- **SQL to Opportunity**: {sql_to_opp:.1f}% *(Target: 20-40%)*")
print(f"- **Opportunity to Closed Won**: {opp_to_won:.1f}% *(Target: 15-35%)*")

print("\n## 3. Key Performance Indicators")
print(f"- **Overall Win Rate (Won / Closed)**: {win_rate:.1f}%")
print(f"- **Average Deal Size (ACV)**: ${avg_deal_size:,.2f}")
print(f"- **Average Sales Cycle Length**: {avg_sales_cycle:.1f} days")

con.close()
