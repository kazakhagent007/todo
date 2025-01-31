import { Todo } from '@/entities/types/Todo';
import { Dialog } from '@headlessui/react';

export function EditTodoModal({
  isOpen,
  setIsOpen,
  todo,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  todo: Todo;
}) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <Dialog.Title className="text-lg font-bold">Edit Todo</Dialog.Title>
        <input type="text" className="border w-full p-2 mt-2" defaultValue={todo.title} />
        <textarea className="border w-full p-2 mt-2" defaultValue={todo.description}></textarea>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </Dialog>
  );
}
