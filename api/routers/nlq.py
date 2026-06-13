from fastapi import APIRouter
from pydantic import BaseModel
from ai.services.nl_analytics import NaturalLanguageAnalytics

router = APIRouter()

class NLQRequest(BaseModel):
    question: str

@router.post("/query")
def execute_nlq(request: NLQRequest):
    engine = NaturalLanguageAnalytics()
    return engine.ask_question(request.question)
