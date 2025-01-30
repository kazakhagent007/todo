import { User } from '@/entities/types';
import jwt from 'jsonwebtoken';

export function getUser(token: string | null): User | null {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as User;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
