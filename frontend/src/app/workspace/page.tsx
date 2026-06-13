"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCRMOpportunities, fetchCRMAccounts, fetchRisks } from "@/lib/api";
import { DataTable } from "@/components/crm/DataTable";
import { LayoutDashboard, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueStory } from "@/components/analytics/RevenueStory";

export default function RevenueWorkspace() {
  const { data: opps } = useQuery({ queryKey: ["crm-opportunities"], queryFn: fetchCRMOpportunities });
  const { data: accounts } = useQuery({ queryKey: ["crm-accounts"], queryFn: fetchCRMAccounts });
  const { data: risks } = useQuery({ queryKey: ["risks"], queryFn: fetchRisks });

  const formatCurrency = (val: number) => val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val) : "-";

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#080707]">Revenue Workspace</h1>
          <p className="text-xs text-[#444444]">CRO Daily Briefing</p>
        </div>
        <div className="text-sm text-[#444444]">
          Fiscal Quarter: <span className="font-semibold text-[#080707]">Q2-2026</span>
        </div>
      </div>

      <RevenueStory 
        title="AI Morning Briefing"
        what="We have 4 late-stage deals pushing, but Enterprise Account engagement is up 15%."
        why="SDRs are booking meetings, but AEs are struggling to move proposals through legal review quickly."
        next="Review the High Risk Accounts below and intervene on the largest pushed deals."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
        <div className="lg:col-span-3 space-y-4">
          <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-[#dddbda] bg-[#f3f3f3]">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#080707]">
                 <TrendingUp className="h-4 w-4 text-[#2e844a]"/> Top Active Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <DataTable 
                columns={[
                  { header: "Account", accessor: "account_name" },
                  { header: "Amount", accessor: "amount", format: formatCurrency },
                  { header: "Stage", accessor: "stage" }
                ]} 
                data={opps?.slice(0, 5) || []}
                basePath="/opportunities"
                idField="opportunity_id"
              />
            </CardContent>
          </Card>

          <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden mt-4">
            <CardHeader className="py-3 px-4 border-b border-[#dddbda] bg-[#f3f3f3]">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-[#080707]">
                 <LayoutDashboard className="h-4 w-4 text-[#0176d3]"/> Top Target Accounts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <DataTable 
                columns={[
                  { header: "Account", accessor: "account_name" },
                  { header: "Tier", accessor: "account_tier" },
                  { header: "Revenue", accessor: "annual_revenue", format: formatCurrency }
                ]} 
                data={accounts?.slice(0, 5) || []}
                basePath="/accounts"
                idField="account_id"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-[#dddbda] bg-[#f3f3f3]">
               <CardTitle className="text-sm font-bold flex items-center text-[#c23934]">
                 <AlertTriangle className="mr-2 h-4 w-4" /> Urgent Revenue Risks
               </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid gap-3">
                {risks?.risks?.slice(0, 4).map((risk: any, i: number) => (
                   <div key={i} className="bg-[#f3f3f3] border border-[#dddbda] p-3 rounded-[0.25rem] text-sm text-[#080707]">
                      <strong className="text-[#c23934] block mb-1">{risk.metric_anomaly || risk.alert_type}</strong>
                      {risk.root_cause}
                   </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
