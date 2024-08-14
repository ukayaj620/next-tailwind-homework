import { Button } from "@/components/button";
import { Todo, useTodo } from "@/providers/todo";
import Link from "next/link";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const { removeTodo } = useTodo();

  return (
    <div className="border rounded-lg w-full p-4 flex flex-col items-center">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-2xl font-semibold w-full">{todo.title}</h2>
        <div className="flex items-center gap-x-3">
          <Link href={`/todo/${todo.id}/edit`}>
            <Button variant="fill">Edit</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              if (confirm("Are you sure to remove this todo?")) {
                removeTodo(todo.id);
              }
            }}
          >
            Remove
          </Button>
        </div>
      </div>

      <p className="text-base w-full">{todo.description}</p>
    </div>
  );
};

const TodoListPage = () => {
  const { todos } = useTodo();

  console.log(todos);

  return (
    <div className="w-screen items-center flex flex-col gap-y-6 my-4">
      <div className="max-w-xl w-full flex">
        <Link href="/todo/create" className="ml-auto">
          <Button variant="fill">Create</Button>
        </Link>
      </div>
      <div className="max-w-xl flex flex-col w-full  gap-y-4">
        {todos.map((todo) => {
          return <TodoItem key={`todo-${todo.id}`} todo={todo} />;
        })}
      </div>
    </div>
  );
};

export default TodoListPage;
