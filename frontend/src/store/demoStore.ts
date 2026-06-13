import { create } from 'zustand'

export type Region = 'Global View' | 'North America' | 'EMEA' | 'APAC' | 'India'
export type Segment = 'All Segments' | 'Enterprise' | 'Mid-Market' | 'SMB'

interface DemoState {
  region: Region
  segment: Segment
  setRegion: (region: Region) => void
  setSegment: (segment: Segment) => void
}

export const useDemoStore = create<DemoState>((set) => ({
  region: 'Global View',
  segment: 'All Segments',
  setRegion: (region) => set({ region }),
  setSegment: (segment) => set({ segment }),
}))
