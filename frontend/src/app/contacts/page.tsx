"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCRMContacts } from "@/lib/api";
import { DataTable } from "@/components/crm/DataTable";
import { Contact, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export default function ContactsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["crm-contacts"],
    queryFn: fetchCRMContacts,
  });

  const columns = [
    { header: "First Name", accessor: "first_name" },
    { header: "Last Name", accessor: "last_name" },
    { header: "Title", accessor: "title" },
    { header: "Account", accessor: "account_name" },
    { header: "Email", accessor: "email" }
  ];

  return (
    <div className="space-y-4 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between bg-white border border-[#dddbda] p-4 rounded-[0.25rem] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-[#a094ed] p-2 rounded-[0.25rem] text-white">
            <Contact className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#080707]">Contacts</h1>
            <p className="text-xs text-[#444444]">Associated Account Contacts</p>
          </div>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#706e6b]" />
          <input placeholder="Search contacts..." className="pl-9 h-9 w-full rounded-md border border-[#dddbda] text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2"><Skeleton className="h-10 w-full"/><Skeleton className="h-10 w-full"/></div>
      ) : (
        <DataTable columns={columns} data={data} basePath="/contacts" idField="contact_id" />
      )}
    </div>
  );
}
