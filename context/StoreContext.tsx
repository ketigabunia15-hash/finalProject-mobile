import React, { createContext, useContext, useState, ReactNode } from "react";

/* ================= TYPES ================= */
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

/* ================= CONTEXT ================= */
const StoreContext = createContext<StoreContextType>({
  cart: [],
  saved: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  addToSaved: () => {},
  removeFromSaved: () => {},
});

/* ================= HOOK ================= */
export const useStore = () => useContext(StoreContext);

/* ================= PROVIDER ================= */
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [saved, setSaved] = useState<Product[]>([]);

  /* -------- ADD TO CART -------- */
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

  /* -------- REMOVE FROM CART -------- */
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  /* -------- UPDATE QUANTITY (+ / -) -------- */
  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev
        .map(p => {
          if (p.id === productId) {
            const newQty = (p.quantity || 1) + delta;
            return { ...p, quantity: newQty > 0 ? newQty : 0 };
          }
          return p;
        })
        .filter(p => (p.quantity || 0) > 0)
    );
  };

  /* -------- ADD TO SAVED -------- */
  const addToSaved = (product: Product) => {
    setSaved(prev => {
      if (!prev.find(p => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
    removeFromCart(product.id); // cart-დან წაშლა
  };

  /* -------- REMOVE FROM SAVED -------- */
  const removeFromSaved = (productId: number) => {
    setSaved(prev => prev.filter(p => p.id !== productId));
  };

  /* -------- PROVIDER VALUE -------- */
  return (
    <StoreContext.Provider
      value={{
        cart,
        saved,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};