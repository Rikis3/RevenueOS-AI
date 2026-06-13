"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWBR } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function ExecutiveBriefing() {
  const { data, isLoading } = useQuery({
    queryKey: ["wbr"],
    queryFn: fetchWBR,
  });

  if (isLoading) {
    return <Skeleton className="w-full h-[300px]" />;
  }

  return (
    <Card className="border-blue-900/50 bg-blue-950/10 shadow-sm shadow-blue-900/20">
      <CardHeader className="border-b border-blue-900/20 pb-4">
        <CardTitle className="flex items-center text-xl font-bold text-blue-400">
          <Sparkles className="mr-2 h-5 w-5" />
          AI Executive Briefing
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          {data?.executive_summary}
        </p>
      </CardHeader>
      <CardContent className="grid gap-6 pt-6 md:grid-cols-3">
        <div className="space-y-4">
          <h4 className="flex items-center font-semibold text-green-500">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Top Wins
          </h4>
          <ul className="space-y-3">
            {data?.wins.map((win: string, i: number) => (
              <li key={i} className="text-sm text-muted-foreground bg-green-950/20 p-3 rounded-md border border-green-900/30">
                {win}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="flex items-center font-semibold text-red-500">
            <AlertCircle className="mr-2 h-4 w-4" /> Key Risks
          </h4>
          <ul className="space-y-3">
            {data?.risks.map((risk: string, i: number) => (
              <li key={i} className="text-sm text-muted-foreground bg-red-950/20 p-3 rounded-md border border-red-900/30">
                {risk}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="flex items-center font-semibold text-amber-500">
            <TrendingUp className="mr-2 h-4 w-4" /> Recommendations
          </h4>
          <ul className="space-y-3">
            {data?.recommendations.map((rec: string, i: number) => (
              <li key={i} className="text-sm text-muted-foreground bg-amber-950/20 p-3 rounded-md border border-amber-900/30">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
