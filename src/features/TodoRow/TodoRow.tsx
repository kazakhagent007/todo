'use client';

import { Todo } from '@/entities/types/Todo';
import dayjs from 'dayjs';

async function completeTodo(todo: Todo) {
  const res = await fetch(`/api/todo/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...todo, completed: true }),
    credentials: 'same-origin',
  });

  if (!res.ok) {
    console.error('Failed to complete todo', res.status);
  }
}

interface Props {
  todo: Todo;
  index: number;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export function TodoRow({ todo, index, onClickEdit, onClickDelete }: Props) {
  return (
    <>
      <tr className="bg-white border-b border-gray-200">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{todo.title}</td>
        <td className="px-6 py-4">{todo.description}</td>
        <td className="px-6 py-4">{dayjs(todo.createdAt).format('DD.MM.YYYY')}</td>
        <td className="px-6 py-4">{todo.done ? '✅' : '❌'}</td>
        <td className="px-6 py-4 flex gap-2">
          <button className="text-blue-600 hover:underline" onClick={onClickEdit}>
            Edit
          </button>
          <button className="text-green-600 hover:underline" onClick={() => completeTodo(todo)}>
            Complete
          </button>
          <button className="text-red-600 hover:underline" onClick={onClickDelete}>
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
