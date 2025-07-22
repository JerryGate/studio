import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
                            <label htmlFor="recipient-group" className="block text-sm font-medium text-gray-700">Recipient Group</label>
                            {/* In a real app, this would be a dynamic select component */}
                            <select id="recipient-group" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm">
                                <option>All Users</option>
                                <option>Patients</option>
                                <option>Pharmacies</option>
                                <option>Dispatchers</option>
                            </select>
                        </div>
                        <div>
                             <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <Textarea id="message" placeholder="Type your notification message here..." rows={6} />
                        </div>
                        <Button>Send Notification</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
