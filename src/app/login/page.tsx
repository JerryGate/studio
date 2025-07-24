
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { UserRole } from "@/types";
import { mockAuthUsers } from "@/lib/mock-data";


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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async () => {
    setIsLoading(true);
    const currentRole: UserRole = 'customer';
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(currentRole);
    router.push(roleToDashboard[currentRole] || '/');
    setIsLoading(null);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Logo />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{' '}
            <Link href="/signup" className="font-medium text-accent hover:text-accent/90">
              create a new account
            </Link>
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Welcome Back, Customer!</CardTitle>
                <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
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
                            <Link href="#" className="text-sm font-medium text-accent hover:text-accent/90">
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
                     <div className="text-center text-sm text-muted-foreground">
                        Are you a partner or admin?{' '}
                        <Link href="/partner/login" className="font-medium text-accent hover:text-accent/90">
                        Login here
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
