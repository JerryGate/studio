
'use client';

import { Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

function SignupContent() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();


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

    const redirectUrl = searchParams.get('redirect');
    // After signup, redirect to login page, which will then handle the final redirect
    router.push(`/login${redirectUrl ? `?redirect=${redirectUrl}` : ''}`);
  };

  const redirectParam = searchParams.get('redirect') ? `?redirect=${redirectParam}` : '';

  return (
     <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="hidden bg-muted lg:block overflow-hidden">
        <Image
          src="https://placehold.co/1200x1200.png"
          alt="Person holding a smartphone with the E-pharma app"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale transition-transform duration-500 hover:scale-105"
          data-ai-hint="woman phone health"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <motion.div 
            className="mx-auto grid w-[350px] gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <div className="grid gap-2 text-center">
             <Logo center iconSize="h-10 w-10" textSize="text-4xl" textClassName="inline" />
            <h1 className="text-3xl font-bold text-primary mt-4">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Customer Sign Up</CardTitle>
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
                </form>
            </CardContent>
        </Card>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href={`/login${redirectParam}`} className="underline text-accent">
              Sign in
            </Link>
          </div>
           <div className="text-center text-sm text-muted-foreground">
                Are you a Pharmacy or Dispatcher?{' '}
                <Link href="/partner" className="font-medium text-accent hover:text-accent/90 underline">
                Register here
                </Link>
            </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent />
    </Suspense>
  )
}
