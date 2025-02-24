import { Dialog } from '@headlessui/react';
import { useMessage } from '@/config/providers/MessageProvider';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  todoId: string;
  updateList: () => void;
}

export function DeleteTodoConfirmation({ isOpen, setIsOpen, todoId, updateList }: Props) {
  const { openMessage } = useMessage();
  async function deleteTodo(id: string) {
    const res = await fetch(`/api/todo/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error('Failed to delete todo', res.status);
    } else {
      openMessage({ title: 'Your record is deleted', type: 'success' });
      updateList();
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsOpen(false)}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
          <Dialog.Title className="text-lg font-bold">Delete Todo</Dialog.Title>
          <p className="mt-2">Are you sure you want to delete this todo?</p>
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => {
                deleteTodo(todoId);
                setIsOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
