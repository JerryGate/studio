




export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrls: string[];
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
    id:string;
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

// Order type
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
    id: string;
    date: string;
    total: number;
    status: OrderStatus;
    items: CartItem[];
    customerDetails: any;
}


// Admin types
export type Pharmacy = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  dateRegistered: string;
};

export type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  status: 'Active' | 'Inactive' | 'Suspended';
};

export type Dispatcher = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: 'Active' | 'Inactive';
  deliveries: number;
};
