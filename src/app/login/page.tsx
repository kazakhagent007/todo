'use client';

import { Button } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/config/providers/MessageProvider';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { openMessage } = useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        openMessage({ title: 'Invalid credentials.', type: 'error' });
        return;
      }
      openMessage({ title: 'Login successful!', type: 'success' });
      window.location = '/';
    } catch {
      openMessage({ title: 'Error on login, try again!', type: 'error' });
    }
  };

  return (
    <div className="flex flex-col items-center mt-[100px] gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                message: 'Invalid email address',
              },
            })}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Type your email..."
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Type your password..."
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
