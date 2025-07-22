
'use client';

import { Conversation, Message, AuthUser } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import { cn } from "@/lib/utils";
import { format, parseISO } from 'date-fns';
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface MessageViewProps {
  conversation: Conversation;
  currentUser: AuthUser;
  onSendMessage: (text: string) => void;
}

export function MessageView({ conversation, currentUser, onSendMessage }: MessageViewProps) {
    const [newMessage, setNewMessage] = useState("");
    const scrollAreaRef = useRef<HTMLDivElement>(null);

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
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
            <UserAvatar participants={conversation.participants} />
            <div>
                <CardTitle className="text-base">{conversation.subject}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {conversation.participants.map(p => p.name).join(', ')}
                </p>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[450px] p-6" ref={scrollAreaRef}>
             <div className="space-y-6">
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
                        <div
                            className={cn(
                            "max-w-xs md:max-w-md p-3 rounded-lg",
                            message.senderId === currentUser.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                        >
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1 text-right">
                                {format(parseISO(message.timestamp), 'p')}
                            </p>
                        </div>
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
            className="pr-20"
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
