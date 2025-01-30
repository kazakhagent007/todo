'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MessageAlert } from '@/entities/MessageAlert';
import { MessageTypes } from '@/entities/types/MessageTypes';

interface MessageContextType {
  openMessage: ({ title: string, type: MessageTypes }) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<{ open: boolean; title: string; type: MessageTypes } | null>(null);

  const openMessage = ({ title, type }) => {
    setMessage({ title, type, open: true });
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <MessageContext.Provider value={{ openMessage }}>
      {children}
      <MessageAlert {...message} onClose={() => setMessage(null)} />
    </MessageContext.Provider>
  );
}

export function useMessage() {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
}
