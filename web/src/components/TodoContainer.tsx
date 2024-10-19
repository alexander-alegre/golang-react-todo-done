import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import { Todo } from "../types/todo";

const todos: Todo[] = [
  { id: 1, todo: "Do the dishes" },
  { id: 2, todo: "Walk the dog" },
  { id: 3, todo: "Wash the car" },
];

export default function TodoContainer() {
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (activeTodo) {
      const modal = document.getElementById(
        "edit-todo-modal"
      ) as HTMLDialogElement;
      modal?.showModal();
    }
  }, [activeTodo]);

  const onEditClick = (todo: Todo) => {
    setActiveTodo(todo);
  };

  const onEditClose = () => {
    setActiveTodo(null);
  };

  return (
    <div className="w-1/2 mx-auto">
      {activeTodo ? <EditTodo todo={activeTodo} onClose={onEditClose} /> : null}
      <fieldset className="border-b border-t border-gray-200">
        <legend className="sr-only">Todos</legend>
        {todos.map((todo: Todo) => (
          <div className="divide-y divide-gray-200" key={todo.id}>
            <div className="relative flex items-start pb-4 pt-3.5">
              <div className="min-w-0 flex-1 text-sm leading-6">
                <label htmlFor="comments" className="font-medium text-gray-200">
                  {todo.todo}
                </label>

                <button onClick={() => onEditClick(todo)}>
                  <i className="fa-solid fa-pen ml-4 hover:cursor-pointer hover:text-blue-500"></i>
                </button>

                <p id="comments-description" className="text-gray-500">
                  The description
                </p>
              </div>
              <div className="ml-3 flex h-6 items-center flex-col">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  aria-describedby="comments-description"
                  className="h-4 w-4 rounded"
                />
                <button className="btn btn-xs btn-circle btn-outline mt-3 hover:bg-red-500 hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
