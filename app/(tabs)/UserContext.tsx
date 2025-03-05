import React, { createContext, useContext, useState, ReactNode } from 'react';

// Définition de l'interface pour un livre
interface Book {
  title: string;
  author: string;
  price: number;
  // Ajoute d'autres propriétés si nécessaire
}

interface UserContextType {
  cart: { book: Book; quantity: number }[]; // Typage du cart
  addToCart: (book: Book, quantity: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ book: Book; quantity: number }[]>([]);

  const addToCart = (book: Book, quantity: number) => {
    const existingBook = cart.find(item => item.book.title === book.title);
    if (existingBook) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.book.title === book.title
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { book, quantity }]);
    }
  };

  return (
    <UserContext.Provider value={{ cart, addToCart }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
