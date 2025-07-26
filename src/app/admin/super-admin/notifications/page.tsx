
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';

export default function NotificationsPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [recipientGroup, setRecipientGroup] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipientGroup || !message) {
             toast({
                title: "Incomplete Form",
                description: "Please select a recipient group and enter a message.",
                variant: 'destructive'
            });
            return;
        }

        setIsLoading(true);
        // Simulate sending notification
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log({ recipientGroup, message });

        setIsLoading(false);
        toast({
            title: 'Notification Sent!',
            description: `The message has been sent to ${recipientGroup}.`
        });
        setRecipientGroup('');
        setMessage('');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold animated-gradient-text mb-6">Email Notifications</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Send a Notification</CardTitle>
                    <CardDescription>Broadcast a message to a specific group of users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="recipient-group" className="block text-sm font-medium text-foreground">Recipient Group</Label>
                             <Select value={recipientGroup} onValueChange={setRecipientGroup}>
                                <SelectTrigger id="recipient-group" className="mt-1 block w-full">
                                    <SelectValue placeholder="Select a group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Users</SelectItem>
                                    <SelectItem value="patients">Patients</SelectItem>
                                    <SelectItem value="pharmacies">Pharmacies</SelectItem>
                                    <SelectItem value="dispatchers">Dispatchers</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                             <Label htmlFor="message" className="block text-sm font-medium text-foreground">Message</Label>
                            <Textarea 
                                id="message" 
                                placeholder="Type your notification message here..." 
                                rows={6} 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                           {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                           Send Notification
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
