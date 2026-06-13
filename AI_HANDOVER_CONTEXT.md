# RevenueOS AI: System Context & AI Handover Document

## 🤖 Context for the AI Agent
**Role:** You are an expert DevOps and Full-Stack Engineering AI Assistant.
**Task:** Your objective is to read this context document, understand the current state of the `RevenueOS AI` repository, and help the user prepare Docker containers, images, and deployment scripts to showcase this project in their professional portfolio.

---

## 🏗️ Project Overview
**Name:** RevenueOS AI
**Description:** A next-generation, AI-native Revenue Intelligence platform. It serves as an analytics layer on top of CRM data, allowing users to inspect pipelines, attribute marketing ROI, and generate AI-driven executive briefings.
**UI/UX:** The frontend is a pixel-perfect replica of the **Salesforce Lightning Design System (SLDS)**.

### Tech Stack
1. **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS, Lucide React, Shadcn UI.
2. **Backend:** FastAPI (Python), Uvicorn.
3. **Database:** DuckDB (In-process OLAP SQL Engine).
4. **Data Generation:** Python `Faker` script used to generate a massive synthetic B2B CRM dataset (Accounts, Leads, Opportunities, Campaigns).

---

## 📁 Repository Structure
The project is split into distinct environments:

### 1. `frontend/` (Next.js Application)
- **Framework:** Next.js (App Router)
- **Key Routes:** `/` (Executive Center), `/opportunities` (Pipeline Inspection), `/journey` (Customer Journey Node Graph).
- **Styling:** Strict adherence to Salesforce SLDS using Tailwind (`#0176d3` for action blue, `#dddbda` for borders, `#b0c4df` for classic layout backgrounds).
- **Run Command:** `npm run dev`
- **Build Command:** `npm run build`

### 2. `api/` (FastAPI Backend)
- **Framework:** FastAPI
- **Entrypoint:** `api/main.py`
- **Routers:** `api/routers/crm.py`, `api/routers/ai.py`, `api/routers/executive.py`, etc.
- **Run Command:** `uvicorn api.main:app --reload --port 8000`

### 3. `database/` & `data/` (DuckDB & Synthetic Data)
- **`data/synthetic_generator.py`:** Generates millions of rows of mock CRM data (CSV format).
- **`database/revenueos.duckdb`:** The highly-optimized analytical database file used by FastAPI to run complex aggregation queries.

---

## 🚀 Next Steps: Containerization & Portfolio Prep

The user needs you to containerize this application so it can be easily spun up in a portfolio environment. 

### Recommended Action Plan for the AI:

**1. Create a Frontend Dockerfile (`frontend/Dockerfile`)**
- Needs to use a Node.js base image (e.g., `node:20-alpine`).
- Needs to run `npm ci`, `npm run build`, and expose port `3000`.

**2. Create a Backend Dockerfile (`Dockerfile` in root)**
- Needs to use a Python base image (e.g., `python:3.11-slim`).
- Needs to copy `requirements.txt`, install dependencies, copy the `api/`, `database/`, and `sql/` directories.
- Needs to expose port `8000`.
- *Critical:* Ensure the `.duckdb` file is included or the container runs the synthetic data generation script on startup.

**3. Create `docker-compose.yml`**
- Wire both the `frontend` and `backend` services together.
- Ensure the frontend environment variables point to the backend container (e.g., `NEXT_PUBLIC_API_URL=http://backend:8000`).

**4. Prepare Portfolio Assets**
- Write a compelling `README.md` that highlights the architecture, the SLDS clone, and the DuckDB aggregation speed.
- Instruct the user on how to take screenshots or host the Docker containers on a platform like Render, Railway, or AWS ECS for their live portfolio.

---
**AI Instruction:** Acknowledge this context, ask the user if they want to start by writing the `docker-compose.yml` and `Dockerfiles`, and proceed step-by-step to containerize RevenueOS AI.
