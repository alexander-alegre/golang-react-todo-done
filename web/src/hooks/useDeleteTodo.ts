"use client";

import useSWRMutation from "swr/mutation";
import { Todo } from "../types/todo";

const key = "/api/todo";

type Args = {
  arg: {
    todoId: number;
  };
};

async function deleteTodo(url: string, args: Args): Promise<Todo[]> {
  const { todoId } = args.arg;

  const options = {
    method: "DELETE",
    body: JSON.stringify({
      todoId,
    }),
  };

  return (await fetch(url, options)).json();
}

export function useDeleteTodo() {
  return useSWRMutation(key, deleteTodo);
}
