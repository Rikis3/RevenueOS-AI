"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Calculator, Calendar, CreditCard, Settings, Smile, User, Search, BarChart3, TrendingUp, PieChart, Zap, Building, Target, Megaphone, Map } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandBar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search metrics, accounts, or ask AI..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Command Center</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/pipeline"))}>
            <TrendingUp className="mr-2 h-4 w-4" />
            <span>Pipeline Intelligence</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/attribution"))}>
            <PieChart className="mr-2 h-4 w-4" />
            <span>Attribution Intelligence</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/nlq"))}>
            <Zap className="mr-2 h-4 w-4" />
            <span>Natural Language Query</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="CRM Exploration">
          <CommandItem onSelect={() => runCommand(() => router.push("/accounts"))}>
            <Building className="mr-2 h-4 w-4" />
            <span>Search Accounts</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/opportunities"))}>
            <Target className="mr-2 h-4 w-4" />
            <span>Search Opportunities</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/campaigns"))}>
            <Megaphone className="mr-2 h-4 w-4" />
            <span>Search Campaigns</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/journey"))}>
            <Map className="mr-2 h-4 w-4" />
            <span>Customer Journey Explorer</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
