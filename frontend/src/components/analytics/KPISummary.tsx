"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchExecutiveKPIs } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function KPISummary() {
  const { data, isLoading } = useQuery({
    queryKey: ["kpis"],
    queryFn: fetchExecutiveKPIs,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!data) return null;

  const kpiData = Array.isArray(data) ? data[0] : data;
  if (!kpiData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(kpiData).map(([key, value]) => {
        const titles: Record<string, string> = {
          arr: "Annual Recurring Revenue",
          mrr: "Monthly Recurring Revenue",
          pipeline_created: "Pipeline Created",
          forecast: "Current Forecast",
          pipeline_coverage: "Pipeline Coverage",
          marketing_roi: "Marketing ROI",
          win_rate: "Win Rate"
        };
        
        const title = titles[key] || key;
        const routes: Record<string, string> = {
          arr: "/accounts",
          mrr: "/accounts",
          pipeline_created: "/opportunities",
          forecast: "/opportunities",
          pipeline_coverage: "/opportunities",
          marketing_roi: "/campaigns",
          win_rate: "/opportunities"
        };
        const drilldownRoute = routes[key] || "#";

        return (
          <Link href={drilldownRoute} key={key} className="block transition-transform hover:-translate-y-1">
            <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm hover:shadow-md cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
                <CardTitle className="text-[0.75rem] font-bold text-[#444444] uppercase tracking-wide truncate pr-2">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-xl font-bold text-[#080707]">
                  {typeof value === 'number' 
                    ? key.includes('rate') || key.includes('coverage') || key.includes('roi') 
                      ? `${value.toFixed(1)}${key.includes('coverage') ? 'x' : '%'}` 
                      : `$${(value / 1000).toFixed(0)}k` 
                    : value as React.ReactNode}
                </div>
                <div className="text-[0.65rem] text-[#706e6b] mt-1 flex justify-between items-center">
                  <span>+2% vs last month</span>
                  <span className="text-[#0176d3] font-medium group-hover:underline">View List &rarr;</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
