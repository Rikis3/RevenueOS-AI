import { Zap, AlertTriangle } from "lucide-react";
import { KPISummary } from "@/components/analytics/KPISummary";
import { RevenueStory } from "@/components/analytics/RevenueStory";

export default function ExecutiveCommandCenter() {
  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#080707]">Executive Command Center</h1>
        <div className="text-sm text-[#444444]">
          Last Updated: <span className="font-semibold text-[#080707]">Just now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Main Executive Briefing */}
          <div className="bg-white rounded-[0.25rem] border border-[#dddbda] shadow-sm p-5">
            <h2 className="text-sm font-bold text-[#080707] flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-[#0176d3]" /> AI Executive Briefing
            </h2>
            <div className="text-sm text-[#444444] space-y-2 leading-relaxed">
              <p>Pipeline generation is trailing the target by <span className="text-[#c23934] font-semibold">12%</span> for this quarter. The primary gap is in the Enterprise segment.</p>
              <p>Action Recommended: Reallocate Q2 marketing spend from EMEA to North America to support the upcoming Enterprise product launch.</p>
            </div>
          </div>

          <KPISummary />
        </div>

        <div className="space-y-4">
          <RevenueStory 
            what="Pipeline fell by $4.2M this week"
            why="3 Enterprise deals pushed to next quarter"
            next="Focus SDR outreach on Q4 renewals"
          />

          {/* Revenue Risks */}
          <div className="bg-white rounded-[0.25rem] border border-[#dddbda] shadow-sm p-5">
            <h2 className="text-sm font-bold text-[#080707] flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-[#baac93]" /> Top Revenue Risks
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-[#f3f3f3] rounded border border-[#dddbda] text-sm text-[#080707]">
                <strong className="text-[#c23934]">High Risk:</strong> Acme Corp ($1.2M) - Champion departed.
              </div>
              <div className="p-3 bg-[#f3f3f3] rounded border border-[#dddbda] text-sm text-[#080707]">
                <strong className="text-[#baac93]">Medium Risk:</strong> Initech ($850K) - Legal review stalled.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
