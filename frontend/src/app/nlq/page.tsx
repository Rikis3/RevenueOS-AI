"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNLQ } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Terminal, Zap, Database, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NaturalLanguageAnalytics() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["nlq", submittedQuery],
    queryFn: () => fetchNLQ(submittedQuery),
    enabled: !!submittedQuery,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSubmittedQuery(query);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4 mb-12 mt-8">
        <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-4">
          <Zap className="h-8 w-8 text-purple-500" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight">Natural Language Analytics</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Ask complex business questions in plain English. The AI generates DuckDB SQL, executes it, and returns the insight.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative shadow-2xl">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-6 w-6 text-slate-400" />
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Which marketing channel generated the highest U-Shaped revenue?"
            className="h-16 pl-14 pr-32 text-lg bg-slate-900 border-slate-700 text-slate-100 rounded-xl focus-visible:ring-purple-500"
          />
          <Button 
            type="submit" 
            size="lg"
            className="absolute right-2 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? "Querying..." : "Analyze Data"}
          </Button>
        </div>
        <div className="flex gap-2 mt-3 justify-center text-sm text-slate-400">
           <span className="text-slate-500">Try:</span>
           <button type="button" onClick={() => setQuery("Which campaigns generated the highest ARR?")} className="hover:text-purple-400 transition-colors">"Which campaigns generated the highest ARR?"</button>
           <span className="text-slate-600">|</span>
           <button type="button" onClick={() => setQuery("Why did win rate decline?")} className="hover:text-purple-400 transition-colors">"Why did win rate decline?"</button>
        </div>
      </form>

      {isLoading && (
        <div className="space-y-4 mt-12">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      )}

      {data && !isLoading && (
        <div className="grid gap-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <Card className="bg-gradient-to-br from-purple-900/20 to-slate-900 border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-purple-300">
                <CheckCircle2 className="mr-2 h-5 w-5" /> Business Interpretation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-slate-200 leading-relaxed">
                {data.business_explanation}
              </p>
              {data.confidence_score && (
                 <div className="mt-4 inline-flex items-center text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                    Confidence Score: {data.confidence_score}/100
                 </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-950 border-slate-800">
            <CardHeader className="border-b border-slate-800/50 bg-slate-900/50">
              <CardTitle className="text-sm font-mono flex items-center text-slate-400">
                <Terminal className="mr-2 h-4 w-4" /> Generated DuckDB SQL
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <pre className="p-4 text-sm text-emerald-400 overflow-x-auto whitespace-pre-wrap font-mono">
                {data.generated_sql}
              </pre>
            </CardContent>
          </Card>

        </div>
      )}
    </div>
  );
}
