"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Megaphone, Settings2, LineChart, PieChart, Zap, AlertTriangle, CalendarDays,
  Building, Users, Contact, Target, Activity, LayoutDashboard, Map
} from "lucide-react";

const analyticsRoutes = [
  { name: "Command Center", path: "/", icon: BarChart3 },
  { name: "Revenue Workspace", path: "/workspace", icon: LayoutDashboard },
  { name: "Customer Journey", path: "/journey", icon: Map },
  { name: "Pipeline Intelligence", path: "/pipeline", icon: LineChart },
  { name: "Forecast Center", path: "/forecast-center", icon: CalendarDays },
  { name: "Revenue Risk", path: "/revenue-risk", icon: AlertTriangle },
  { name: "Attribution", path: "/attribution", icon: PieChart },
  { name: "Marketing", path: "/marketing", icon: Megaphone },
  { name: "RevOps", path: "/revops", icon: Settings2 },
  { name: "NLQ Engine", path: "/nlq", icon: Zap },
];

const crmRoutes = [
  { name: "Accounts", path: "/accounts", icon: Building },
  { name: "Opportunities", path: "/opportunities", icon: Target },
  { name: "Campaigns", path: "/campaigns", icon: Megaphone },
  { name: "Contacts", path: "/contacts", icon: Contact },
  { name: "Leads", path: "/leads", icon: Users },
  { name: "Activities", path: "/activities", icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-[#dddbda] bg-white shadow-sm">
      <div className="flex h-16 items-center border-b border-[#dddbda] px-6">
        <div className="flex items-center gap-2 font-bold text-[#0176d3]">
          <Zap className="h-6 w-6 text-[#0176d3]" fill="currentColor" />
          <span className="text-lg">RevenueOS AI</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-[0.65rem] font-bold tracking-wider text-[#706e6b] uppercase">Analytics Intelligence</h2>
          <nav className="grid gap-1">
            {analyticsRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#f3f3f3] hover:text-[#0176d3]",
                  pathname === route.path ? "bg-[#f3f3f3] text-[#0176d3] border-l-4 border-[#0176d3]" : "text-[#444444]"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="px-4 py-2 mt-4">
          <h2 className="mb-2 px-2 text-[0.65rem] font-bold tracking-wider text-[#706e6b] uppercase">CRM Exploration</h2>
          <nav className="grid gap-1">
            {crmRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#f3f3f3] hover:text-[#0176d3]",
                  pathname.startsWith(route.path) ? "bg-[#f3f3f3] text-[#0176d3] border-l-4 border-[#0176d3]" : "text-[#444444]"
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
