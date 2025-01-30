'use client';

import { Button, Dialog } from '@headlessui/react';
import { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormData {
  title: string;
  description?: string;
}

export function CreateButton(props: {}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const closeModal = () => setIsOpen(false);
  const onClickCreate = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    closeModal();
  };

  return (
    <>
      <Button
        onClick={onClickCreate}
        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Create
      </Button>
      <Dialog open={isOpen} onClose={closeModal}>
        {/*<Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>*/}
        <div className="fixed inset-0 bg-black opacity-30" onClick={closeModal}></div>

        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
            <Dialog.Title className="text-xl font-bold">Create New Item</Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Submit
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
