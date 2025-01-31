'use client';

import { Todo } from '@/entities/types/Todo';
import dayjs from 'dayjs';

interface Props {
  todo: Todo;
  index: number;
  onClickEdit: () => void;
  onClickDelete: () => void;
  completeTodo: () => void;
}

export function TodoRow({ todo, index, onClickEdit, onClickDelete, completeTodo }: Props) {
  return (
    <>
      <tr className="bg-white border-b border-gray-200">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{todo.title}</td>
        <td className="px-6 py-4">{todo.description}</td>
        <td className="px-6 py-4">{dayjs(todo.createdAt).format('DD.MM.YYYY hh:mm')}</td>
        <td className="px-6 py-4">{todo.completed ? '✅' : '❌'}</td>
        <td className="px-6 py-4 flex gap-2">
          <button className="text-red-600 hover:underline" onClick={onClickDelete}>
            Delete
          </button>

          {!todo.completed && (
            <button className="text-blue-600 hover:underline" onClick={onClickEdit}>
              Edit
            </button>
          )}

          {!todo.completed && (
            <button className="text-green-600 hover:underline" onClick={completeTodo}>
              Complete
            </button>
          )}
        </td>
      </tr>
    </>
  );
}
