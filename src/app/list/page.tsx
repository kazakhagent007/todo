'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { Todo } from '@/entities/types/Todo';
import ListPage from '@/pages/ListPage/ListPage';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

async function getTodos(): Promise<Todo[]> {
  const head = await headers();
  const host = head.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const res = await fetch(`${protocol}://${host}/api/todo`, {
    cache: 'no-store',
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch todos', res.status);
    throw new Error('Failed to fetch todos');
  }

  return res.json() as Todo[];
}

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

  const todos: Todo[] = await getTodos();

  return <ListPage todos={todos ?? []} />;
}
