
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { UserRole } from "@/types";
import { mockAuthUsers } from "@/lib/mock-data";
import { motion } from "framer-motion";
import Image from "next/image";


const roleToDashboard: Record<UserRole, string> = {
    admin: '/admin/super-admin', // Default admin to super-admin
    'super-admin': '/admin/super-admin',
    'finance-admin': '/admin/finance-admin',
    'content-admin': '/admin/content-admin',
    customer: '/dashboard',
    pharmacy: '/pharmacy',
    dispatcher: '/dispatcher',
    hospital: '/hospital',
}

export default function PartnerLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('pharmacy');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    login(role);
    router.push(roleToDashboard[role] || '/');
    setIsLoading(false);
  };

  const renderFormContent = (currentRole: UserRole) => (
    <TabsContent value={currentRole} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor={`${currentRole}-email`}>Email address</Label>
            <Input id={`${currentRole}-email`} type="email" defaultValue={mockAuthUsers[currentRole].email} readOnly />
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor={`${currentRole}-password`}>Password</Label>
                <Link href="#" className="text-sm font-medium text-accent hover:text-accent/90 underline">
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
    </TabsContent>
  );


  return (
     <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="hidden bg-muted lg:block overflow-hidden">
        <Image
          src="https://placehold.co/1200x1200.png"
          alt="Pharmacy interior"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale transition-transform duration-500 hover:scale-105"
          data-ai-hint="pharmacist smiling"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <motion.div 
            className="mx-auto grid w-[380px] gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <div className="grid gap-2 text-center">
             <Logo center iconSize="h-10 w-10" textSize="text-4xl" textClassName="inline" />
            <h1 className="text-3xl font-bold text-primary mt-4">Partner Login</h1>
            <p className="text-balance text-muted-foreground">
                Select your role to sign in to your dashboard.
            </p>
              <p className="text-center text-sm text-muted-foreground">
                Not a partner?{' '}
                <Link href="/login" className="font-medium text-accent hover:text-accent/90 underline">
                Sign in as a customer
                </Link>
            </p>
          </div>
          <Card className="shadow-lg">
              <CardContent className="pt-6">
              <form onSubmit={handleLogin}>
                <Tabs value={role} onValueChange={(value) => setRole(value as UserRole)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
                        <TabsTrigger value="dispatcher">Dispatcher</TabsTrigger>
                        <TabsTrigger value="hospital">Hospital</TabsTrigger>
                    </TabsList>
                    {renderFormContent('pharmacy')}
                    {renderFormContent('dispatcher')}
                    {renderFormContent('hospital')}
                </Tabs>
                 <div className="mt-6">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
                        Sign in as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Button>
                </div>
              </form>
            </CardContent>
        </Card>
        <div className="text-center text-sm text-muted-foreground">
            Are you an Admin?{' '}
            <Link href="/admin/login" className="font-medium text-accent hover:text-accent/90 underline">
                Admin Login
            </Link>
        </div>
        </motion.div>
      </div>
    </div>
  );
}
