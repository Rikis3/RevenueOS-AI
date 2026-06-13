# Frontend Architecture

This document details the architecture and design decisions for the RevenueOS Next.js frontend application.

## Tech Stack
*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** ShadCN UI
*   **Data Fetching:** TanStack Query + Axios
*   **State Management:** Zustand
*   **Visualizations:** Recharts

## Design Philosophy

### 1. Executive-First Design
Generic dashboards suffer from "chart overload." RevenueOS follows an executive-first design principle: every page prioritizes a structured text narrative (What happened? Why? What's next?) over raw charts. If an executive only has 30 seconds to look at a page, they must leave with an actionable insight.

### 2. The AI-Native Experience
AI is not bolted onto the side of the application via a chatbot drawer. It is baked directly into the primary content flow. The `ExecutiveBriefing` and `RevenueStory` components use LangChain/FastAPI outputs to immediately deliver synthesized business context above the fold on every single page.

### 3. TanStack Query for Analytics
Analytics queries can be slow. By using TanStack Query, the frontend automatically handles data caching, background refetching, and elegant skeleton loading states, ensuring the UI remains highly responsive even when querying the DuckDB backend.

## Key Components

### `RevenueStory.tsx`
The core building block of the application. It receives three props: `what`, `why`, and `next`, enforcing the paradigm that every metric must be accompanied by context and a recommended action.

### `CommandBar.tsx` (⌘K)
A global search and navigation tool built with `cmdk`. It allows power-users to quickly jump between the Pipeline Intelligence and Attribution pages or immediately trigger an NLQ search without clicking through menus.

### `demoStore.ts`
A Zustand store that maintains global state for the Demo Dataset Selector (Region and Segment), allowing the presenter to filter the entire application with one click during a live demonstration.
