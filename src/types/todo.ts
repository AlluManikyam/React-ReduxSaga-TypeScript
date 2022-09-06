// This imports ok to React app even though its outside of the src directory
export type ITodo = {
  id: number;
  title: string;
  completed: boolean;
};

export type ITodos = {
  todos: ITodo[];
};
