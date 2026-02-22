import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
};

type StoreContextType = {
  cart: Product[];
  saved: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  addToSaved: (product: Product) => void;
};

const StoreContext = createContext<StoreContextType>({
  cart: [],
  saved: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  addToSaved: () => {},
});

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [saved, setSaved] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p =>
          p.id === product.id
            ? { ...p, quantity: (p.quantity || 1) + (product.quantity || 1) }
            : p
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev
        .map(p =>
          p.id === productId ? { ...p, quantity: (p.quantity || 1) + delta } : p
        )
        .filter(p => (p.quantity || 0) > 0)
    );
  };

  const addToSaved = (product: Product) => {
    // ჯერ ვამოწმებთ, არ არის უკვე saved-ში
    setSaved(prev => {
      if (!prev.find(p => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
    // შემდეგ წაშალე კარტიდან
    removeFromCart(product.id);
  };

  return (
    <StoreContext.Provider
      value={{ cart, saved, addToCart, removeFromCart, updateQuantity, addToSaved }}
    >
      {children}
    </StoreContext.Provider>
  );
};