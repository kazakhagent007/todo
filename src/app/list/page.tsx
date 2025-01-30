import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { Button } from '@headlessui/react';
import { useCallback } from 'react';
import { CreateButton } from '@/features/CreateButton/CreateButton';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export default async function List() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let user;
  try {
    user = jwt.verify(token, JWT_SECRET);
  } catch {
    redirect('/login');
  }

  const onClickCreate = () => {
    console.log('');
  };

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
            <tr className="bg-white border-b border-gray-200">
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">Eslint</td>
              <td className="px-6 py-4">Desc</td>
              <td className="px-6 py-4">28.01</td>
              <td className="px-6 py-4">Done</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
