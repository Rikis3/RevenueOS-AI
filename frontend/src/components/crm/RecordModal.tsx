"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function RecordModal({ isOpen, onClose, title }: RecordModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock save delay
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080707]/60">
      <div className="bg-white rounded-[0.25rem] shadow-lg w-full max-w-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-[#dddbda] bg-[#f3f3f3] rounded-t-[0.25rem]">
          <h2 className="text-lg font-bold text-[#080707]">{title}</h2>
          <button onClick={onClose} className="text-[#706e6b] hover:text-[#080707]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#444444]"><span className="text-[#c23934]">*</span>Opportunity Name</label>
              <input required className="w-full border border-[#dddbda] rounded-[0.25rem] px-3 py-1.5 text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#444444]"><span className="text-[#c23934]">*</span>Account Name</label>
              <input required className="w-full border border-[#dddbda] rounded-[0.25rem] px-3 py-1.5 text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#444444]">Amount</label>
              <input type="number" className="w-full border border-[#dddbda] rounded-[0.25rem] px-3 py-1.5 text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#444444]"><span className="text-[#c23934]">*</span>Close Date</label>
              <input required type="date" className="w-full border border-[#dddbda] rounded-[0.25rem] px-3 py-1.5 text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#444444]">Stage</label>
              <select className="w-full border border-[#dddbda] rounded-[0.25rem] px-3 py-1.5 text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none bg-white">
                <option>Prospecting</option>
                <option>Discovery</option>
                <option>Proposal</option>
                <option>Negotiation</option>
                <option>Closed Won</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#444444]">Next Step</label>
              <input className="w-full border border-[#dddbda] rounded-[0.25rem] px-3 py-1.5 text-sm focus:border-[#0176d3] focus:ring-1 focus:ring-[#0176d3] outline-none" />
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-4 py-3 border-t border-[#dddbda] bg-[#f3f3f3] flex justify-end gap-2 rounded-b-[0.25rem]">
          <button type="button" onClick={onClose} className="px-4 py-1.5 border border-[#dddbda] bg-white rounded-[0.25rem] text-sm text-[#0176d3] font-medium hover:bg-[#f3f3f3]">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-1.5 bg-[#0176d3] text-white rounded-[0.25rem] text-sm font-medium hover:bg-[#015ba7]">
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
