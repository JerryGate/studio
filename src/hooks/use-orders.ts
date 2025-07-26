
'use client';

import { useState } from 'react';
import { Order, CartItem, OrderStatus, PaymentMethod } from '@/types';
import { mockOrders, addMockOrder, updateMockOrderStatus } from '@/lib/mock-data';

// This is a simplified state management solution for mock data.
// In a real app, you would use a more robust solution like React Context with a reducer,
// or a state management library like Zustand or Redux, and fetch data from an API.

interface NewOrderData extends Omit<Order, 'id' | 'date' | 'status'> {
    paymentMethod: PaymentMethod;
}

export const useOrders = () => {
    // We use a state variable to trigger re-renders when the mock data changes.
    const [orders, setOrders] = useState<Order[]>(mockOrders);

    const addOrder = (newOrderData: NewOrderData) => {
        const newOrder: Order = {
            ...newOrderData,
            id: `ORD${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Processing',
        };
        addMockOrder(newOrder);
        // Update state to trigger re-render in components using this hook
        setOrders([...mockOrders]); 
    };
    
    const updateOrderStatus = (orderId: string, status: OrderStatus) => {
        updateMockOrderStatus(orderId, status);
        setOrders([...mockOrders]);
    }

    return { orders, addOrder, updateOrderStatus };
};
