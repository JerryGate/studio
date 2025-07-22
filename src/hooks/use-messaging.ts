
'use client';

import { useState } from 'react';
import { Conversation, AuthUser, Message } from '@/types';
import { mockConversations, mockUsers } from '@/lib/mock-data';

export const useMessaging = (currentUser: AuthUser) => {
    const [conversations, setConversations] = useState<Conversation[]>(() => {
        // Filter conversations to only those the current user is a part of
        return mockConversations.filter(c => 
            c.participants.some(p => p.id === currentUser.id)
        );
    });

    const sendMessage = (conversationId: string, text: string) => {
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            text,
            timestamp: new Date().toISOString(),
            sender: {
                id: currentUser.id,
                name: currentUser.email.split('@')[0], // a bit of a hack for mock
                role: currentUser.role
            },
            senderId: currentUser.id
        };

        setConversations(prev => 
            prev.map(convo => {
                if (convo.id === conversationId) {
                    return {
                        ...convo,
                        messages: [...convo.messages, newMessage],
                        lastMessageAt: newMessage.timestamp,
                    };
                }
                return convo;
            })
        );
    };

    return { conversations, sendMessage };
};
