"use client";

import { RevenueStory } from "@/components/analytics/RevenueStory";
import { LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PipelineIntelligence() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-orange-500 flex items-center">
          <LineChart className="mr-2 h-8 w-8" /> Pipeline Intelligence
        </h2>
        <p className="text-muted-foreground">
          Deal aging, stage analysis, and pipeline health.
        </p>
      </div>

      <RevenueStory 
        title="AI Pipeline Analysis"
        what="We generated $2.4M in net new pipeline this week, but $800k of existing pipeline aged past 90 days."
        why="SDRs are hitting outbound targets, but Account Executives are failing to progress early-stage demos."
        next="Require VP approval for any deal sitting in the Demo stage for longer than 45 days."
      />

      <div className="grid gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline by Stage</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground bg-muted/10">
            [Pipeline Stage Chart]
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
