from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers import executive, marketing, revops, forecast, attribution, ai, nlq, crm

app = FastAPI(
    title="RevenueOS Analytics API",
    description="Backend API exposing Gold-Layer analytics and AI Copilot capabilities.",
    version="1.0.0"
)

# CORS middleware to allow Next.js frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(executive.router, prefix="/api/executive", tags=["Executive"])
app.include_router(marketing.router, prefix="/api/marketing", tags=["Marketing"])
app.include_router(revops.router, prefix="/api/revops", tags=["RevOps"])
app.include_router(forecast.router, prefix="/api/forecast", tags=["Forecasting"])
app.include_router(attribution.router, prefix="/api/attribution", tags=["Attribution"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI Analytics"])
app.include_router(nlq.router, prefix="/api/nlq", tags=["Natural Language Query"])
app.include_router(crm.router, prefix="/api/crm", tags=["CRM Exploration Layer"])

@app.get("/health", tags=["System"])
def health_check():
    return {"status": "ok", "message": "RevenueOS API is running."}
