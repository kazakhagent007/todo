'use client';

import { Button } from '@headlessui/react';
import { FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/config/providers/MessageProvider';

export default function Register() {
  const router = useRouter();
  const { openMessage } = useMessage();

  const onSubmitForm = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');
    console.log(email, password);
    try {
      const res = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log(res);

      if (!res.ok) {
        openMessage({ title: 'User exist', type: 'warning' });
        return;
      } else {
        openMessage({ title: 'You have registered successfully!', type: 'success' });
        router.push('/login');
      }
    } catch {
      openMessage({ title: 'Error on register, try again!', type: 'error' });
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-[100px] gap-4">
      <form onSubmit={onSubmitForm} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Login
          </label>
          <input
            name="email"
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Type your login..."
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Type your password..."
            required
          />
        </div>

        <div>
          <label htmlFor="repeat" className="block mb-2 text-sm font-medium text-gray-900">
            Repeat password
          </label>
          <input
            name="repeat"
            type="password"
            id="repeat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Repeat password..."
            required
          />
        </div>

        <Button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
