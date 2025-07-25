
import { Conversation, UserRole, Participant, Pharmacy, Patient, Dispatcher, Order, OrderStatus, BlogPost } from '@/types';

type MockUsers = Record<UserRole, Participant>;

export const adminRoles: UserRole[] = ['super-admin', 'finance-admin', 'content-admin'];

export const mockUsers: MockUsers = {
    admin: { id: 'admin1', name: 'Admin User', role: 'admin' },
    customer: { id: 'customer1', name: 'John Doe', role: 'customer' },
    pharmacy: { id: 'pharmacy1', name: 'GoodHealth Pharmacy', role: 'pharmacy' },
    dispatcher: { id: 'dispatcher1', name: 'Femi Adebayo', role: 'dispatcher' },
    hospital: { id: 'hospital1', name: 'General Hospital', role: 'hospital' },
    'super-admin': { id: 'superadmin1', name: 'Super Admin', role: 'super-admin' },
    'finance-admin': { id: 'financeadmin1', name: 'Finance Admin', role: 'finance-admin' },
    'content-admin': { id: 'contentadmin1', name: 'Content Admin', role: 'content-admin' },
};

export const mockAuthUsers = {
    admin: { id: 'admin1', email: 'admin@e-pharma.com', role: 'admin' as UserRole },
    customer: { id: 'customer1', email: 'customer@e-pharma.com', role: 'customer' as UserRole },
    pharmacy: { id: 'pharmacy1', email: 'pharmacy@e-pharma.com', role: 'pharmacy' as UserRole },
    dispatcher: { id: 'dispatcher1', email: 'dispatcher@e-pharma.com', role: 'dispatcher' as UserRole },
    hospital: { id: 'hospital1', email: 'hospital@e-pharma.com', role: 'hospital' as UserRole },
    'super-admin': { id: 'superadmin1', email: 'super@e-pharma.com', role: 'super-admin' as UserRole },
    'finance-admin': { id: 'financeadmin1', email: 'finance@e-pharma.com', role: 'finance-admin' as UserRole },
    'content-admin': { id: 'contentadmin1', email: 'content@e-pharma.com', role: 'content-admin' as UserRole },
}


export const mockConversations: Conversation[] = [
  {
    id: 'convo1',
    participants: [mockUsers.customer, mockUsers.pharmacy],
    subject: 'Order Inquiry: #ORD001',
    lastMessageAt: '2024-07-26T10:05:00.000Z',
    messages: [
      { id: 'msg1', senderId: 'customer1', sender: mockUsers.customer, text: 'Hi, I have a question about my order.', timestamp: '2024-07-26T10:00:00.000Z' },
      { id: 'msg2', senderId: 'pharmacy1', sender: mockUsers.pharmacy, text: 'Hello! I can help with that. What is your question?', timestamp: '2024-07-26T10:05:00.000Z' },
    ],
  },
  {
    id: 'convo2',
    participants: [mockUsers.customer, mockUsers.dispatcher],
    subject: 'Delivery for Order #ORD002',
    lastMessageAt: '2024-07-26T11:30:00.000Z',
    messages: [
      { id: 'msg3', senderId: 'dispatcher1', sender: mockUsers.dispatcher, text: 'I am on my way with your delivery.', timestamp: '2024-07-26T11:25:00.000Z' },
      { id: 'msg4', senderId: 'customer1', sender: mockUsers.customer, text: 'Great, thank you for the update!', timestamp: '2024-07-26T11:30:00.000Z' },
    ],
  },
  {
    id: 'convo3',
    participants: [mockUsers.admin, mockUsers.pharmacy],
    subject: 'Verification Document Submission',
    lastMessageAt: '2024-07-25T15:00:00.000Z',
    messages: [
      { id: 'msg5', senderId: 'admin1', sender: mockUsers.admin, text: 'Please upload your business registration documents.', timestamp: '2024-07-25T14:55:00.000Z' },
      { id: 'msg6', senderId: 'pharmacy1', sender: mockUsers.pharmacy, text: 'I have just uploaded them. Please confirm.', timestamp: '2024-07-25T15:00:00.000Z' },
    ],
  },
  {
    id: 'convo4',
    participants: [mockUsers.customer, mockUsers.admin],
    subject: 'Support Ticket: Payment Issue',
    lastMessageAt: '2024-07-26T09:15:00.000Z',
    messages: [
      { id: 'msg7', senderId: 'customer1', sender: mockUsers.customer, text: 'My payment is not going through.', timestamp: '2024-07-26T09:10:00.000Z' },
      { id: 'msg8', senderId: 'admin1', sender: mockUsers.admin, text: 'We are looking into this for you right now.', timestamp: '2024-07-26T09:15:00.000Z' },
    ],
  },
  {
    id: 'convo5',
    participants: [mockUsers.hospital, mockUsers.pharmacy],
    subject: 'Bulk Order Request',
    lastMessageAt: '2024-07-24T18:00:00.000Z',
    messages: [
      { id: 'msg9', senderId: 'hospital1', sender: mockUsers.hospital, text: 'We would like to place a bulk order for amoxicillin.', timestamp: '2024-07-24T17:55:00.000Z' },
       { id: 'msg10', senderId: 'pharmacy1', sender: mockUsers.pharmacy, text: 'Of course, let me prepare a quote for you.', timestamp: '2024-07-24T18:00:00.000Z' },
    ],
  },
];


