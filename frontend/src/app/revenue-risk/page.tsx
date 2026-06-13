"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRisks } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Clock, Activity } from "lucide-react";
import { RevenueStory } from "@/components/analytics/RevenueStory";

export default function RevenueRiskCenter() {
  const { data, isLoading } = useQuery({
    queryKey: ["risks"],
    queryFn: fetchRisks,
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-red-500 flex items-center">
          <AlertTriangle className="mr-2 h-8 w-8" /> Revenue Risk Center
        </h2>
        <p className="text-muted-foreground">
          AI-detected pipeline vulnerabilities and stalling accounts.
        </p>
      </div>

      <RevenueStory 
        title="AI Risk Narrative"
        what="We currently have $4.2M of open pipeline at risk in the Enterprise segment."
        why="3 major accounts have not had a logged SDR activity in over 14 days, and funnel leakage at the Proposal stage is up 12%."
        next="Sales managers must enforce next-steps on all stalling Enterprise deals by EOD Friday."
      />

      <h3 className="text-xl font-semibold mt-8 mb-4">High Risk Accounts</h3>
      {isLoading ? (
        <Skeleton className="w-full h-[400px]" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data?.risks?.map((risk: any, i: number) => (
             <Card key={i} className="border-red-900/30 bg-red-950/10">
               <CardHeader className="pb-2">
                 <CardTitle className="text-lg font-medium flex items-start">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red-500 mt-0.5" />
                    <span>{risk.metric_anomaly || risk.alert_type}</span>
                 </CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="text-sm text-slate-300 mb-4">{risk.root_cause}</p>
                  <div className="bg-red-950/30 p-3 rounded text-sm text-red-400 border border-red-900/50">
                    <strong>Action Required:</strong> {risk.recommended_action}
                  </div>
               </CardContent>
             </Card>
          ))}
        </div>
      )}
    </div>
  );
}
