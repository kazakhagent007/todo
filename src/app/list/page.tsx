'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import ListPage from '@/pages/ListPage/ListPage';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export default async function List() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    redirect('/login');
  }

  return <ListPage />;
}
