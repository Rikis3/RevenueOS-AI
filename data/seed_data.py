import duckdb
import os

DB_PATH = 'database/revenueos.duckdb'
BRONZE_DIR = 'database/bronze'
SCHEMA_FILE = 'database/schema.sql'

print("Initializing DuckDB...")
con = duckdb.connect(DB_PATH)

# Read schema.sql and split by statements (simple approach)
print("Applying schema and views...")
with open(SCHEMA_FILE, 'r') as f:
    sql_script = f.read()

# Instead of parsing the whole script which might fail if tables don't exist yet for views,
# we will first create the tables, load the CSVs, then create the views.

table_names = [
    'raw_regions', 'raw_industries', 'raw_marketing_channels', 'raw_sales_users',
    'raw_accounts', 'raw_contacts', 'raw_campaigns', 'raw_leads', 
    'raw_opportunities', 'raw_opportunity_history', 'raw_attribution_touchpoints',
    'raw_sdr_activities'
]

# Run the DDL from schema.sql
con.execute(sql_script)

print("Loading CSVs into Bronze Tables...")
for table in table_names:
    csv_file = os.path.join(BRONZE_DIR, f"{table}.csv")
    if os.path.exists(csv_file):
        # DuckDB can ingest CSV directly
        con.execute(f"COPY {table} FROM '{csv_file}' (AUTO_DETECT TRUE);")
        count = con.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
        print(f"Loaded {count} rows into {table}")
    else:
        print(f"Warning: {csv_file} not found.")

print("DuckDB Warehouse successfully seeded!")
con.close()
