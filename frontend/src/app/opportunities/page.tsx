"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCRMOpportunities } from "@/lib/api";
import { DataTable } from "@/components/crm/DataTable";
import { RecordHeader } from "@/components/crm/RecordHeader";
import { RecordModal } from "@/components/crm/RecordModal";
import { useState, useEffect } from "react";

export default function OpportunitiesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["crm-opportunities"],
    queryFn: fetchCRMOpportunities,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Listen for global search keypress
  useEffect(() => {
    const handleGlobalSearch = (e: CustomEvent) => {
      setSearchTerm(e.detail || "");
    };
    document.addEventListener("globalSearch" as any, handleGlobalSearch);
    return () => document.removeEventListener("globalSearch" as any, handleGlobalSearch);
  }, []);

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  const columns = [
    { header: "Opportunity Name", accessor: "opportunity" },
    { header: "Account", accessor: "account" },
    { header: "Close Date", accessor: "close_date" },
    { header: "Deal Size", accessor: "amount", format: formatCurrency },
    { header: "Stage", accessor: "stage" },
    { header: "Last activity", accessor: "last_activity" },
    { header: "Next Steps", accessor: "next_steps" },
    { header: "Age", accessor: "age" }
  ];

  const baseMockData = [
    { opportunity_id: "1", opportunity: "Edge Emergency Generator", account: "Edge", close_date: "07/04/2026", amount: 235000.00, stage: "Proposal", last_activity: "6 days ago", next_steps: "Mtg with the IT Approver on...", age: 84 },
    { opportunity_id: "2", opportunity: "Edge Primary Generator", account: "Edge", close_date: "07/12/2026", amount: 25500.80, stage: "Negotiation", last_activity: "0 days ago", next_steps: "Setting up a demo once they...", age: 3 },
    { opportunity_id: "3", opportunity: "GenePoint SLA", account: "Genepoint", close_date: "07/13/2026", amount: 190200.00, stage: "Qualification", last_activity: "6 days ago", next_steps: "Trying a 4th call to get on the...", age: 11 },
    { opportunity_id: "4", opportunity: "GenePoint Generator", account: "Genepoint", close_date: "07/13/2026", amount: 129000.00, stage: "Discovery", last_activity: "2 days ago", next_steps: "", age: 54 },
    { opportunity_id: "5", opportunity: "Global Folly East Installation", account: "Folly.io", close_date: "07/13/2026", amount: 15250.30, stage: "Proposal", last_activity: "11 days ago", next_steps: "", age: 51 },
    { opportunity_id: "6", opportunity: "Global Folly West Insta...", account: "Folly.io", close_date: "07/19/2026", amount: 46320.05, stage: "Negotiation", last_activity: "12 days ago", next_steps: "Not sure if they qualify for our...", age: 92 },
    { opportunity_id: "7", opportunity: "Global Folly Prime Up...", account: "Folly.io", close_date: "07/22/2026", amount: 350015.75, stage: "Negotiation", last_activity: "21 days ago", next_steps: "Email exchanges betwene the...", age: 132 },
    { opportunity_id: "8", opportunity: "Grand Hotels Guest Portable ...", account: "Grand Hotels", close_date: "07/22/2026", amount: 32065.15, stage: "Negotiation", last_activity: "0 days ago", next_steps: "Mtg with the IT Approver on...", age: 41 },
    { opportunity_id: "9", opportunity: "Hotel Grande Amer", account: "Grand Hotels", close_date: "07/22/2026", amount: 163500.00, stage: "Discovery", last_activity: "6 days ago", next_steps: "Contract awaiting approval", age: 74 },
    { opportunity_id: "10", opportunity: "Indiana Express Logist...", account: "Express Logics", close_date: "07/26/2026", amount: 162000.00, stage: "Negotiation", last_activity: "2 days ago", next_steps: "Mtg with the IT Approver on...", age: 36 },
  ];

  const filteredData = baseMockData.filter(d => 
    d.opportunity.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-4">
      <RecordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Opportunity" />
      
      <div className="bg-white border border-[#dddbda] rounded-[0.25rem] shadow-sm overflow-hidden">
        
        {/* Header Section */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#fcb95b] p-2 rounded-[0.25rem]">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[#444444] uppercase">Opportunities</p>
              <h1 className="text-xl font-bold text-[#080707]">Pipeline Inspection</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1 border border-[#dddbda] rounded text-sm text-[#0176d3] font-medium hover:bg-[#f3f3f3]">Opportunity list</button>
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-1 bg-[#0176d3] text-white rounded text-sm font-medium hover:bg-[#015ba7]">New</button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="px-4 py-2 bg-white flex items-center gap-4 text-sm text-[#080707]">
          <span>Show Closing Opportunities</span>
          <select className="border border-[#dddbda] rounded px-2 py-1"><option>This Month</option></select>
          <span>for</span>
          <select className="border border-[#dddbda] rounded px-2 py-1"><option>My Pipeline</option></select>
        </div>

        {/* Dark Blue Metrics Bar */}
        <div className="bg-[#0b2343] text-white px-6 py-4 flex gap-8 items-center">
          <div>
            <p className="text-[0.65rem] uppercase text-[#dddbda] font-semibold">Total Pipeline</p>
            <p className="text-xl font-bold text-[#0176d3]">$57.1m</p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase text-[#dddbda]">Closed</p>
            <p className="text-lg font-bold">$8.8m</p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase text-[#dddbda]">Commit Forecast</p>
            <p className="text-lg font-bold">$11.6m</p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase text-[#dddbda]">Best Case Forecast</p>
            <p className="text-lg font-bold">$13.9m</p>
          </div>
          <div>
            <p className="text-[0.65rem] uppercase text-[#dddbda]">Open Pipeline</p>
            <p className="text-lg font-bold">$22.8m</p>
          </div>
          <div className="ml-auto flex gap-4">
            <div>
              <p className="text-[0.65rem] uppercase text-[#dddbda] mb-1">Moved In ℹ️</p>
              <span className="bg-[#4bca81] text-[#080707] px-2 py-0.5 rounded-full text-xs font-bold">$429.1k</span>
            </div>
            <div>
              <p className="text-[0.65rem] uppercase text-[#dddbda] mb-1">Moved Out ℹ️</p>
              <span className="bg-[#f49756] text-[#080707] px-2 py-0.5 rounded-full text-xs font-bold">$954.2k</span>
            </div>
          </div>
        </div>

        {/* List Info */}
        <div className="bg-white px-4 py-2 text-xs text-[#706e6b] border-b border-[#dddbda]">
          20 items • Filtered by closing this month, my own opportunities • Sorted by Close Date
        </div>

        {/* Data Table */}
        <DataTable 
          columns={columns} 
          data={filteredData} 
          basePath="/opportunities"
          idField="opportunity_id"
        />
      </div>
    </div>
  );
}
