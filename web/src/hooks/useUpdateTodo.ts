"use client";

import useSWRMutation from "swr/mutation";
import { Todo } from "../types/todo";

const key = "/api/todo";

type Args = {
  arg: {
    todoId: number;
    task: string;
    done: boolean;
  };
};

async function updateTodo(url: string, args: Args): Promise<Todo[]> {
  const { todoId, task, done } = args.arg;

  const options = {
    method: "PUT",
    body: JSON.stringify({
      todoId,
      task,
      done,
    }),
  };

  return (await fetch(url, options)).json();
}

export function useUpdateTodo() {
  return useSWRMutation(key, updateTodo);
}
