"use client";

import useSWR from "swr";
import { Todo } from "../types/todo";

const key = "/api/todo";

async function fetchTodos(url: string): Promise<Todo[]> {
  return (await fetch(url)).json();
}

export function useFetchTodos() {
  return useSWR(key, fetchTodos);
}
