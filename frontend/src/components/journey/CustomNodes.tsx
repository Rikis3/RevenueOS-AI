import { Handle, Position } from '@xyflow/react';
import { Megaphone, Users, Activity, Target } from 'lucide-react';

interface NodeData {
  label: string;
  sublabel?: string;
  metric?: string;
  status?: string;
}

const NodeWrapper = ({ children, colorClass }: { children: React.ReactNode, colorClass: string }) => (
  <div className="w-64 bg-white rounded-[0.25rem] border border-[#dddbda] shadow-sm overflow-hidden flex flex-col">
    <div className={`h-1.5 w-full ${colorClass}`} />
    {children}
  </div>
);

export function CampaignNode({ data }: { data: NodeData }) {
  return (
    <NodeWrapper colorClass="bg-[#f49756]">
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <Megaphone className="h-4 w-4 text-[#f49756]" />
          <span className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-wider">Campaign</span>
        </div>
        <div className="text-sm font-bold text-[#080707]">{data.label}</div>
        <div className="flex justify-between mt-2 pt-2 border-t border-[#dddbda]">
          <span className="text-xs text-[#706e6b]">Generated:</span>
          <span className="text-xs font-semibold text-[#2e844a]">{data.metric}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-[#dddbda] border-none" />
    </NodeWrapper>
  );
}

export function LeadNode({ data }: { data: NodeData }) {
  return (
    <NodeWrapper colorClass="bg-[#4bca81]">
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-[#dddbda] border-none" />
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <Users className="h-4 w-4 text-[#4bca81]" />
          <span className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-wider">Lead</span>
        </div>
        <div className="text-sm font-bold text-[#080707]">{data.label}</div>
        {data.sublabel && <div className="text-xs text-[#444444]">{data.sublabel}</div>}
        <div className="flex justify-between mt-2 pt-2 border-t border-[#dddbda]">
          <span className="text-xs text-[#706e6b]">Status:</span>
          <span className="text-xs font-semibold text-[#080707]">{data.status}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-[#dddbda] border-none" />
    </NodeWrapper>
  );
}

export function ActivityNode({ data }: { data: NodeData }) {
  return (
    <NodeWrapper colorClass="bg-[#0176d3]">
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-[#dddbda] border-none" />
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <Activity className="h-4 w-4 text-[#0176d3]" />
          <span className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-wider">Touchpoint</span>
        </div>
        <div className="text-sm font-bold text-[#080707]">{data.label}</div>
        <div className="flex justify-between mt-2 pt-2 border-t border-[#dddbda]">
          <span className="text-xs text-[#706e6b]">Outcome:</span>
          <span className="text-xs font-semibold text-[#080707]">{data.status}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-[#dddbda] border-none" />
    </NodeWrapper>
  );
}

export function OpportunityNode({ data }: { data: NodeData }) {
  return (
    <NodeWrapper colorClass="bg-[#fcb95b]">
      <Handle type="target" position={Position.Top} className="w-2 h-2 bg-[#dddbda] border-none" />
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <Target className="h-4 w-4 text-[#fcb95b]" />
          <span className="text-[0.65rem] font-bold text-[#444444] uppercase tracking-wider">Opportunity</span>
        </div>
        <div className="text-sm font-bold text-[#080707]">{data.label}</div>
        <div className="flex justify-between mt-2 pt-2 border-t border-[#dddbda]">
          <span className="text-xs text-[#706e6b]">Amount:</span>
          <span className="text-xs font-semibold text-[#2e844a]">{data.metric}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-[#706e6b]">Stage:</span>
          <span className="text-xs font-semibold text-[#080707]">{data.status}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </NodeWrapper>
  );
}
