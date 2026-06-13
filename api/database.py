import duckdb
import pandas as pd
from fastapi import HTTPException

# Path to the DuckDB database
DB_PATH = "database/revenueos.duckdb"

def get_db_connection():
    """Returns a DuckDB connection. Caller must close."""
    try:
        return duckdb.connect(DB_PATH)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection error: {str(e)}")

def fetch_all_as_dict(query: str, params: tuple = None) -> list:
    """Helper to fetch a query and return it as a list of dictionaries."""
    con = get_db_connection()
    try:
        if params:
            df = con.execute(query, params).fetchdf()
        else:
            df = con.execute(query).fetchdf()
        
        # Replace NaN with None for JSON serialization by casting to object first
        df = df.astype(object).where(pd.notnull(df), None)
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database query error: {str(e)}")
    finally:
        con.close()
