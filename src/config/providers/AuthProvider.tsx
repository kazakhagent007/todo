'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '@/entities/types';
import { useRouter } from 'next/navigation';

interface AuthProviderType {
  token: string | null;
  user: User | null;
}
interface AuthContextType extends AuthProviderType {
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ token: null, user: null, logout: () => {} });

export default function AuthProvider({
  token: initialToken,
  children,
  user: initialUser,
}: AuthProviderType & { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<User | null>(initialUser);
  const router = useRouter();

  const logout = async () => {
    try {
      // Call the server-side logout API to clear the cookie
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin', // Ensure cookies are sent with the request
      });

      if (response.ok) {
        // Clear the token and user from the state to trigger re-render
        setToken(null);
        setUser(null);

        // Redirect to home page after logout
        router.push('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (e) {
      console.error('Error logging out:', e);
    }
  };

  return <AuthContext.Provider value={{ token, user, logout }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
