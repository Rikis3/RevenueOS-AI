"use client";

import { Map } from "lucide-react";
import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CampaignNode, LeadNode, ActivityNode, OpportunityNode } from "@/components/journey/CustomNodes";
import { initialNodes, initialEdges } from "@/lib/journeyData";

const nodeTypes = {
  campaignNode: CampaignNode,
  leadNode: LeadNode,
  activityNode: ActivityNode,
  opportunityNode: OpportunityNode,
};

export default function CustomerJourney() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-[1600px] mx-auto space-y-4">
      <div className="flex items-center justify-between bg-white border border-[#dddbda] p-4 rounded-[0.25rem] shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-[#baac93] p-2 rounded-[0.25rem] text-white">
            <Map className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#080707]">Customer Journey Explorer</h1>
            <p className="text-xs text-[#444444]">End-to-End Funnel Visualization</p>
          </div>
        </div>
      </div>

      <div className="flex-1 border border-[#dddbda] rounded-[0.25rem] shadow-sm bg-[#f3f3f3] relative overflow-hidden">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Background color="#dddbda" gap={16} />
          <Controls className="bg-white border border-[#dddbda] shadow-sm rounded-[0.25rem]" />
          <MiniMap className="border border-[#dddbda] shadow-sm rounded-[0.25rem] bg-white" />
        </ReactFlow>
      </div>
    </div>
  );
}
