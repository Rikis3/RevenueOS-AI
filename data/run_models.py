import duckdb
import os
import glob

con = duckdb.connect('database/revenueos.duckdb')

model_files = glob.glob('sql/models/*.sql')
# fact_lead_funnel must run before fact_funnel_leakage
model_files.sort(key=lambda x: 0 if 'fact_lead_funnel' in x else 1)

print("Executing Phase 3 Analytics Models...")
for file in model_files:
    print(f"Running {file}...")
    with open(file, 'r') as f:
        sql = f.read()
    try:
        con.execute(sql)
        print(f"[PASS] {file}")
    except Exception as e:
        print(f"[FAIL] {file} - {e}")

con.close()
print("All models executed.")
