'use client';

import { Button } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/config/providers/MessageProvider';

interface FormData {
  email: string;
  password: string;
  repeat: string;
}

export default function Register() {
  const router = useRouter();
  const { openMessage } = useMessage();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.repeat) {
      openMessage({ title: 'Passwords do not match', type: 'warning' });
      return;
    }

    try {
      const res = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!res.ok) {
        openMessage({ title: 'User exists', type: 'warning' });
        return;
      }

      openMessage({ title: 'You have registered successfully!', type: 'success' });
      router.push('/login');
    } catch {
      openMessage({ title: 'Error on register, try again!', type: 'error' });
    }
  };

  console.log(errors);

  return (
    <div className="flex flex-col items-center mt-[100px] gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Login
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
            placeholder="Type your login..."
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min length of password is 6' },
            })}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Type your password..."
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="repeat" className="block mb-2 text-sm font-medium text-gray-900">
            Repeat password
          </label>
          <input
            {...register('repeat', { required: 'Please confirm your password' })}
            type="password"
            id="repeat"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Repeat password..."
          />
          {errors.repeat && <p className="text-red-500 text-sm">{errors.repeat.message}</p>}
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
