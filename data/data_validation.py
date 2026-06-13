import duckdb
import pandas as pd

DB_PATH = 'database/revenueos.duckdb'

print("Running Data Validation Tests...")
con = duckdb.connect(DB_PATH)

tests_passed = True

def assert_query(query, expected, test_name):
    global tests_passed
    result = con.execute(query).fetchone()[0]
    if result == expected:
        print(f"[PASS] {test_name}")
    else:
        print(f"[FAIL] {test_name}. Expected {expected}, got {result}")
        tests_passed = False

def assert_query_greater_than(query, threshold, test_name):
    global tests_passed
    result = con.execute(query).fetchone()[0]
    if result > threshold:
        print(f"[PASS] {test_name} ({result} > {threshold})")
    else:
        print(f"[FAIL] {test_name}. Expected > {threshold}, got {result}")
        tests_passed = False

# 1. Null Checks
assert_query("SELECT COUNT(*) FROM fct_opportunities WHERE account_id IS NULL", 0, "No orphaned opportunities")
assert_query("SELECT COUNT(*) FROM fct_attribution_touchpoints WHERE lead_id IS NULL", 0, "No orphaned touchpoints")

# 2. Date Consistency
assert_query("SELECT COUNT(*) FROM fct_opportunities WHERE close_date < created_date", 0, "Close date is after creation date")

# 3. Revenue Consistency
assert_query("SELECT COUNT(*) FROM fct_opportunities WHERE tcv < mrr", 0, "TCV is greater than or equal to MRR")

# 4. Pipeline consistency
assert_query("SELECT COUNT(*) FROM fct_opportunities WHERE stage = 'Closed Won' AND is_won = FALSE", 0, "Closed Won flag matches stage")

# 5. Enterprise ACV validation
avg_ent_arr = con.execute("SELECT AVG(amount) FROM fct_opportunities o JOIN dim_account a ON o.account_id = a.account_id WHERE a.account_tier = 'Enterprise'").fetchone()[0]
avg_smb_arr = con.execute("SELECT AVG(amount) FROM fct_opportunities o JOIN dim_account a ON o.account_id = a.account_id WHERE a.account_tier = 'SMB'").fetchone()[0]

if avg_ent_arr > avg_smb_arr:
    print(f"[PASS] Enterprise ACV ({avg_ent_arr:.2f}) > SMB ACV ({avg_smb_arr:.2f})")
else:
    print(f"[FAIL] Enterprise ACV is not greater than SMB ACV")
    tests_passed = False

# 6. Attribution Consistency
assert_query_greater_than("SELECT COUNT(DISTINCT opportunity_id) FROM fct_attribution_touchpoints", 0, "Touchpoints exist for opportunities")

print("-" * 30)
if tests_passed:
    print("ALL VALIDATION TESTS PASSED. Data is ready for Phase 3.")
else:
    print("VALIDATION TESTS FAILED. Please review the generation logic.")

con.close()
