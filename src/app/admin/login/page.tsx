
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const roleToDashboard: Record<UserRole, string> = {
    admin: '/admin',
    'super-admin': '/admin/super-admin',
    'finance-admin': '/admin/finance-admin',
    'content-admin': '/admin/content-admin',
    customer: '/dashboard',
    pharmacy: '/pharmacy',
    dispatcher: '/dispatcher',
    hospital: '/hospital',
}

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('super-admin');
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

  const adminRoles: UserRole[] = ['super-admin', 'finance-admin', 'content-admin'];

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <Logo center iconSize="h-10 w-10" textSize="text-4xl" textClassName="inline" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            Admin Portal
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Not an admin?{' '}
            <Link href="/partner/login" className="font-medium text-accent hover:text-accent/90">
              Login as a partner
            </Link>
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Admin Sign In</CardTitle>
                <CardDescription>Select your role and enter your credentials.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Admin Role</Label>
                        <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select your admin role" />
                            </SelectTrigger>
                            <SelectContent>
                                {adminRoles.map(r => (
                                    <SelectItem key={r} value={r}>
                                        {r.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" type="email" defaultValue={mockAuthUsers[role].email} readOnly key={role} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input id="password" type={showPassword ? "text" : "password"} required defaultValue="password" className="pr-10" />
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
      </div>
    </div>
  );
}
