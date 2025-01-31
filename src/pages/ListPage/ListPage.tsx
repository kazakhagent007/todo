'use client';

import { CreateButton } from '@/features/CreateButton/CreateButton';
import { Todo } from '@/entities/types/Todo';
import { TodoRow } from '@/features/TodoRow/TodoRow';
import { EditTodoModal } from '@/entities/EditTodoModal';
import { DeleteTodoConfirmation } from '@/entities/DeleteTodoConfirmation';
import { useCallback, useState } from 'react';

interface Props {
  todos: Todo[];
}

export default function ListPage({ todos }: Props) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>();

  const onClickEdit = useCallback((todo: Todo) => {
    setCurrentTodo(todo);
    setIsEditOpen(true);
  }, []);

  const onClickDelete = useCallback((todo: Todo) => {
    setCurrentTodo(todo);
    setIsDeleteOpen(true);
  }, []);

  return (
    <div className="flex flex-col items-center mt-[100px] gap-4">
      <div className="relative overflow-x-auto">
        <div className="flex justify-end mb-6">
          <CreateButton />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Done
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <TodoRow
                key={todo.id}
                index={index}
                todo={todo}
                onClickEdit={() => onClickEdit(todo)}
                onClickDelete={() => onClickDelete(todo)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {currentTodo && (
        <>
          <EditTodoModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} todo={currentTodo} />

          <DeleteTodoConfirmation isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} todoId={currentTodo.id} />
        </>
      )}
    </div>
  );
}
