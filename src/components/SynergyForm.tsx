"use client";

import type { FC } from 'react';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { interestNames } from "@/data/interests";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  interest1: z.string().min(1, "Please select your first interest."),
  interest2: z.string().min(1, "Please select your second interest."),
  interest3: z.string().min(1, "Please select your third interest."),
}).refine(data => data.interest1 !== data.interest2 && data.interest1 !== data.interest3 && data.interest2 !== data.interest3, {
  message: "Please select three unique interests.",
  path: ["interest1"], // Show error message under the first field or a general form error
});

export type SynergyFormValues = z.infer<typeof formSchema>;

interface SynergyFormProps {
  onSubmit: (data: SynergyFormValues) => Promise<void>;
  isLoading: boolean;
}

const SynergyForm: FC<SynergyFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm<SynergyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest1: "",
      interest2: "",
      interest3: "",
    },
  });

  const interestOptions = interestNames.map((name) => (
    <SelectItem key={name} value={name}>
      {name}
    </SelectItem>
  ));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-card p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="interest1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-card-foreground">Interest 1</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-border h-12 text-base">
                      <SelectValue placeholder="Select your first interest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover border-border">
                    {interestOptions}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interest2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-card-foreground">Interest 2</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-border h-12 text-base">
                      <SelectValue placeholder="Select your second interest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover border-border">
                    {interestOptions}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interest3"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-card-foreground">Interest 3</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                  <FormControl>
                    <SelectTrigger className="bg-background border-border h-12 text-base">
                      <SelectValue placeholder="Select your third interest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover border-border">
                    {interestOptions}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
        {form.formState.errors.interest1 && !form.formState.errors.root && form.formState.errors.interest1.message === "Please select three unique interests." && <FormMessage>{form.formState.errors.interest1.message}</FormMessage>}
        <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground py-3 px-8 text-lg rounded-md transition-transform duration-150 ease-in-out hover:scale-105" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Find Your Synergy"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SynergyForm;
