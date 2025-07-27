
'use client';

import { useState } from 'react';
import { Card } from '../ui/card';
import { ConversationList } from './conversation-list';
import { MessageView } from './message-view';
import { useMessaging } from '@/hooks/use-messaging';
import { AuthUser } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface MessagingSystemProps {
    currentUser: AuthUser;
}

const listVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: '0%', opacity: 1 },
    exit: { x: '-100%', opacity: 0 }
};

const messageVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: '0%', opacity: 1 },
    exit: { x: '100%', opacity: 0 }
};

export function MessagingSystem({ currentUser }: MessagingSystemProps) {
    const { conversations, sendMessage } = useMessaging(currentUser);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
        conversations.length > 0 ? conversations[0].id : null
    );
    const isMobile = useIsMobile();

    const selectedConversation = conversations.find(c => c.id === selectedConversationId);

    const handleSendMessage = (text: string) => {
        if (selectedConversationId) {
            sendMessage(selectedConversationId, text);
        }
    };
    
    const handleSelectConversation = (id: string) => {
        setSelectedConversationId(id);
    }

    // Desktop View
    if (!isMobile) {
        return (
            <Card className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[700px] overflow-hidden">
                <div className="col-span-1 bg-muted/40">
                    <h2 className="p-4 text-lg font-semibold shadow-sm">Conversations</h2>
                     <ScrollArea className="h-[calc(700px-57px)]">
                        <ConversationList
                            conversations={conversations}
                            selectedConversationId={selectedConversationId}
                            onSelectConversation={handleSelectConversation}
                        />
                    </ScrollArea>
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {selectedConversation ? (
                             <motion.div
                                key={selectedConversation.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                <MessageView
                                    conversation={selectedConversation}
                                    currentUser={currentUser}
                                    onSendMessage={handleSendMessage}
                                    onBack={() => {}}
                                />
                            </motion.div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                <p>Select a conversation to start messaging.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        );
    }

    // Mobile View
    return (
        <Card className="h-[70vh] md:h-[700px] overflow-hidden relative">
            <AnimatePresence initial={false}>
                {!selectedConversationId ? (
                    <motion.div
                        key="list"
                        variants={listVariants}
                        initial="visible"
                        exit="exit"
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                        className="absolute inset-0"
                    >
                         <div className="col-span-1 bg-muted/40 h-full flex flex-col">
                            <h2 className="p-4 text-lg font-semibold shadow-sm">Conversations</h2>
                            <ScrollArea className="flex-1">
                                <ConversationList
                                    conversations={conversations}
                                    selectedConversationId={selectedConversationId}
                                    onSelectConversation={handleSelectConversation}
                                />
                             </ScrollArea>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="message"
                        variants={messageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        {selectedConversation && (
                            <MessageView
                                conversation={selectedConversation}
                                currentUser={currentUser}
                                onSendMessage={handleSendMessage}
                                onBack={() => setSelectedConversationId(null)}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}
