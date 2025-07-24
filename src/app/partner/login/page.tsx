
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function PartnerLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<UserRole | null>(null);
  
  const handleLogin = async (currentRole: UserRole) => {
    setIsLoading(currentRole);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(currentRole);
    router.push(roleToDashboard[currentRole] || '/');
    setIsLoading(null);
  };

  const renderLoginForm = (currentRole: UserRole) => (
     <TabsContent value={currentRole} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor={`${currentRole}-email`}>Email address</Label>
            <Input id={`${currentRole}-email`} type="email" value={mockAuthUsers[currentRole].email} readOnly />
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor={`${currentRole}-password`}>Password</Label>
                <Link href="#" className="text-sm font-medium text-accent hover:text-accent/90">
                    Forgot your password?
                </Link>
            </div>
            <div className="relative">
                <Input id={`${currentRole}-password`} type={showPassword ? "text" : "password"} required defaultValue="password" className="pr-10" />
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
            <Button type="button" className="w-full" disabled={!!isLoading} onClick={() => handleLogin(currentRole)}>
                {isLoading === currentRole && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign in as {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
            </Button>
        </div>
     </TabsContent>
  );


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
            <Logo />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Partner & Admin Login
          </h2>
           <p className="mt-2 text-center text-sm text-muted-foreground">
            Not a partner?{' '}
            <Link href="/login" className="font-medium text-accent hover:text-accent/90">
              Sign in as a customer
            </Link>
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Select your role to sign in to your dashboard.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={role} onValueChange={(value) => setRole(value as UserRole)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                        <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
                        <TabsTrigger value="dispatcher">Dispatcher</TabsTrigger>
                        <TabsTrigger value="hospital">Hospital</TabsTrigger>
                    </TabsList>
                    {renderLoginForm('admin')}
                    {renderLoginForm('pharmacy')}
                    {renderLoginForm('dispatcher')}
                    {renderLoginForm('hospital')}
                </Tabs>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
