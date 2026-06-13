# LinkedIn Post Series

Launch your portfolio publicly using this 5-part series.

## Post 1: The Launch (The Hook)
**Hook:** Most analytics portfolios are just a Tableau dashboard showing 'what happened yesterday'. I wanted to build something that shows 'what to do tomorrow'.
**Body:** Today I'm open-sourcing RevenueOS, a full-stack AI Revenue Intelligence platform I built. It doesn't just show charts; it uses DuckDB, FastAPI, and LangChain to actively detect pipeline risks and automate executive reporting.
**Call to Action:** Check out the GitHub repo below and let me know what you think of the architecture!

## Post 2: The Data Model (For the Data Nerds)
**Hook:** Building a dashboard is easy. Building the data model behind it is where the real work happens.
**Body:** For RevenueOS, I built a strict Medallion Architecture using DuckDB. Instead of pulling from messy CSVs, I engineered 10 Gold-layer SQL models that calculate true Pipeline Velocity and U-Shaped Attribution. If the foundation is broken, the AI will hallucinate.
**Call to Action:** I wrote a deep dive on how I modeled the GTM data. Link in the comments.

## Post 3: The AI WBR (For the RevOps Leaders)
**Hook:** How much time does your RevOps team spend pasting charts into PowerPoint every Monday morning?
**Body:** I built an AI Weekly Business Review generator into RevenueOS. It reads the Gold-layer SQL metrics and uses LangChain with strict Pydantic parsing to output exactly three things: Top Wins, Key Risks, and Recommended Actions. No chatbots. Just automated analyst work.
**Call to Action:** Watch this 30-second video of the AI generating a board-ready brief instantly.

## Post 4: Marketing Attribution (For the CMOs)
**Hook:** First-touch attribution lies to you. 
**Body:** In RevenueOS, I built an Attribution Intelligence center that compares First-Touch, Linear, and U-Shaped revenue side-by-side. It visually proves how webinars might not generate the initial lead, but they absolutely accelerate the deal.
**Call to Action:** Marketing analysts: how are you currently modeling multi-touch attribution? 

## Post 5: The Job Hunt Close
**Hook:** Building RevenueOS taught me that modern analytics isn't about writing SQL—it's about driving revenue.
**Body:** As I wrap up this project, I'm officially looking for my next role as a Senior GTM Analyst or RevOps Manager. If your team needs someone who can build the data pipeline, write the SQL, and partner with the CRO to find the missing pipeline, let's talk.
**Call to Action:** My DMs are open!
