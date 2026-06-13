"use client";

import { RevenueStory } from "@/components/analytics/RevenueStory";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountIntelligence() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-indigo-400 flex items-center">
          <Building2 className="mr-2 h-8 w-8" /> Account Intelligence
        </h2>
        <p className="text-muted-foreground">
          Target account penetration and whitespace analysis.
        </p>
      </div>

      <RevenueStory 
        title="AI Account Insight"
        what="Only 12% of Target Tier 1 Accounts have an active opportunity."
        why="Outbound sequences are primarily targeting Director-level titles instead of VP/C-Suite."
        next="Launch Executive Door-Opener direct mail campaign targeting C-Suite at unengaged Tier 1 accounts."
      />

      <div className="grid gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Target Accounts</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground bg-muted/10">
            [Target Accounts Table]
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
