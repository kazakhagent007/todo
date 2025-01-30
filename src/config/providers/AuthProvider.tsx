'use client';

import { createContext, ReactNode, useContext } from 'react';
import { User } from '@/entities/types';

interface AuthContextType {
  token: string | null;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ token: null, user: null });

export default function AuthProvider({ token, children, user }: AuthContextType & { children: ReactNode }) {
  return <AuthContext.Provider value={{ token, user }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
