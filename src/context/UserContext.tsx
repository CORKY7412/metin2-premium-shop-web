import { createContext, useContext, useState, type ReactNode } from 'react';

interface UserContextType {
  tombolaTickets: number;
  yabbieCoins: number;
  addTombolaTickets: (amount: number) => void;
  removeTombolaTickets: (amount: number) => void;
  addYabbieCoins: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [tombolaTickets, setTombolaTickets] = useState(3);
  const [yabbieCoins, setYabbieCoins] = useState(0);

  const addTombolaTickets = (amount: number) => {
    setTombolaTickets(prev => prev + amount);
  };

  const removeTombolaTickets = (amount: number) => {
    setTombolaTickets(prev => Math.max(0, prev - amount));
  };

  const addYabbieCoins = (amount: number) => {
    setYabbieCoins(prev => prev + amount);
  };

  return (
    <UserContext.Provider
      value={{
        tombolaTickets,
        yabbieCoins,
        addTombolaTickets,
        removeTombolaTickets,
        addYabbieCoins,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) 
    throw new Error('useUser must be used within UserProvider');
  
  return context;
};
