"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNextBestActions } from "@/lib/api";
import { RevenueStory } from "@/components/analytics/RevenueStory";
import { Megaphone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketingAnalytics() {
  const { data, isLoading } = useQuery({
    queryKey: ["nba"],
    queryFn: fetchNextBestActions,
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2 text-pink-500 flex items-center">
          <Megaphone className="mr-2 h-8 w-8" /> Marketing Analytics
        </h2>
        <p className="text-muted-foreground">
          Campaign ROI, Funnel Conversion, and Marketing Efficiency.
        </p>
      </div>

      {isLoading ? (
        <Skeleton className="w-full h-32" />
      ) : (
        <RevenueStory 
          title="AI Marketing Strategy"
          what="LinkedIn campaigns are generating a 4.2x ROAS, while Google Ads has dropped to 1.5x."
          why={data?.actions?.[0]?.supporting_metric || "Top-of-funnel lead quality from Google Ads has degraded, leading to higher Cost-Per-Opportunity."}
          next={data?.actions?.[0]?.recommendation || "Reallocate $50k budget from Google Ads to LinkedIn Campaigns."}
        />
      )}

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Campaigns by ROI</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/10">
            [Campaign ROI Chart]
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lead to Opportunity Conversion</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/10">
            [Funnel Conversion Chart]
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
