"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function NavigationBar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Opportunities", path: "/opportunities" },
    { name: "Leads", path: "/leads" },
    { name: "Accounts", path: "/accounts" },
    { name: "Contacts", path: "/contacts" },
    { name: "Campaigns", path: "/campaigns" },
    { name: "Dashboards", path: "/workspace" },
    { name: "Journey", path: "/journey" },
  ];

  return (
    <div className="w-full bg-white border-b border-[#dddbda] shadow-sm flex items-center px-6 h-12 z-20 sticky top-12 shrink-0">
      <nav className="flex space-x-6 h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-1 h-full px-2 text-[0.85rem] font-medium transition-colors border-b-2 hover:text-[#0176d3]",
                isActive 
                  ? "border-[#0176d3] text-[#0176d3]" 
                  : "border-transparent text-[#444444]"
              )}
            >
              {item.name}
              {isActive && <ChevronDown className="h-3 w-3 mt-0.5" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
