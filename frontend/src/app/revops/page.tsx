"use client";

import { RevenueStory } from "@/components/analytics/RevenueStory";
import { Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RevOpsAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-cyan-500 flex items-center">
          <Settings2 className="mr-2 h-8 w-8" /> Revenue Operations
        </h2>
        <p className="text-muted-foreground">
          Pipeline Velocity, Sales Cycle Analysis, and Team Performance.
        </p>
      </div>

      <RevenueStory 
        title="AI Operations Insight"
        what="Average sales cycle has increased by 14 days in the EMEA region."
        why="Legal review blockages and uncoordinated executive alignment on mid-market deals."
        next="Implement mandatory mutual action plans for all deals over $50k at Stage 3."
      />

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Velocity by Rep</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/10">
            [Pipeline Velocity Chart]
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Funnel Leakage Rates</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/10">
            [Leakage Rate Chart]
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
