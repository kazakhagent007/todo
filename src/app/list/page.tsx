'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { CreateButton } from '@/features/CreateButton/CreateButton';
import { Todo } from '@/entities/types/Todo';
import dayjs from 'dayjs';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

async function getTodos(): Promise<Todo[]> {
  const head = await headers(); // Gets the current domain
  const host = head.get('host'); // Gets the current domain
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  // Read cookies from the server
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join('; ');

  const res = await fetch(`${protocol}://${host}/api/todo`, {
    cache: 'no-store',
    headers: {
      Cookie: cookieHeader, // Pass cookies manually
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

  return (
    <div className="flex flex-col items-center mt-[100px] gap-4">
      <div className="relative overflow-x-auto">
        <div className="flex justify-end mb-6">
          <CreateButton />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Done
              </th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo: any, index: number) => (
              <tr key={todo.id} className="bg-white border-b border-gray-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{todo.title}</td>
                <td className="px-6 py-4">{todo.description}</td>
                <td className="px-6 py-4">{dayjs(todo.createdAt).format('DD.MM.YYYY')}</td>
                <td className="px-6 py-4">{todo.done ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
