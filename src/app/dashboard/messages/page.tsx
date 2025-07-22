
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
            <h1 className="text-3xl font-bold text-primary mb-6">My Messages</h1>
            <MessagingSystem currentUser={user} />
        </div>
    );
}
