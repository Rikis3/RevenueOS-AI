# Hiring Manager Review Guide

If you are a Hiring Manager evaluating this portfolio project for a GTM Analytics, Revenue Operations, or Marketing Analytics role, this document is for you.

## What is RevenueOS?
RevenueOS is a full-stack, AI-powered Revenue Intelligence platform. It was built entirely from scratch to demonstrate production-ready capabilities across the modern data stack.

## How to Evaluate This Project

### 1. Evaluate the Business Logic, Not Just the Code
Look at the SQL models in `/sql/models/`. You will not find simple `SELECT *` queries. You will find complex cohort analysis, multi-touch attribution (U-Shaped), pipeline velocity formulas, and predictive forecasting logic. This proves the candidate understands SaaS GTM mechanics, not just syntax.

### 2. Notice the AI Implementation
The AI in RevenueOS is not a generic "chatbot" wrapped around a CSV file. It utilizes strict Pydantic parsing and LangChain to force the LLM to behave like a structured financial analyst. Review `/ai/services/wbr_generator.py` to see how AI is used to solve real executive reporting problems.

### 3. Review the Medallion Architecture
Review `/database/schema.sql`. The data warehouse was built using a strict Bronze/Silver/Gold medallion architecture using DuckDB. This proves the candidate can build scalable, analytics-ready data foundations, making them highly independent.

### 4. The Frontend is Intentional
The Next.js frontend was designed to answer business questions ("What happened? Why? What's next?") rather than just dumping charts on a screen. This demonstrates high-level stakeholder empathy and product thinking.

## Summary
The candidate behind this project is ready to transition from reporting to advanced Revenue Operations and Strategy.
