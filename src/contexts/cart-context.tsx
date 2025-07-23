
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    let message = '';
    let type: 'default' | 'destructive' = 'default';

    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
            message = `Stock limit reached. You cannot add more than ${product.stock} units of ${product.name}.`;
            type = 'destructive';
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: newQuantity } : item
                )
            );
            message = `${quantity} x ${product.name} has been added.`;
        }
    } else {
        if (quantity > product.stock) {
            message = `Stock limit reached. You cannot add more than ${product.stock} units of ${product.name}.`;
            type = 'destructive';
        } else {
            setCartItems(prevItems => [...prevItems, { ...product, quantity }]);
            message = `Item added to cart: ${quantity} x ${product.name}.`;
        }
    }

    toast({
        title: type === 'destructive' ? 'Error' : 'Success',
        description: message,
        variant: type,
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const itemToUpdate = cartItems.find(item => item.id === productId);
    if (!itemToUpdate) return;
    
    let message = '';
    let type: 'default' | 'destructive' | null = null;
    let shouldUpdate = true;
    
    if (quantity > itemToUpdate.stock) {
        message = `Stock limit reached. You cannot have more than ${itemToUpdate.stock} units of ${itemToUpdate.name}.`;
        type = 'destructive';
        shouldUpdate = false;
    }

    if (shouldUpdate) {
        if (quantity <= 0) {
            setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
            message = "Item removed from cart.";
            type = 'default';
        } else {
            setCartItems(prevItems => 
                prevItems.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    }
    
    if (message && type) {
        toast({
            title: type === 'destructive' ? 'Error' : 'Success',
            description: message,
            variant: type,
        });
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
