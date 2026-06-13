from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "RevenueOS API is running."}

def test_get_executive_kpis():
    response = client.get("/api/executive/kpis")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        assert "net_new_arr" in data[0]

def test_get_marketing_roi():
    response = client.get("/api/marketing/campaign-roi")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_revops_pipeline_velocity():
    response = client.get("/api/revops/pipeline-velocity")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_forecast_summary():
    response = client.get("/api/forecast/summary")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_attribution_comparison():
    response = client.get("/api/attribution/comparison")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

# AI Tests (assuming mock-key is active, otherwise requires API key)
def test_ai_wbr():
    response = client.post("/api/ai/wbr")
    assert response.status_code == 200
    data = response.json()
    assert "executive_summary" in data
    assert "wins" in data

def test_nlq():
    response = client.post("/api/nlq/query", json={"question": "What is the best campaign?"})
    assert response.status_code == 200
    data = response.json()
    assert "generated_sql" in data
    assert "business_explanation" in data
