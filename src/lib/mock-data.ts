
import { Conversation, UserRole, Participant } from '@/types';

type MockUsers = Record<UserRole, Participant>;

export const mockUsers: MockUsers = {
    admin: { id: 'admin1', name: 'Admin User', role: 'admin' },
    customer: { id: 'customer1', name: 'John Doe', role: 'customer' },
    pharmacy: { id: 'pharmacy1', name: 'GoodHealth Pharmacy', role: 'pharmacy' },
    dispatcher: { id: 'dispatcher1', name: 'Femi Adebayo', role: 'dispatcher' },
    hospital: { id: 'hospital1', name: 'General Hospital', role: 'hospital' },
};

export const mockAuthUsers = {
    admin: { id: 'admin1', email: 'admin@e-pharma.com', role: 'admin' as UserRole },
    customer: { id: 'customer1', email: 'customer@e-pharma.com', role: 'customer' as UserRole },
    pharmacy: { id: 'pharmacy1', email: 'pharmacy@e-pharma.com', role: 'pharmacy' as UserRole },
    dispatcher: { id: 'dispatcher1', email: 'dispatcher@e-pharma.com', role: 'dispatcher' as UserRole },
    hospital: { id: 'hospital1', email: 'hospital@e-pharma.com', role: 'hospital' as UserRole },
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
