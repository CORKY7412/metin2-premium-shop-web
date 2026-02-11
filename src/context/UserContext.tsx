import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { api, CURRENT_USER } from '../services/api';

interface UserContextType {
  userId: string;
  drBalance: number;
  tombolaTickets: number;
  yabbieCoins: number;
  loading: boolean;
  addTombolaTickets: (amount: number) => void;
  removeTombolaTickets: (amount: number) => void;
  addYabbieCoins: (amount: number) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [drBalance, setDrBalance] = useState(0);
  const [tombolaTickets, setTombolaTickets] = useState(0);
  const [yabbieCoins, setYabbieCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const balance = await api.user.getBalance(CURRENT_USER);
      setDrBalance(balance.drBalance);
      setTombolaTickets(balance.tombolaTickets);
      setYabbieCoins(balance.yabbieCoins);
    } catch (err) {
      console.error('Error loading user data', err);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const addTombolaTickets = (amount: number) => setTombolaTickets(prev => prev + amount);
  const removeTombolaTickets = (amount: number) => setTombolaTickets(prev => Math.max(0, prev - amount));
  const addYabbieCoins = (amount: number) => setYabbieCoins(prev => prev + amount);

  return (
    <UserContext.Provider
      value={{
        userId: CURRENT_USER,
        drBalance,
        tombolaTickets,
        yabbieCoins,
        loading,
        addTombolaTickets,
        removeTombolaTickets,
        addYabbieCoins,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
