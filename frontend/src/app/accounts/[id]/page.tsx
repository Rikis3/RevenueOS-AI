"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchCRMAccountDetail } from "@/lib/api";
import { RecordHeader } from "@/components/crm/RecordHeader";
import { RelatedList } from "@/components/crm/RelatedList";
import { Building, Target, Contact, AlertTriangle, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueStory } from "@/components/analytics/RevenueStory";

export default function AccountDetail() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["crm-account", id],
    queryFn: () => fetchCRMAccountDetail(id),
  });

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-32 w-full"/><Skeleton className="h-64 w-full"/></div>;
  if (!data) return <div>Account not found</div>;

  const { account, opportunities, contacts } = data;

  const formatCurrency = (val: number) => val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val) : "-";

  return (
    <div className="max-w-[1400px] mx-auto pb-12">
      <RecordHeader 
        icon={Building}
        title={account.account_name}
        subtitle="Account"
        tags={[account.industry_name, account.account_tier]}
        color="bg-indigo-500"
        metrics={[
          { label: "Annual Revenue", value: formatCurrency(account.annual_revenue) },
          { label: "Employees", value: account.employee_count?.toLocaleString() || "-" },
          { label: "Region", value: account.region_name }
        ]}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RevenueStory 
            title="AI Account Health Summary"
            what={`This ${account.account_tier} account has ${opportunities.length} open opportunities.`}
            why="Strong engagement from director-level contacts, but lacking C-suite multi-threading."
            next="SDRs need to execute an executive outreach sequence targeting the VP of Engineering."
          />

          <Tabs defaultValue="related" className="w-full">
            <TabsList className="bg-transparent border-b border-[#dddbda] w-full justify-start rounded-none h-auto p-0">
              <TabsTrigger value="related" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0176d3] data-[state=active]:text-[#0176d3] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent text-[#444444] font-medium">Related</TabsTrigger>
              <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0176d3] data-[state=active]:text-[#0176d3] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent text-[#444444] font-medium">Details</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:border-b-2 data-[state=active]:border-[#0176d3] data-[state=active]:text-[#0176d3] data-[state=active]:shadow-none rounded-none px-4 py-3 bg-transparent text-[#444444] font-medium">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="related" className="space-y-4 mt-4">
              <RelatedList 
                title="Opportunities"
                icon={<Target className="h-4 w-4 text-[#fcb95b]" />}
                data={opportunities}
                basePath="/opportunities"
                idField="opportunity_id"
                columns={[
                  { header: "Amount", accessor: "amount", format: formatCurrency },
                  { header: "Stage", accessor: "stage" },
                  { header: "Forecast", accessor: "forecast_category" },
                  { header: "Close Date", accessor: "close_date", format: (val) => new Date(val).toLocaleDateString() }
                ]}
              />
              
              <RelatedList 
                title="Contacts"
                icon={<Contact className="h-4 w-4 text-[#a094ed]" />}
                data={contacts}
                basePath="/contacts"
                idField="contact_id"
                columns={[
                  { header: "First Name", accessor: "first_name" },
                  { header: "Last Name", accessor: "last_name" },
                  { header: "Title", accessor: "title" },
                  { header: "Email", accessor: "email" }
                ]}
              />
            </TabsContent>
            <TabsContent value="details" className="mt-4">
               <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
                 <CardHeader className="py-3 px-4 border-b border-[#dddbda] bg-[#f3f3f3]"><CardTitle className="text-sm font-bold text-[#080707]">Account Details</CardTitle></CardHeader>
                 <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div className="border-b border-[#dddbda] pb-2">
                        <span className="text-[#444444] block mb-1">Account ID</span>
                        <span className="text-[#080707] font-mono">{account.account_id}</span>
                      </div>
                      <div className="border-b border-[#dddbda] pb-2">
                        <span className="text-[#444444] block mb-1">Created Date</span>
                        <span className="text-[#080707]">{new Date(account.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                 </CardContent>
               </Card>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
                <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
                  <CardContent className="p-12 text-center text-[#444444]">
                     [Attribution impact and Revenue Cohort charts would render here based on Gold-layer data.]
                  </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-[#dddbda] bg-[#f3f3f3]">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#080707]">
                <AlertTriangle className="h-4 w-4 text-[#baac93]" />
                Pipeline Risk Score
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center">
                 <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-[6px] border-[#dddbda]">
                    <span className="text-3xl font-bold text-[#baac93]">64</span>
                 </div>
              </div>
              <p className="text-center text-sm text-[#444444] mt-4">Medium risk due to low activity velocity.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
