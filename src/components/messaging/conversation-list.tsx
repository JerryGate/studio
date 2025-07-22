
import { cn } from "@/lib/utils";
import { Conversation } from "@/types";
import { format, parseISO } from 'date-fns';
import { UserAvatar } from "./user-avatar";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({ conversations, selectedConversationId, onSelectConversation }: ConversationListProps) {
  return (
    <div className="flex flex-col gap-2">
      {conversations.map((convo) => {
        const lastMessage = convo.messages[convo.messages.length - 1];
        return (
          <button
            key={convo.id}
            onClick={() => onSelectConversation(convo.id)}
            className={cn(
              "w-full text-left p-3 rounded-lg transition-colors",
              selectedConversationId === convo.id
                ? "bg-primary/10"
                : "hover:bg-muted"
            )}
          >
            <div className="flex items-start gap-3">
              <UserAvatar participants={convo.participants} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-sm truncate max-w-[150px]">
                      {convo.participants.map(p => p.name).join(', ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {format(parseISO(convo.lastMessageAt), 'p')}
                    </p>
                </div>
                <p className="text-sm text-muted-foreground truncate">{convo.subject}</p>
                {lastMessage && (
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    {lastMessage.text}
                  </p>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
