import React, { createContext, useContext, useState, ReactNode } from "react";

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
  removeFromSaved: (productId: number) => void;
};

const StoreContext = createContext<StoreContextType>({
  cart: [],
  saved: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  addToSaved: () => {},
  removeFromSaved: () => {},
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
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev =>
      prev
        .map(p => {
          if (p.id === id) {
            const qty = (p.quantity || 1) + delta;
            return { ...p, quantity: qty > 0 ? qty : 0 };
          }
          return p;
        })
        .filter(p => (p.quantity || 0) > 0)
    );
  };

  const addToSaved = (product: Product) => {
    setSaved(prev =>
      prev.find(p => p.id === product.id)
        ? prev
        : [...prev, product]
    );

    removeFromCart(product.id);
  };

  const removeFromSaved = (id: number) => {
    setSaved(prev => prev.filter(p => p.id !== id));
  };

  return (
    <StoreContext.Provider value={{
      cart,
      saved,
      addToCart,
      removeFromCart,
      updateQuantity,
      addToSaved,
      removeFromSaved
    }}>
      {children}
    </StoreContext.Provider>
  );
};
