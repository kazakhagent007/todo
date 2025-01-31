import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Store in .env

export async function verifyToken(req: NextRequest) {
  const cookieStore = await cookies();
  if (!cookieStore) return null;

  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
