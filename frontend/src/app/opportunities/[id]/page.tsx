"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchCRMOpportunityDetail } from "@/lib/api";
import { RecordHeader } from "@/components/crm/RecordHeader";
import { ActivityTimeline } from "@/components/crm/ActivityTimeline";
import { Target, Activity, Zap, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueStory } from "@/components/analytics/RevenueStory";

export default function OpportunityDetail() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["crm-opportunity", id],
    queryFn: () => fetchCRMOpportunityDetail(id),
  });

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-32 w-full"/><Skeleton className="h-64 w-full"/></div>;
  if (!data) return <div>Opportunity not found</div>;

  const { opportunity, history } = data;

  const formatCurrency = (val: number) => val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val) : "-";

  // Map history to timeline events
  const timelineEvents = history.map((h: any) => ({
    id: h.history_id,
    title: `Stage changed to ${h.to_stage}`,
    date: h.change_date,
    description: `Previous stage was ${h.from_stage}`,
    type: 'stage_change' as const
  }));

  // Add creation event
  timelineEvents.push({
    id: 'creation',
    title: 'Opportunity Created',
    date: opportunity.created_date,
    description: `Created in ${opportunity.stage}`,
    type: 'creation' as const
  });

  // Sort descending
  timelineEvents.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <RecordHeader 
        icon={Target}
        title={`${opportunity.account_name} - ${opportunity.amount ? formatCurrency(opportunity.amount) : "TBD"}`}
        subtitle="Opportunity"
        tags={[opportunity.stage, opportunity.forecast_category]}
        color="bg-orange-500"
        metrics={[
          { label: "Amount", value: formatCurrency(opportunity.amount) },
          { label: "Probability", value: opportunity.win_probability ? `${(opportunity.win_probability * 100).toFixed(0)}%` : "-" },
          { label: "Close Date", value: new Date(opportunity.close_date).toLocaleDateString() }
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RevenueStory 
            title="AI Deal Review"
            what={`This ${formatCurrency(opportunity.amount)} deal is in ${opportunity.stage} but has pushed its close date twice.`}
            why="The economic buyer has not been engaged, leading to delays in the legal review process."
            next="The AE must schedule a multithreaded alignment call with the CFO before the end of the week."
          />

          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="bg-transparent border-b border-[#dddbda] w-full justify-start rounded-none h-auto p-0">
              <TabsTrigger value="timeline" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0176d3] data-[state=active]:text-[#0176d3] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent text-[#444444] font-medium">Activity & Stage Timeline</TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0176d3] data-[state=active]:text-[#0176d3] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent text-[#444444] font-medium">Details</TabsTrigger>
              <TabsTrigger value="attribution" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0176d3] data-[state=active]:text-[#0176d3] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent text-[#444444] font-medium">Attribution Impact</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline" className="mt-4">
               <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
                 <CardContent className="p-6">
                   <ActivityTimeline events={timelineEvents} />
                 </CardContent>
               </Card>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
               <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
                 <CardHeader className="py-3 px-4 border-b border-[#dddbda] bg-[#f3f3f3]"><CardTitle className="text-sm font-bold text-[#080707]">Opportunity Details</CardTitle></CardHeader>
                 <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div className="border-b border-[#dddbda] pb-2">
                        <span className="text-[#444444] block mb-1">Opportunity ID</span>
                        <span className="text-[#080707] font-mono">{opportunity.opportunity_id}</span>
                      </div>
                      <div className="border-b border-[#dddbda] pb-2">
                        <span className="text-[#444444] block mb-1">Account ID</span>
                        <span className="text-[#080707] font-mono">{opportunity.account_id}</span>
                      </div>
                    </div>
                 </CardContent>
               </Card>
            </TabsContent>
            <TabsContent value="attribution" className="mt-4">
                <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
                  <CardContent className="p-12 text-center text-[#444444]">
                     [U-Shaped Attribution breakdown specific to this Opportunity would render here.]
                  </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-[#dddbda] bg-[#f3f3f3]">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#080707]">
                <TrendingUp className="h-4 w-4 text-[#2e844a]" />
                Forecast Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center border-b border-[#dddbda] pb-2 text-sm">
                 <span className="text-[#444444]">Category</span>
                 <span className="font-semibold text-[#080707]">{opportunity.forecast_category}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#dddbda] pb-2 text-sm">
                 <span className="text-[#444444]">Statistical Expected Rev</span>
                 <span className="font-semibold text-[#2e844a]">
                   {formatCurrency(opportunity.amount * (opportunity.win_probability || 0))}
                 </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                 <span className="text-[#444444]">Rep Commit Rev</span>
                 <span className="font-semibold text-[#080707]">
                   {opportunity.forecast_category === 'Commit' ? formatCurrency(opportunity.amount) : "$0"}
                 </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
