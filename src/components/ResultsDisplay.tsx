"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Star } from 'lucide-react';

interface ResultsDisplayProps {
  suggestions: string[] | null;
}

const ResultsDisplay: FC<ResultsDisplayProps> = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return (
      <Card className="mt-8 bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-card-foreground">
            <AlertCircle className="mr-2 h-6 w-6 text-muted-foreground" />
            No Suggestions Yet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please select your three interests and click "Find Your Synergy" to discover potential career paths and activities.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-foreground">
        Your Synergy Sweet Spots
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((suggestion, index) => (
          <Card key={index} className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col">
            <CardHeader className="bg-secondary p-4">
              <CardTitle className="flex items-center text-lg text-secondary-foreground">
                {index < 3 ? <Star className="mr-2 h-5 w-5 text-primary fill-primary" /> : <CheckCircle2 className="mr-2 h-5 w-5 text-primary" />}
                Suggestion #{index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-lg text-card-foreground leading-relaxed">{suggestion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay;
