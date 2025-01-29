'use client';

import { Button } from '@headlessui/react';
import { FormEvent, useCallback } from 'react';

export default function Login() {
  const onSubmitForm = useCallback((e: FormEvent) => {
    console.log(e);
  }, []);

  return (
    <div className="flex flex-col items-center mt-[100px] gap-4">
      <form onSubmit={onSubmitForm} className="flex flex-col gap-4">
        <div>
          <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Login
          </label>
          <input
            type="text"
            id="login"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type your login..."
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Login
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type your login..."
            required
          />
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
