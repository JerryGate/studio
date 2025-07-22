
export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    dataAiHint?: string;
    description?: string;
    category: string;
    stock: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export type UserRole = 'customer' | 'admin' | 'pharmacy' | 'dispatcher' | 'hospital';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface Participant {
    id: string;
    name: string;
    role: UserRole;
}

export interface Message {
  id: string;
  senderId: string;
  sender: Participant;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participants: Participant[];
  messages: Message[];
  subject: string;
  lastMessageAt: string;
}
