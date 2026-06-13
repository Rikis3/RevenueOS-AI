"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCRMCampaigns } from "@/lib/api";
import { DataTable } from "@/components/crm/DataTable";
import { Megaphone, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function CampaignsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["crm-campaigns"],
    queryFn: fetchCRMCampaigns,
  });

  const columns = [
    { header: "Campaign Name", accessor: "campaign_name" },
    { header: "Channel", accessor: "channel_name" },
    { 
      header: "Budget", 
      accessor: "budget",
      format: (val: number) => val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val) : "-"
    },
    { 
      header: "Spend", 
      accessor: "spend",
      format: (val: number) => val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val) : "-"
    },
    { header: "Clicks", accessor: "clicks" },
    { header: "Start Date", accessor: "start_date", format: (val: string) => val ? new Date(val).toLocaleDateString() : "-" }
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between bg-white border border-[#dddbda] p-4 rounded-[0.25rem] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#f49756] p-2 rounded-[0.25rem] text-white">
            <Megaphone className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#080707]">Campaigns</h1>
            <p className="text-xs text-[#444444]">Marketing Source Tracking</p>
          </div>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#706e6b]" />
          <input placeholder="Search campaigns..." className="pl-9 h-9 w-full rounded-md border border-[#dddbda] text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2"><Skeleton className="h-10 w-full"/><Skeleton className="h-10 w-full"/><Skeleton className="h-10 w-full"/></div>
      ) : (
        <DataTable columns={columns} data={data} basePath="/campaigns" idField="campaign_id" />
      )}
    </div>
  );
}
