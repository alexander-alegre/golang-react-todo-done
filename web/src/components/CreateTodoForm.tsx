import { useState } from "react";
import { useCreateTodo } from "../hooks/useCreateTodo";

export default function CreateTodoForm() {
  const { trigger: createTodo } = useCreateTodo();
  const [todo, setTodo] = useState("");
  const [laoding, setLoading] = useState(false);

  const handleCreateTodo = async () => {
    setLoading(true);
    await createTodo({ task: todo });
    setTodo("");
    setLoading(false);
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
        className={`btn btn-xs sm:btn-sm md:btn-md mt-4 text-center ${
          laoding ? "loading" : ""
        }`}
        onClick={handleCreateTodo}
      >
        Create
      </button>
    </div>
  );
}
