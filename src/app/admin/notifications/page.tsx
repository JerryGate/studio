import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function NotificationsPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-6">Email Notifications</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Send a Notification</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="recipient-group" className="block text-sm font-medium text-foreground">Recipient Group</Label>
                             <Select>
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
                            <Textarea id="message" placeholder="Type your notification message here..." rows={6} />
                        </div>
                        <Button>Send Notification</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
