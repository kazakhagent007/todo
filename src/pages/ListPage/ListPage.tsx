'use client';

import { Todo } from '@/entities/types/Todo';
import { TodoRow } from '@/features/TodoRow/TodoRow';
import { EditTodoModal } from '@/entities/EditTodoModal';
import { DeleteTodoConfirmation } from '@/entities/DeleteTodoConfirmation';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@headlessui/react';

export default function ListPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>();
  const [todos, setTodos] = useState<Todo[]>([]);

  async function getTodos(): Promise<Todo[]> {
    const res = await fetch(`/api/todo`, {
      credentials: 'same-origin',
    });
    if (!res.ok) {
      console.error('Failed to fetch todos', res.status);
      throw new Error('Failed to fetch todos');
    }
    const tt = (await res.json()) as Todo[];
    console.log(tt);
    setTodos(tt);
  }

  async function onCompleteTodo(todo: Todo) {
    const res = await fetch(`/api/todo/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...todo, completed: true }),
      credentials: 'same-origin',
    });

    if (!res.ok) {
      console.error('Failed to complete todo', res.status);
    } else {
      updateList();
    }
  }

  const onClickEdit = useCallback((todo: Todo) => {
    setCurrentTodo(todo);
    setIsEditOpen(true);
  }, []);

  const onClickDelete = useCallback((todo: Todo) => {
    setCurrentTodo(todo);
    setIsDeleteOpen(true);
  }, []);

  const onClickCreate = useCallback(() => {
    setCurrentTodo(undefined);
    setIsEditOpen(true);
  }, []);

  const updateList = () => {
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="flex flex-col items-center mt-[100px] gap-4">
      <div className="relative overflow-x-auto">
        <div className="flex justify-end mb-6">
          <Button
            onClick={onClickCreate}
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Create
          </Button>
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
                Completed
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
                completeTodo={() => onCompleteTodo(todo)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {isEditOpen && (
        <EditTodoModal isOpen={isEditOpen} setIsOpen={setIsEditOpen} todo={currentTodo} updateList={updateList} />
      )}

      {currentTodo && (
        <DeleteTodoConfirmation
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          todoId={currentTodo.id}
          updateList={updateList}
        />
      )}
    </div>
  );
}
