"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchForecastInsights } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RevenueStory } from "@/components/analytics/RevenueStory";
import { Calculator, Target, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ForecastCenter() {
  const { data, isLoading } = useQuery({
    queryKey: ["forecast-insights"],
    queryFn: fetchForecastInsights,
  });

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-indigo-500 flex items-center">
          <Calculator className="mr-2 h-8 w-8" /> Forecast Center
        </h2>
        <p className="text-muted-foreground">
          Predictive statistical forecasting vs sales rep commit.
        </p>
      </div>

      {isLoading ? (
        <Skeleton className="w-full h-32" />
      ) : (
        <RevenueStory 
          title="AI Forecast Narrative"
          what={`The team has committed ${formatCurrency(data?.commit_forecast)}, but the statistical expected revenue is only ${formatCurrency(data?.expected_revenue)}.`}
          why={data?.explanation || "The commit outpaces mathematical probability based on historical stage conversion rates."}
          next="Scrub the pipeline and downgrade deals in early stages that reps have overly optimistically committed."
        />
      )}

      <div className="grid gap-6 md:grid-cols-4 mt-8">
        <Card className="border-indigo-900/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Statistical Expected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">{isLoading ? "-" : formatCurrency(data?.expected_revenue)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-indigo-950/20 border-indigo-500/50 ring-1 ring-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-300 flex justify-between">
              Rep Commit
              <Badge variant="outline" className="text-xs bg-indigo-500/20 border-indigo-500/50">Stated</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{isLoading ? "-" : formatCurrency(data?.commit_forecast)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Best Case</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">{isLoading ? "-" : formatCurrency(data?.best_case_forecast)}</div>
          </CardContent>
        </Card>
        
        <Card className={data?.confidence_score < 70 ? "border-amber-900/50 bg-amber-950/10" : "border-emerald-900/50 bg-emerald-950/10"}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-slate-400">
              Confidence Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">{isLoading ? "-" : `${data?.confidence_score}/100`}</div>
            <p className="text-xs mt-2 text-slate-400">Probability of hitting commit</p>
          </CardContent>
        </Card>
      </div>
      
      {!isLoading && data?.driving_factors && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Risk Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              {data.driving_factors.map((factor: string, i: number) => (
                <li key={i}>{factor}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
