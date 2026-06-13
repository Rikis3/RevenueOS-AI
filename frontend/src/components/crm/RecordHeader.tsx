import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecordHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  tags?: string[];
  metrics?: { label: string; value: string | number }[];
  color?: string; // e.g. "bg-blue-500"
}

export function RecordHeader({ icon: Icon, title, subtitle, tags = [], metrics = [], color = "bg-[#0176d3]" }: RecordHeaderProps) {
  return (
    <div className="w-full rounded-[0.25rem] border border-[#dddbda] bg-white shadow-sm p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-[0.25rem] ${color} text-white`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[0.75rem] text-[#444444] font-semibold uppercase">{subtitle}</div>
            <h1 className="text-xl font-bold text-[#080707] flex items-center gap-3 mt-0.5">
              {title}
              {tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-[0.65rem] font-medium border-[#dddbda] bg-[#f3f3f3] text-[#080707]">
                  {tag}
                </Badge>
              ))}
            </h1>
          </div>
        </div>
        <div className="flex gap-8 items-center h-full pt-1">
          {metrics.map((metric, i) => (
            <div key={i} className="flex flex-col text-left">
              <span className="text-[0.75rem] text-[#444444] font-medium truncate max-w-[120px]">{metric.label}</span>
              <span className="text-sm font-semibold text-[#080707]">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
