
'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Product, CartItem } from '@/types';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          toast({
            title: "Stock limit reached",
            description: `You cannot add more than ${product.stock} units of ${product.name}.`,
            variant: 'destructive'
          });
          return prevItems;
        }
        toast({
          title: "Item updated in cart",
          description: `${quantity} x ${product.name} has been added.`,
        });
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      } else {
         if (quantity > product.stock) {
            toast({
                title: "Stock limit reached",
                description: `You cannot add more than ${product.stock} units of ${product.name}.`,
                variant: 'destructive'
            });
            return prevItems;
         }
        toast({
          title: "Item added to cart",
          description: `${quantity} x ${product.name} has been added to your cart.`,
        });
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
    });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems(prevItems => {
      const itemToUpdate = prevItems.find(item => item.id === productId);
      if (!itemToUpdate) return prevItems;

      if (quantity > itemToUpdate.stock) {
        toast({
            title: "Stock limit reached",
            description: `You cannot have more than ${itemToUpdate.stock} units of ${itemToUpdate.name}.`,
            variant: 'destructive'
        });
        return prevItems;
      }

      if (quantity <= 0) {
        toast({
            title: "Item removed",
            description: "The item has been removed from your cart.",
        });
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, [toast]);
  
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
