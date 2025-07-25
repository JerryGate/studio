
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { UserRole } from "@/types";
import { mockAuthUsers } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Image from "next/image";


const roleToDashboard: Record<UserRole, string> = {
    admin: '/admin',
    customer: '/dashboard',
    pharmacy: '/pharmacy',
    dispatcher: '/dispatcher',
    hospital: '/hospital',
}

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async () => {
    setIsLoading(true);
    const currentRole: UserRole = 'customer';
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(currentRole);

    const redirectUrl = searchParams.get('redirect');
    router.push(redirectUrl || roleToDashboard[currentRole] || '/');
    setIsLoading(false);
  };

  const redirectParam = searchParams.get('redirect') ? `?redirect=${searchParams.get('redirect')}` : '';

  return (
     <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
       <div className="hidden bg-muted lg:block overflow-hidden">
        <Image
          src="https://placehold.co/1200x1200.png"
          alt="Pharmacist smiling"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale transition-transform duration-500 hover:scale-105"
          data-ai-hint="happy family"
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
            <h1 className="text-3xl font-bold text-primary mt-4">Welcome Back!</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Customer Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="customer-email">Email address</Label>
                            <Input id="customer-email" type="email" value={mockAuthUsers.customer.email} readOnly />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="customer-password">Password</Label>
                                <Link href="#" className="text-sm font-medium text-accent hover:text-accent/90 underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input id="customer-password" type={showPassword ? "text" : "password"} required defaultValue="password" className="pr-10" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href={`/signup${redirectParam}`} className="underline text-accent">
                Sign up
                </Link>
            </div>
             <div className="text-center text-sm text-muted-foreground">
                Are you a partner or admin?{' '}
                <Link href="/partner/login" className="font-medium text-accent hover:text-accent/90 underline">
                Login here
                </Link>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
