
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type UserRole = 'customer' | 'admin' | 'pharmacy' | 'dispatcher' | 'hospital';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('admin@e-pharma.com');
  const [role, setRole] = useState<UserRole>('admin');

  const handleLogin = () => {
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
      default:
        router.push('/');
    }
  };


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
              start your 14-day free trial
            </Link>
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-accent hover:text-accent/90">
                            Forgot your password?
                            </a>
                        </div>
                    </div>
                    <Input id="password" name="password" type="password" autoComplete="current-password" required defaultValue="password" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="role">Sign in as...</Label>
                    <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="customer">Customer/Patient</SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="dispatcher">Dispatcher</SelectItem>
                            <SelectItem value="hospital">Hospital</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button type="submit" className="w-full" onClick={handleLogin}>
                    Sign in
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
