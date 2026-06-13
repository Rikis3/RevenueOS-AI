"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCRMLeads } from "@/lib/api";
import { DataTable } from "@/components/crm/DataTable";
import { Users, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function LeadsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["crm-leads"],
    queryFn: fetchCRMLeads,
  });

  const columns = [
    { header: "Status", accessor: "status" },
    { header: "Created At", accessor: "created_at", format: (val: string) => val ? new Date(val).toLocaleDateString() : "-" },
    { header: "MQL Date", accessor: "mql_date", format: (val: string) => val ? new Date(val).toLocaleDateString() : "-" },
    { header: "SQL Date", accessor: "sql_date", format: (val: string) => val ? new Date(val).toLocaleDateString() : "-" },
    { header: "Converted", accessor: "is_converted", format: (val: boolean) => val ? "Yes" : "No" }
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between bg-white border border-[#dddbda] p-4 rounded-[0.25rem] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#4bca81] p-2 rounded-[0.25rem] text-white">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#080707]">Leads</h1>
            <p className="text-xs text-[#444444]">Marketing Funnel Leads</p>
          </div>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#706e6b]" />
          <input placeholder="Search leads..." className="pl-9 h-9 w-full rounded-md border border-[#dddbda] text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2"><Skeleton className="h-10 w-full"/><Skeleton className="h-10 w-full"/></div>
      ) : (
        <DataTable columns={columns} data={data} basePath="/leads" idField="lead_id" />
      )}
    </div>
  );
}