export const mockPharmacies: Pharmacy[] = [
    { id: 'PHM001', name: 'GoodHealth Pharmacy', contactPerson: 'John Doe', email: 'contact@goodhealth.com', phone: '08012345678', status: 'Approved', dateRegistered: '2023-01-15' },
    { id: 'PHM002', name: 'Wellness Meds', contactPerson: 'Jane Smith', email: 'info@wellnessmeds.ng', phone: '09087654321', status: 'Pending', dateRegistered: '2023-02-20' },
    { id: 'PHM003', name: 'City Drugs', contactPerson: 'Mike Johnson', email: 'support@citydrugs.com', phone: '07033445566', status: 'Approved', dateRegistered: '2022-11-30' },
    { id: 'PHM004', name: 'CarePoint Pharmacy', contactPerson: 'Sarah Williams', email: 'care@carepoint.ng', phone: '08122334455', status: 'Rejected', dateRegistered: '2023-03-10' },
    { id: 'PHM005', name: 'Nationwide Pharmacy', contactPerson: 'David Brown', email: 'hr@nationwide.com', phone: '08055667788', status: 'Approved', dateRegistered: '2021-09-01' },
];

export const mockPatients: Patient[] = [
    { id: 'PAT001', name: 'Adebayo Adekunle', email: 'adebayo@example.com', phone: '08011223344', orders: 5, status: 'Active' },
    { id: 'PAT002', name: 'Chidinma Okoro', email: 'chidinma@example.com', phone: '09022334455', orders: 2, status: 'Active' },
    { id: 'PAT003', name: 'Musa Ibrahim', email: 'musa@example.com', phone: '07033445566', orders: 8, status: 'Active' },
    { id: 'PAT004', name: 'Funke Ojo', email: 'funke@example.com', phone: '08144556677', orders: 0, status: 'Inactive' },
    { id: 'PAT005', name: 'Emeka Nwosu', email: 'emeka@example.com', phone: '08055667788', orders: 12, status: 'Active' },
    { id: 'PAT006', name: 'Zainab Bello', email: 'zainab@example.com', phone: '09066778899', orders: 1, status: 'Suspended' },
];


export const mockDispatchers: Dispatcher[] = [
    { id: 'DIS001', name: 'Femi Adebayo', phone: '08098765432', vehicle: 'Honda Motorcycle - ABC 123', status: 'Active', deliveries: 25 },
    { id: 'DIS002', name: 'Tunde Bakare', phone: '08023456789', vehicle: 'Suzuki Bike - XYZ 789', status: 'Active', deliveries: 15 },
    { id: 'DIS003', name: 'Chioma Nwosu', phone: '09011223344', vehicle: 'TVS Tricycle - LMN 456', status: 'Inactive', deliveries: 42 },
    { id: 'DIS004', name: 'Musa Aliyu', phone: '08134567890', vehicle: 'Bajaj Bike - GHI 321', status: 'Active', deliveries: 8 },
];

