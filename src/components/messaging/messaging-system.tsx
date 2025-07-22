
'use client';

import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { ConversationList } from './conversation-list';
import { MessageView } from './message-view';
import { useMessaging } from '@/hooks/use-messaging';
import { AuthUser } from '@/types';
import { ScrollArea } from '../ui/scroll-area';

interface MessagingSystemProps {
    currentUser: AuthUser;
}

export function MessagingSystem({ currentUser }: MessagingSystemProps) {
    const { conversations, sendMessage } = useMessaging(currentUser);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
        conversations.length > 0 ? conversations[0].id : null
    );

    const selectedConversation = conversations.find(c => c.id === selectedConversationId);

    const handleSendMessage = (text: string) => {
        if (selectedConversationId) {
            sendMessage(selectedConversationId, text);
        }
    };

    return (
        <Card className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[700px]">
            <div className="col-span-1 border-r">
                <h2 className="p-4 text-lg font-semibold border-b">Conversations</h2>
                <ScrollArea className="h-[calc(700px-57px)]">
                    <ConversationList
                        conversations={conversations}
                        selectedConversationId={selectedConversationId}
                        onSelectConversation={setSelectedConversationId}
                    />
                </ScrollArea>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                {selectedConversation ? (
                    <MessageView
                        conversation={selectedConversation}
                        currentUser={currentUser}
                        onSendMessage={handleSendMessage}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>Select a conversation to start messaging.</p>
                    </div>
                )}
            </div>
        </Card>
    );
}
