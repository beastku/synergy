"use client"; // This page uses client-side state and effects

import { useState, useTransition } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SynergyForm, { type SynergyFormValues } from '@/components/SynergyForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from 'lucide-react';
import { analyzeInterestsAction } from './actions'; // Import the server action
import { useToast } from "@/hooks/use-toast";


export default function HomePage() {
  const [results, setResults] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFormSubmit = async (data: SynergyFormValues) => {
    setError(null);
    setResults(null);

    startTransition(async () => {
      const response = await analyzeInterestsAction(data);
      if (response.error) {
        setError(response.error);
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: response.error,
        });
      } else if (response.suggestions) {
        setResults(response.suggestions);
        toast({
          title: "Analysis Complete!",
          description: "Your synergy sweet spots are ready.",
        });
        if (response.suggestions.length === 0) {
           toast({
            variant: "default",
            title: "No specific suggestions found",
            description: "Try exploring different interest combinations!",
          });
        }
      } else {
        const unknownError = "An unknown error occurred during analysis.";
        setError(unknownError);
         toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: unknownError,
        });
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
              Sync Your Energy
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Discover unique career paths and activities by finding the sweet spot where your passions intersect. Enter three interests below to begin your journey.
            </p>
          </div>

          <SynergyForm onSubmit={handleFormSubmit} isLoading={isPending} />

          {error && (
            <Alert variant="destructive" className="mt-8 bg-destructive/10 border-destructive text-destructive-foreground">
              <Terminal className="h-5 w-5" />
              <AlertTitle className="font-semibold">Analysis Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Show loading state via button, results display handles initial state */}
          {/* {isPending && (
            <div className="text-center mt-8">
              <p className="text-lg text-muted-foreground animate-pulse">Generating your personalized suggestions...</p>
            </div>
          )} */}

          {(results !== null || isPending) && <ResultsDisplay suggestions={results} />}
          {results === null && !isPending && !error && (
             <Card className="mt-8 bg-card border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-card-foreground">
                    Ready to Explore?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Select three interests above and click "Find Your Synergy" to see your potential sweet spots.
                  </p>
                </CardContent>
              </Card>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
