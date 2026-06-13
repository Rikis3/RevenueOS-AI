"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCRMAccounts } from "@/lib/api";
import { DataTable } from "@/components/crm/DataTable";
import { Building, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function AccountsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["crm-accounts"],
    queryFn: fetchCRMAccounts,
  });

  const columns = [
    { header: "Account Name", accessor: "account_name" },
    { header: "Industry", accessor: "industry_name" },
    { header: "Region", accessor: "region_name" },
    { header: "Tier", accessor: "account_tier" },
    { 
      header: "Annual Revenue", 
      accessor: "annual_revenue",
      format: (val: number) => val ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val) : "-"
    },
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between bg-white border border-[#dddbda] p-4 rounded-[0.25rem] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#7f8de1] p-2 rounded-[0.25rem] text-white">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#080707]">Accounts</h1>
            <p className="text-xs text-[#444444]">All Enterprise & Mid-Market Accounts</p>
          </div>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#706e6b]" />
          <input placeholder="Search accounts..." className="pl-9 h-9 w-full rounded-md border border-[#dddbda] text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2"><Skeleton className="h-10 w-full"/><Skeleton className="h-10 w-full"/><Skeleton className="h-10 w-full"/></div>
      ) : (
        <DataTable 
          columns={columns} 
          data={data} 
          basePath="/accounts" 
          idField="account_id" 
        />
      )}
    </div>
  );
}
