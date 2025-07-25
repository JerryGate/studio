
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

export type UserRole = 'customer' | 'admin' | 'pharmacy' | 'dispatcher' | 'hospital' | 'super-admin' | 'finance-admin' | 'content-admin';

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
export type OrderStatus = 'Pending Approval' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type PaymentMethod = 'paystack' | 'delivery';

interface CustomerDetails {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    deliveryFee: number;
    paymentMethod: PaymentMethod;
    location?: {
        lat: number;
        lng: number;
    };
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: OrderStatus;
    items: CartItem[];
    customerDetails: CustomerDetails;
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishedDate: string;
  category: string;
  status: 'Published' | 'Draft';
  imageUrl: string;
  dataAiHint?: string;
  excerpt: string;
  content: string;
}
