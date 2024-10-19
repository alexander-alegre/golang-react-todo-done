import { useState } from "react";
import { Todo } from "../types/todo";
import { useEscKey } from "../hooks/useEscape";

interface IProps {
  todo: Todo;
  onClose: () => void;
}

export default function EditTodo(props: IProps) {
  const [task, setTask] = useState(props.todo ? props.todo.todo : "");

  useEscKey(props.onClose);

  const handleUpdateTodo = () => {
    console.log("updated todo:", task);
  };

  return (
    <dialog id="edit-todo-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Todo</h3>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Do the dishes"
            className="input input-bordered w-full"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-xs sm:btn-sm md:btn-md mt-4"
            onClick={handleUpdateTodo}
          >
            Update
          </button>
        </div>

        <div className="modal-action">
          <form method="dialog" onBlur={() => console.log("submit")}>
            <button
              type="button"
              className="btn"
              onClick={() => props.onClose()}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
