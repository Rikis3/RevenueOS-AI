<div align="center">
  
# 🚀 RevenueOS AI
**The AI-Native Revenue Intelligence Platform**

[![Next.js 15](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](#)
[![DuckDB](https://img.shields.io/badge/DuckDB-FFF000?style=for-the-badge&logo=duckdb&logoColor=black)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

A modern, high-performance Revenue Analytics platform built to process thousands of CRM records in milliseconds while providing predictive AI insights, all wrapped in a pixel-perfect Salesforce Lightning Design System (SLDS) replica.

[Explore the Live Demo](https://frontend-prasuns-projects-bd0bf195.vercel.app) · [View Architecture](#-architecture) · [Containerization Guide](AI_HANDOVER_CONTEXT.md)

</div>

---

## 📖 What is RevenueOS AI?

RevenueOS AI bridges the gap between traditional Customer Relationship Management (CRM) data storage and proactive, AI-driven decision making. 

Sales leaders and CROs often spend hours digging through rigid CRM dashboards trying to find out *why* pipeline generation is down or *which* deals are at risk. RevenueOS actively **thinks** about the data. It analyzes synthetic pipelines, calculates risk scores, maps out complete customer journeys from Marketing to Closed-Won, and presents it in a completely familiar Enterprise interface.

### ✨ Key Features
- **Salesforce SLDS Replica:** Zero learning curve for enterprise teams. The UI features the exact hex codes, drop shadows, and layout structures of Salesforce Sales Cloud.
- **AI Executive Briefing:** Automatically generates natural language narratives explaining pipeline drops and recommending resource reallocation.
- **Customer Journey Explorer:** A visual, interactive node-graph tracing a Lead's lifecycle through Marketing campaigns, SDR touchpoints, and final Deal stages.
- **Pipeline Inspection:** Instantly filter and sort thousands of opportunities with visual "Moved In" and "Moved Out" indicators.
- **Global Search:** Command-K functionality that instantly searches across the entire simulated data warehouse.

---

## 🧠 How I Built It (The Architecture)

This project was built to demonstrate enterprise-grade architecture handling high-volume data analytics without the latency of traditional cloud data warehouses.

### 1. The Analytics Engine (DuckDB)
Instead of relying on a slow external database, the backend uses **DuckDB**, an in-process SQL OLAP database. This allows RevenueOS to execute complex, cross-object aggregate queries (like attributing marketing spend to closed-won revenue) in milliseconds, directly on the server.

### 2. The AI Intelligence Layer (FastAPI)
The backend is powered by **FastAPI** (Python). It doesn't just serve CRUD data; it processes the DuckDB outputs to generate insights. It evaluates stalled deals, flags lacking SDR activity, and scores opportunity risk before sending the payload to the client.

### 3. The Exploration Layer (Next.js 15)
The frontend leverages the bleeding-edge capabilities of **Next.js 15 (App Router)** and React 19. It utilizes Server Components where possible for speed, and interactive client components for the complex Data Tables and ReactFlow node graphs.

### 4. The Data Synthesis
To prove the architecture's speed, I couldn't use just 10 rows of data. I built a custom Python `Faker` script (`data/synthetic_generator.py`) that generates a realistic corporate database:
- **10,000** Accounts
- **20,000** Contacts
- **50,000** Leads
- **100** Marketing Campaigns

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 20+
- Python 3.11+

### 1. Clone the Repository
```bash
git clone https://github.com/Rikis3/RevenueOS-AI.git
cd RevenueOS-AI
```

### 2. Start the Backend (FastAPI)
```bash
# Create a virtual environment and install dependencies
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start the server
uvicorn api.main:app --reload --port 8000
```

### 3. Start the Frontend (Next.js)
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Navigate to `http://localhost:3000` to view the application!

---

## 🐳 Containerization & Deployment

Looking to deploy this via Docker? A full, step-by-step handover context guide is available to help construct the `docker-compose.yml` and `Dockerfiles` for this monorepo. 

👉 **Read the [AI Handover Context Guide](./AI_HANDOVER_CONTEXT.md)**

---

<div align="center">
  <i>Built with passion to push the boundaries of Enterprise SaaS.</i>
</div>
