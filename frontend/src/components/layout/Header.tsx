"use client";

import { useDemoStore } from "@/store/demoStore";
import { Bell, Search, User, Grid, Plus, Settings, HelpCircle } from "lucide-react";

export function Header() {
  const { region, setRegion, segment, setSegment } = useDemoStore();

  return (
    <header className="flex h-12 items-center justify-between bg-white px-4 border-b border-[#dddbda] z-30 sticky top-0 w-full shrink-0">
      <div className="flex w-1/3 items-center gap-4">
        {/* Salesforce Cloud Logo Mock */}
        <div className="text-[#0176d3] flex items-center">
          <svg viewBox="0 0 100 60" className="h-8 w-12 fill-current">
            <path d="M75,25 c0,-11 -9,-20 -20,-20 c-8,0 -15,5 -18,12 c-2,-2 -5,-3 -8,-3 c-6,0 -11,5 -11,11 c0,1 0,2 1,3 c-6,1 -10,6 -10,12 c0,7 6,13 13,13 l51,0 c10,0 18,-8 18,-18 c0,-8 -5,-15 -12,-17 c0,-1 -0,-2 -0,-3 z" />
          </svg>
        </div>

        {/* App Launcher (9 dots) */}
        <button className="text-[#706e6b] hover:text-[#0176d3] p-1.5 rounded-md hover:bg-[#f3f3f3] transition-colors ml-2">
          <Grid className="h-5 w-5" />
        </button>
        
        {/* App Name */}
        <div className="text-lg font-bold text-[#080707] hidden md:block">
          Sales
        </div>
      </div>
      
      {/* Global Search - Centered exactly like SFDC */}
      <div className="flex w-1/3 justify-center">
        <div className="relative w-full max-w-[500px] flex">
          <Search className="absolute left-3 top-1.5 h-4 w-4 text-[#706e6b]" />
          <input
            type="search"
            placeholder="Search Opportunities and more..."
            className="h-8 w-full rounded-[0.25rem] border border-[#dddbda] bg-white pl-9 pr-3 py-1 text-sm shadow-inner transition-colors placeholder:text-[#706e6b] text-[#080707] focus:outline-none focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3]"
            onChange={(e) => {
              document.dispatchEvent(new CustomEvent('globalSearch', { detail: e.target.value }));
            }}
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
            }}
          />
        </div>
      </div>

      {/* Global Actions - Right Aligned */}
      <div className="flex w-1/3 justify-end items-center gap-1">
        <select 
          className="bg-transparent border-none outline-none font-medium text-[0.75rem] text-[#444444] cursor-pointer hover:text-[#0176d3]"
          value={region}
          onChange={(e) => setRegion(e.target.value as any)}
        >
          <option>Global View</option>
          <option>North America</option>
          <option>EMEA</option>
          <option>APAC</option>
        </select>

        <span className="text-[#dddbda]">|</span>

        <select 
          className="bg-transparent border-none outline-none font-medium text-[0.75rem] text-[#444444] cursor-pointer hover:text-[#0176d3]"
          value={segment}
          onChange={(e) => setSegment(e.target.value as any)}
        >
          <option>All Segments</option>
          <option>Enterprise</option>
          <option>Mid-Market</option>
          <option>SMB</option>
        </select>

        {/* Global Actions */}
        <div className="flex items-center gap-1 ml-2">
          <button className="rounded-full p-2 hover:bg-[#f3f3f3] text-[#706e6b]">
            <Plus className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 hover:bg-[#f3f3f3] text-[#706e6b]">
            <Settings className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 hover:bg-[#f3f3f3] text-[#706e6b]">
            <HelpCircle className="h-4 w-4" />
          </button>
          <button className="rounded-full p-2 hover:bg-[#f3f3f3] text-[#706e6b]">
            <Bell className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1b96ff] text-white ml-2 hover:bg-[#0176d3]">
            <User className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
