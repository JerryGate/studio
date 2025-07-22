
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import Link from "next/link";

export default function LoginPage() {
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
                    <Input id="email" name="email" type="email" autoComplete="email" required />
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
                    <Input id="password" name="password" type="password" autoComplete="current-password" required />
                </div>
                <div>
                    <Button type="submit" className="w-full">
                    Sign in
                    </Button>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
