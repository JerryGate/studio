
'use client';

import { Conversation, Message, AuthUser } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send, ArrowLeft } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { cn } from "@/lib/utils";
import { format, parseISO } from 'date-fns';
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface MessageViewProps {
  conversation: Conversation;
  currentUser: AuthUser;
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

export function MessageView({ conversation, currentUser, onSendMessage, onBack }: MessageViewProps) {
    const [newMessage, setNewMessage] = useState("");
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage);
            setNewMessage("");
        }
    };
    
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight });
        }
    }, [conversation.messages]);


  return (
    <Card className="flex flex-col h-full shadow-none border-0">
      <CardHeader className="border-b flex-row items-center gap-4">
        {isMobile && (
            <motion.div whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            </motion.div>
        )}
        <UserAvatar participants={conversation.participants} />
        <div>
            <CardTitle className="text-base">{conversation.subject}</CardTitle>
            <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
                {conversation.participants.map(p => p.name).join(', ')}
            </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[calc(100%_-_70px)] md:h-[calc(100%_-_85px)]" viewPortClassName="h-full">
            <div className="p-6 space-y-6 h-full">
                {conversation.messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex items-end gap-3",
                            message.senderId === currentUser.id ? "justify-end" : "justify-start"
                        )}
                    >
                        {message.senderId !== currentUser.id && (
                             <UserAvatar participants={[message.sender]} />
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                            "max-w-xs md:max-w-md p-3 rounded-xl",
                            message.senderId === currentUser.id
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-muted rounded-bl-none"
                            )}
                        >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1 text-right">
                                {format(parseISO(message.timestamp), 'p')}
                            </p>
                        </motion.div>
                         {message.senderId === currentUser.id && (
                             <UserAvatar participants={[message.sender]} />
                        )}
                    </div>
                ))}
             </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="relative w-full">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                }
            }}
            className="pr-20 min-h-0"
            rows={1}
          />
          <Button
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
