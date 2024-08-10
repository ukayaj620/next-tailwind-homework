import React, { createContext, useContext, useState } from "react";

export type Todo = {
  id: string;
  title: string;
  description: string;
};

type TodoContextProps = {
  todos: Todo[];
  addTodo: (title: string, description: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, title: string, description: string) => void;
  getTodoById: (id: string) => Todo | undefined;
};

// Create the context
const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodo = (): TodoContextProps => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoContextProvider");
  }
  return context;
};

export const TodoContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
    };
    setTodos([...todos, newTodo]);
  };

  // Function to remove a todo
  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to update a todo
  const updateTodo = (id: string, title: string, description: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
  };

  const getTodoById = (id: string): Todo | undefined => {
    return todos.find((todo) => todo.id === id);
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, removeTodo, updateTodo, getTodoById }}
    >
      {children}
    </TodoContext.Provider>
  );
};
