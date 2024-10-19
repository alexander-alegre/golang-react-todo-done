import { useState } from "react";

export default function CreateTodoForm() {
  const [todo, setTodo] = useState("");

  const handleCreateTodo = () => {
    console.log("todo:", todo);
  };

  return (
    <div className="mx-auto w-1/2">
      <p className="text-center text-xl mb-2">Create Todo</p>
      <input
        type="text"
        placeholder="Do the dishes"
        className="input input-bordered w-full"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-xs sm:btn-sm md:btn-md mt-4"
        onClick={handleCreateTodo}
      >
        Create
      </button>
    </div>
  );
}
