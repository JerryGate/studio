
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Participant } from "@/types";

interface UserAvatarProps {
    participants: Participant[];
}

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export function UserAvatar({ participants }: UserAvatarProps) {
    const mainParticipant = participants[0];

    return (
        <Avatar>
            <AvatarImage src={`https://i.pravatar.cc/150?u=${mainParticipant.id}`} />
            <AvatarFallback>{getInitials(mainParticipant.name)}</AvatarFallback>
        </Avatar>
    );
}
