export interface Todo {
  ID: number;
  task: string;
  created_at: string;
  updated_at: string;
  done: boolean;
  deleted: boolean;
  deleted_at: { Time: string; Valid: boolean };
}
