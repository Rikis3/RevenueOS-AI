import { Edge, Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: 'camp-1',
    type: 'campaignNode',
    position: { x: 250, y: 50 },
    data: { label: 'Q2 Enterprise Summit', metric: '$2.4M Pipeline' },
  },
  {
    id: 'lead-1',
    type: 'leadNode',
    position: { x: 250, y: 200 },
    data: { label: 'John Doe', sublabel: 'VP of Operations, Acme Corp', status: 'MQL' },
  },
  {
    id: 'act-1',
    type: 'activityNode',
    position: { x: 100, y: 350 },
    data: { label: 'Outbound Email Sequence', status: 'Opened (3x)' },
  },
  {
    id: 'act-2',
    type: 'activityNode',
    position: { x: 400, y: 350 },
    data: { label: 'Discovery Call', status: 'Meeting Booked' },
  },
  {
    id: 'opp-1',
    type: 'opportunityNode',
    position: { x: 250, y: 500 },
    data: { label: 'Acme Corp Platform License', metric: '$120,000', status: 'Closed Won' },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'camp-1', target: 'lead-1', animated: true, style: { stroke: '#0176d3', strokeWidth: 2 } },
  { id: 'e2-3', source: 'lead-1', target: 'act-1', animated: true, style: { stroke: '#dddbda', strokeWidth: 2 } },
  { id: 'e2-4', source: 'lead-1', target: 'act-2', animated: true, style: { stroke: '#0176d3', strokeWidth: 2 } },
  { id: 'e4-5', source: 'act-2', target: 'opp-1', animated: true, style: { stroke: '#2e844a', strokeWidth: 2 } },
];
