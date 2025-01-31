import { Todo } from '@/entities/types/Todo';
import { Dialog } from '@headlessui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMessage } from '@/config/providers/MessageProvider';

interface FormData {
  title: string;
  description?: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  todo?: Todo;
  updateList: () => void;
}

export function EditTodoModal({ isOpen, setIsOpen, todo, updateList }: Props) {
  const [loading, setLoading] = useState(false);
  const { openMessage } = useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const url = todo?.id ? `/api/todo/${todo.id}` : '/api/todo';
      const response = await fetch(url, {
        method: todo?.id ? 'PUT' : 'POST',
        body: JSON.stringify(todo?.id ? { ...todo, ...data } : data),
        credentials: 'same-origin',
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      } else {
        openMessage({ title: todo?.id ? 'Todo updated successfully' : 'Todo created successfully', type: 'success' });
        updateList();
      }
    } catch (error) {
      openMessage({ title: (error as Error).message, type: 'warning' });
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const closeModal = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onClose={closeModal}>
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
                defaultValue={todo?.title ?? ''}
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
                defaultValue={todo?.description ?? ''}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
