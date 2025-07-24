
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Truck } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';

export default function PartnerPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-8">
                <div className="text-center">
                    <Logo center iconSize="h-12 w-12" textSize="text-5xl" textClassName="inline" />
                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-primary">Join the E-pharma Network</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Partner with us to expand your reach and contribute to accessible healthcare in Nigeria.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="flex flex-col text-center">
                        <CardHeader>
                            <div className="mx-auto bg-accent text-accent-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
                                <Pill className="h-8 w-8" />
                            </div>
                            <CardTitle>Are you a Pharmacy?</CardTitle>
                            <CardDescription>
                                Register your pharmacy on E-pharma to reach more customers, manage your inventory online, and increase your sales.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-center justify-center">
                            <p className="text-muted-foreground">
                            Join our network of verified pharmacies and become a trusted healthcare provider in your community.
                            </p>
                        </CardContent>
                        <div className="p-6">
                            <Button size="lg" asChild>
                                <Link href="/partner/signup/pharmacy">Get Started as a Pharmacy</Link>
                            </Button>
                        </div>
                    </Card>
                        <Card className="flex flex-col text-center">
                        <CardHeader>
                            <div className="mx-auto bg-accent text-accent-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
                                <Truck className="h-8 w-8" />
                            </div>
                            <CardTitle>Are you a Dispatcher?</CardTitle>
                            <CardDescription>
                                Sign up as a delivery agent to get access to a steady stream of delivery jobs in your area.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex items-center justify-center">
                            <p className="text-muted-foreground">
                            Earn competitive rates and enjoy flexible working hours. All you need is a reliable vehicle and a smartphone.
                            </p>
                        </CardContent>
                        <div className="p-6">
                            <Button size="lg" asChild>
                                <Link href="/partner/signup/dispatcher">Sign up as a Dispatcher</Link>
                            </Button>
                        </div>
                    </Card>
                </div>

                <div className="text-center">
                    <p className="text-muted-foreground">
                        Already a partner?{' '}
                        <Link href="/partner/login" className="font-medium text-accent hover:text-accent/90">
                            Sign in to your account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
