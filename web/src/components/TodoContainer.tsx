import { useState, useEffect } from "react";
import EditTodo from "./EditTodo";
import { Todo } from "../types/todo";
import { useFetchTodos } from "../hooks/useFetchTodos";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";

export default function TodoContainer() {
  const todos = useFetchTodos();
  const { trigger: deleteTodo } = useDeleteTodo();
  const { trigger: updateTodo } = useUpdateTodo();
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

  const onDeleteClick = async (id: number) => {
    await deleteTodo({ todoId: id });
  };

  const onCompleteClick = async (todo: Todo) => {
    await updateTodo({
      done: !todo.done,
      task: todo.task,
      todoId: todo.ID,
    });
  };

  return (
    <div className="w-1/2 mx-auto">
      {activeTodo ? <EditTodo todo={activeTodo} onClose={onEditClose} /> : null}

      {todos.isLoading || todos.isValidating ? (
        <div className="text-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <fieldset className="border-b border-t border-gray-200">
          <legend className="sr-only">Todos</legend>
          {todos.data?.map((todo: Todo) => (
            <div className="divide-y divide-gray-200" key={todo.ID}>
              <div className="relative flex items-start pb-4 pt-3.5">
                <div className="min-w-0 flex-1 text-sm leading-6">
                  <label
                    htmlFor="todo"
                    className={`font-medium text-gray-200 ${
                      todo.done ? "line-through" : ""
                    }`}
                  >
                    {todo.task}
                  </label>

                  {!todo.done && (
                    <button onClick={() => onEditClick(todo)}>
                      <i className="fa-solid fa-pen ml-4 hover:cursor-pointer hover:text-blue-500"></i>
                    </button>
                  )}

                  <p id="todo-description" className="text-gray-500">
                    {new Date(todo.created_at).toDateString()}
                  </p>
                </div>
                <div className="ml-3 flex h-6 items-center flex-col">
                  <input
                    id="todo"
                    name="todo"
                    type="checkbox"
                    aria-describedby="todo-description"
                    className="h-4 w-4 rounded"
                    onChange={() => onCompleteClick(todo)}
                    checked={todo.done}
                  />
                  <button
                    onClick={() => onDeleteClick(todo.ID)}
                    className="btn btn-xs btn-circle btn-outline mt-3 hover:bg-red-500 hover:text-white"
                  >
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
      )}
    </div>
  );
}
