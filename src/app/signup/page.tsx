
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    toast({
        title: "Account Created!",
        description: "Your account has been successfully created. Please log in.",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Logo center iconSize="h-10 w-10" textSize="text-4xl" textClassName="inline" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Create your Customer Account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-accent hover:text-accent/90">
              Sign in
            </Link>
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Get Started with E-pharma</CardTitle>
                <CardDescription>Create an account to start ordering your medications.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" name="email" type="email" autoComplete="email" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" name="confirm-password" type="password" required />
                    </div>
                    <div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Account
                        </Button>
                    </div>
                     <div className="text-center text-sm text-muted-foreground pt-4 border-t">
                        Are you a Pharmacy or Dispatcher?{' '}
                        <Link href="/partner" className="font-medium text-accent hover:text-accent/90">
                        Register here
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
