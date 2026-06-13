from fastapi import APIRouter
from pydantic import BaseModel
from ai.services.wbr_generator import WBRGenerator
from ai.services.risk_detector import RiskDetector
from ai.services.forecast_intelligence import ForecastIntelligence
from ai.services.next_best_action import NextBestActionEngine
from ai.services.attribution_narrative import AttributionNarrativeGenerator
from ai.services.kpi_narrative import KPINarrativeGenerator

router = APIRouter()

class KPIRequest(BaseModel):
    metric_name: str
    metric_value: str

@router.post("/wbr")
def generate_wbr():
    generator = WBRGenerator()
    return generator.generate_wbr()

@router.post("/risk-detection")
def detect_risks():
    detector = RiskDetector()
    return detector.detect_risks()

@router.post("/forecast-insights")
def generate_forecast_insights():
    engine = ForecastIntelligence()
    return engine.analyze_forecast()

@router.post("/next-best-actions")
def get_next_best_actions():
    engine = NextBestActionEngine()
    return engine.generate_actions()

@router.post("/attribution-narrative")
def generate_attribution_narrative():
    engine = AttributionNarrativeGenerator()
    return engine.generate_narrative()

@router.post("/kpi-narrative")
def generate_kpi_narrative(request: KPIRequest):
    engine = KPINarrativeGenerator()
    return engine.explain_kpi(request.metric_name, request.metric_value)
