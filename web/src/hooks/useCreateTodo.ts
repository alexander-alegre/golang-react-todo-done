"use client";

import useSWRMutation from "swr/mutation";
import { Todo } from "../types/todo";

const key = "/api/todo";

type Args = {
  arg: {
    task: string;
  };
};

async function createTodo(url: string, args: Args): Promise<Todo[]> {
  const { task } = args.arg;

  const options = {
    method: "POST",
    body: JSON.stringify({
      task,
    }),
  };

  return (await fetch(url, options)).json();
}

export function useCreateTodo() {
  return useSWRMutation(key, createTodo);
}
