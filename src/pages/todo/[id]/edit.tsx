import { Button } from "@/components/button";
import { Input } from "@/components/input/input";
import { InputGroup } from "@/components/input/input-group";
import { Todo, useTodo } from "@/providers/todo";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export type FormState = Omit<Todo, "id">;

type ErrorField = Partial<Record<keyof FormState, string>>;

const defaultValue = {
  title: "",
  description: "",
};

const EditTodoPage = () => {
  const router = useRouter();
  const { updateTodo, getTodoById } = useTodo();
  const [currentTodo, setCurrentTodo] = useState<Todo>();
  const [formState, setFormState] = useState<FormState>(defaultValue);

  const [errorFields, setErrorFields] = useState<ErrorField>({});

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      const todo = getTodoById(id as string);
      if (todo) {
        setCurrentTodo(todo);
        setFormState({
          title: todo?.title,
          description: todo?.description,
        });
      }
    }
  }, [router.query, router.isReady, getTodoById]);

  const getErrorMessage = (key: keyof FormState) =>
    errorFields[key as keyof FormState];

  const handleInputChange =
    (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: e.target.value,
      }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateTodo(
      currentTodo?.id as string,
      formState.title,
      formState.description
    );
    router.replace("/todo");
  };

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        <InputGroup label="Title">
          <div className="w-full min-w-80">
            <Input
              name="title"
              placeholder="Input title"
              type="text"
              value={formState.title}
              onChange={handleInputChange("title")}
              errorMessage={getErrorMessage("title")}
            />
          </div>
        </InputGroup>
        <InputGroup label="Description">
          <div className="w-full min-w-80">
            <Input
              name="description"
              placeholder="Input description"
              type="text"
              value={formState.description}
              onChange={handleInputChange("description")}
              errorMessage={getErrorMessage("description")}
            />
          </div>
        </InputGroup>
        <Button variant="fill" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditTodoPage;
