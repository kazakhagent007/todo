'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { CreateButton } from '@/features/CreateButton/CreateButton';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

async function getTodos() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    jwt.verify(token, JWT_SECRET);
  } catch {
    redirect('/login');
  }

  const res = await fetch(`/api/todo`, {
    cache: 'no-store',
    credentials: 'same-origin',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }

  return res.json();
}

export default async function List() {
  // const todos = await getTodos();
  const todos = [];

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
            {todos.map((todo: any, index: number) => (
              <tr key={todo.id} className="bg-white border-b border-gray-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{todo.title}</td>
                <td className="px-6 py-4">{todo.description}</td>
                <td className="px-6 py-4">{new Date(todo.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">{todo.done ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
