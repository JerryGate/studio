
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Phone, Save } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '@/contexts/settings-context';
import { Separator } from '@/components/ui/separator';

export default function SiteSettingsPage() {
    const { toast } = useToast();
    const { whatsAppNumber, setWhatsAppNumber, loading } = useSettings();
    const [isSaving, setIsSaving] = useState(false);
    const [tempNumber, setTempNumber] = useState(whatsAppNumber);

    useState(() => {
        if (!loading) {
            setTempNumber(whatsAppNumber);
        }
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setWhatsAppNumber(tempNumber);
        setTimeout(() => {
             toast({
                title: "Settings Saved",
                description: "The WhatsApp number has been updated successfully.",
            });
            setIsSaving(false);
        }, 1000)
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold animated-gradient-text">Site Settings</h1>
            <p className="text-muted-foreground">Manage general website settings and contact information.</p>
            
            <Separator />
            
            <form onSubmit={handleSave}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone /> Contact Information
                        </CardTitle>
                        <CardDescription>
                            Update the contact details used across the website.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp-number">WhatsApp Contact Number</Label>
                            <Input
                                id="whatsapp-number"
                                value={tempNumber}
                                onChange={(e) => setTempNumber(e.target.value)}
                                placeholder="e.g., 2348012345678"
                                disabled={loading}
                            />
                            <p className="text-xs text-muted-foreground">
                               Enter the number with the country code, without the '+' sign.
                            </p>
                        </div>
                        <Button type="submit" disabled={isSaving || loading}>
                             {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
