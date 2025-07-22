
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

type UserRole = 'customer' | 'admin' | 'pharmacy' | 'dispatcher' | 'hospital';

const mockUsers: Record<UserRole, { email: string }> = {
    admin: { email: 'admin@e-pharma.com' },
    customer: { email: 'customer@e-pharma.com' },
    pharmacy: { email: 'pharmacy@e-pharma.com' },
    dispatcher: { email: 'dispatcher@e-pharma.com' },
    hospital: { email: 'hospital@e-pharma.com' },
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('admin');
  
  const handleLogin = () => {
    const email = mockUsers[role].email;
    login(email, role);
    switch(role) {
      case 'admin':
        router.push('/admin');
        break;
      case 'customer':
        router.push('/dashboard');
        break;
      case 'pharmacy':
        router.push('/pharmacy');
        break;
      case 'dispatcher':
        router.push('/dispatcher');
        break;
       case 'hospital':
        // Assuming a hospital dashboard route exists
        router.push('/hospital'); 
        break;
      default:
        router.push('/');
    }
  };

  const renderLoginForm = (currentRole: UserRole) => (
     <TabsContent value={currentRole} className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor={`${currentRole}-email`}>Email address</Label>
            <Input id={`${currentRole}-email`} type="email" value={mockUsers[currentRole].email} readOnly />
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor={`${currentRole}-password`}>Password</Label>
                <div className="text-sm">
                    <a href="#" className="font-medium text-accent hover:text-accent/90">
                    Forgot your password?
                    </a>
                </div>
            </div>
            <Input id={`${currentRole}-password`} type="password" required defaultValue="password" />
        </div>
         <div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
                Sign in as {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
            </Button>
        </div>
     </TabsContent>
  );


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Link href="/" className="inline-block">
                <Logo />
            </Link>
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
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Select your role to sign in with mock data.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={role} onValueChange={(value) => setRole(value as UserRole)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                        <TabsTrigger value="customer">Customer</TabsTrigger>
                        <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
                        <TabsTrigger value="dispatcher">Dispatcher</TabsTrigger>
                        <TabsTrigger value="hospital">Hospital</TabsTrigger>
                    </TabsList>
                    {renderLoginForm('admin')}
                    {renderLoginForm('customer')}
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
