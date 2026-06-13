"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAttributionComparison, fetchAttributionNarrative } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RevenueStory } from "@/components/analytics/RevenueStory";
import { PieChart, GitMerge } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AttributionIntelligence() {
  const { data: narrative, isLoading: isNarrativeLoading } = useQuery({
    queryKey: ["attribution-narrative"],
    queryFn: fetchAttributionNarrative,
  });

  const { data: comparison, isLoading: isComparisonLoading } = useQuery({
    queryKey: ["attribution-comparison"],
    queryFn: fetchAttributionComparison,
  });

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val || 0);

  // Prepare data for the chart
  const chartData = comparison?.map((c: any) => ({
    name: c.campaign_name.substring(0, 15) + "...",
    FirstTouch: c.sum_first_touch_revenue,
    LastTouch: c.sum_last_touch_revenue,
    Linear: c.sum_linear_revenue,
    UShaped: c.sum_multi_touch_revenue
  })) || [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-emerald-500 flex items-center">
          <GitMerge className="mr-2 h-8 w-8" /> Attribution Intelligence
        </h2>
        <p className="text-muted-foreground">
          Understand exactly which marketing touchpoints drive real revenue.
        </p>
      </div>

      {isNarrativeLoading ? (
        <Skeleton className="w-full h-32" />
      ) : (
        <RevenueStory 
          title="AI Attribution Narrative"
          what={narrative?.first_touch_highlight || "Paid Search generated the most first-touch revenue."}
          why={narrative?.narrative || "While Paid Search drives the highest volume of first-touch conversions, Webinars act as the critical mid-funnel accelerator, heavily influencing multi-touch revenue."}
          next={narrative?.budget_recommendation || "Maintain Paid Search for top-of-funnel volume, but increase Webinar production budget by 15%."}
        />
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Revenue Allocation by Model</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          {isComparisonLoading ? (
             <Skeleton className="w-full h-full" />
          ) : (
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                 <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                 <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                 <RechartsTooltip cursor={{fill: '#1e293b'}} contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} />
                 <Legend wrapperStyle={{paddingTop: '20px'}}/>
                 <Bar dataKey="FirstTouch" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="LastTouch" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="Linear" fill="#10b981" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="UShaped" fill="#f59e0b" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attribution Comparison Table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead>Campaign</TableHead>
                <TableHead className="text-right">First Touch Rev</TableHead>
                <TableHead className="text-right">Last Touch Rev</TableHead>
                <TableHead className="text-right">Linear Rev</TableHead>
                <TableHead className="text-right text-emerald-400 font-bold">U-Shaped Rev</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparison?.slice(0, 8).map((row: any, i: number) => (
                <TableRow key={i} className="border-slate-800/50 hover:bg-slate-800/20">
                  <TableCell className="font-medium">{row.campaign_name}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.sum_first_touch_revenue)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.sum_last_touch_revenue)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(row.sum_linear_revenue)}</TableCell>
                  <TableCell className="text-right text-emerald-400 font-bold bg-emerald-950/10">{formatCurrency(row.sum_multi_touch_revenue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
