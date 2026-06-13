import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Activity, Target } from "lucide-react";

interface RevenueStoryProps {
  what: string;
  why: string;
  next: string;
  title?: string;
}

export function RevenueStory({ what, why, next, title = "AI Revenue Story" }: RevenueStoryProps) {
  return (
    <div className="bg-white rounded-[0.25rem] border border-[#dddbda] shadow-sm overflow-hidden">
      <div className="border-b border-[#dddbda] bg-[#f3f3f3] p-4">
        <h3 className="text-sm font-bold text-[#080707] flex items-center">
          <Sparkles className="mr-2 h-4 w-4 text-[#0176d3]" />
          {title}
        </h3>
      </div>
      <div className="p-0">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#dddbda]">
          <div className="p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#444444] flex items-center">
              <Activity className="h-3 w-3 mr-1" /> What happened?
            </h4>
            <p className="text-sm text-[#080707] leading-relaxed">
              {what}
            </p>
          </div>
          <div className="p-4 space-y-2 bg-[#fafaf9]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#444444] flex items-center">
              <Target className="h-3 w-3 mr-1" /> Why it happened?
            </h4>
            <p className="text-sm text-[#080707] leading-relaxed">
              {why}
            </p>
          </div>
          <div className="p-4 space-y-2 bg-[#f3f3f3]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0176d3] flex items-center">
              <Sparkles className="h-3 w-3 mr-1" /> What should we do next?
            </h4>
            <p className="text-sm text-[#080707] font-medium leading-relaxed">
              {next}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
