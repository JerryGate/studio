
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DispatcherSignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    toast({
        title: "Registration Submitted!",
        description: "Your application has been received. We will contact you after reviewing your details.",
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
       <div className="hidden bg-muted lg:block overflow-hidden">
        <Image
          src="https://placehold.co/1200x1200.png"
          alt="Dispatcher on a bike"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale transition-transform duration-500 hover:scale-105"
          data-ai-hint="delivery motorcycle"
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
            <h1 className="text-3xl font-bold text-primary mt-4">Become a Dispatcher</h1>
             <p className="text-balance text-muted-foreground">
              Fill in your details to join our delivery network.
            </p>
          </div>
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Dispatcher Registration</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" name="fullName" type="text" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="vehicle">Vehicle Information (e.g. Honda Bike - ABC 123)</Label>
                        <Input id="vehicle" name="vehicle" type="text" required />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
                            Submit Application
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/partner/login" className="underline text-accent">
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
