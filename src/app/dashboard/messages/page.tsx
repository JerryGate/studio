
'use client';

import { MessagingSystem } from '@/components/messaging/messaging-system';
import { useAuth } from '@/contexts/auth-context';

export default function MessagesPage() {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-primary mb-2">My Messages</h1>
            <p className="text-muted-foreground mb-6">
                Communicate directly with pharmacies or contact our support team here to raise a ticket for any issues.
            </p>
            <MessagingSystem currentUser={user} />
        </div>
    );
}