export let mockOrders: Order[] = [
    { id: 'ORD001', date: '2024-07-20', total: 3700, status: 'Delivered', items: [], customerDetails: { fullName: 'Adebayo Adekunle', email: '', phone: '', address: '123 Test Street', city: '', state: '', deliveryFee: 0, paymentMethod: 'paystack' } },
    { id: 'ORD002', date: '2024-07-22', total: 1500, status: 'Shipped', items: [], customerDetails: { fullName: 'Chidinma Okoro', email: '', phone: '', address: '456 Example Ave', city: '', state: '', deliveryFee: 0, paymentMethod: 'paystack' } },
    { id: 'ORD003', date: '2024-07-23', total: 800, status: 'Processing', items: [], customerDetails: { fullName: 'Musa Ibrahim', email: '', phone: '', address: '789 Sample Road', city: '', state: '', deliveryFee: 0, paymentMethod: 'paystack' } },
];

export const addMockOrder = (order: Order) => {
    mockOrders.unshift(order);
};

export const updateMockOrderStatus = (orderId: string, status: OrderStatus) => {
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
        mockOrders[orderIndex].status = status;
    }
};

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Simple Ways to Boost Your Immune System Naturally',
    slug: 'boost-immune-system-naturally',
    author: 'Dr. Aisha Bello',
    publishedDate: 'July 28, 2024',
    category: 'Health Tips',
    status: 'Published',
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'fresh fruits vegetables',
    excerpt: 'Discover ten simple yet effective strategies to strengthen your immune system using natural methods, from dietary changes to lifestyle adjustments...',
    content: 'Full content of the blog post goes here. This would be a longer text, possibly formatted with Markdown.'
  },
  {
    id: '2',
    title: 'Understanding Common Drug Interactions',
    slug: 'common-drug-interactions',
    author: 'Pharmacist Tunde Adeoye',
    publishedDate: 'July 25, 2024',
    category: 'Pharmacy News',
    status: 'Published',
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'pills pillbox',
    excerpt: 'Learn about common drug interactions that can affect your health. Always consult your pharmacist before taking new medications...',
    content: 'Full content of the blog post goes here. This would be a longer text, possibly formatted with Markdown.'
  },
  {
    id: '3',
    title: 'The Importance of Hydration for Your Health in Nigeria',
    slug: 'hydration-importance-nigeria',
    author: 'Dr. Aisha Bello',
    publishedDate: 'July 22, 2024',
    category: 'Wellness',
    status: 'Published',
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'glass of water',
    excerpt: 'Staying hydrated is crucial, especially in a warm climate like Nigeria. We explore the benefits of drinking enough water and tips to stay hydrated...',
    content: 'Full content of the blog post goes here. This would be a longer text, possibly formatted with Markdown.'
  },
    {
    id: '4',
    title: 'Navigating Seasonal Allergies in Lagos',
    slug: 'seasonal-allergies-lagos',
    author: 'Pharmacist Tunde Adeoye',
    publishedDate: 'July 19, 2024',
    category: 'Health Tips',
    status: 'Published',
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'person sneezing flowers',
    excerpt: 'The rainy season can bring on allergies. Here are some tips to manage your symptoms and find relief during allergy season in Nigeria...',
    content: 'Full content of the blog post goes here. This would be a longer text, possibly formatted with Markdown.'
  },
  {
    id: '5',
    title: 'How E-pharma is Fighting Counterfeit Drugs',
    slug: 'fighting-counterfeit-drugs',
    author: 'E-pharma Team',
    publishedDate: 'July 15, 2024',
    category: 'Pharmacy News',
    status: 'Published',
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'pharmacist checking medicine',
    excerpt: 'Learn how our verification process and direct partnerships with licensed pharmacies are helping to ensure you only receive authentic medications...',
    content: 'Full content of the blog post goes here. This would be a longer text, possibly formatted with Markdown.'
  },
   {
    id: '6',
    title: 'A Guide to Managing Diabetes',
    slug: 'managing-diabetes-guide',
    author: 'Dr. Aisha Bello',
    publishedDate: 'July 12, 2024',
    category: 'Wellness',
    status: 'Draft',
    imageUrl: 'https://placehold.co/800x400.png',
    dataAiHint: 'blood glucose monitor',
    excerpt: 'A comprehensive guide for individuals living with diabetes in Nigeria, covering diet, medication, and lifestyle choices for better health management...',
    content: 'Full content of the blog post goes here. This would be a longer text, possibly formatted with Markdown.'
  },
];
