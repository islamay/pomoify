import clsx from "clsx";
import { Button } from "./button";
import { Checkbox } from "./ui/checkbox";
import { ChangeEvent, useState } from "react";
import { Todo as TodoPrimitive, useTodo } from "./provider/todo-provider";
import { Minus } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

interface TaskProps extends TodoPrimitive {}

function Task({ id, isDone, name }: TaskProps) {
    const { deleteTodo, updateTodo } = useTodo();

    function deleteHandler() {
        deleteTodo(id);
    }

    function onTaskNameChange(e: ChangeEvent<HTMLInputElement>) {
        updateTodo(id, {
            id,
            isDone,
            name: e.currentTarget.value,
        });
    }

    function onTaskStatusChange(checked: CheckedState) {
        updateTodo(id, {
            id,
            name,
            isDone: checked === "indeterminate" ? false : checked,
        });
    }

    return (
        <div className="flex items-center gap-2 focus-within:bg-secondary hover:bg-secondary p-2 rounded transition-colors">
            <Checkbox checked={isDone} onCheckedChange={onTaskStatusChange} />
            <input
                type="text"
                onChange={onTaskNameChange}
                className={clsx("outline-0 transition-colors grow", {
                    "text-secondary-foreground line-through": isDone,
                })}
                value={name}
            />
            <Button variant="ghost" size="icon" onClick={deleteHandler}>
                <Minus size={16} strokeWidth={1} />
            </Button>
        </div>
    );
}

function Todo() {
    const { todos, addTodo } = useTodo();
    const [newTodo, setNewTodo] = useState("");

    const todoFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addTodo(newTodo);
        setNewTodo("");
    };

    return (
        <section
            aria-label="Todo list section"
            className="max-w-xl min-[36rem]:px-0 min-[36rem]:mx-auto mt-8 px-8"
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Tasks</h3>
            </div>

            <form className="flex gap-2 mt-4" onSubmit={todoFormHandler}>
                <input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.currentTarget.value)}
                    placeholder="New task..."
                    className="border border-input h-9 grow rounded p-2 focus:outline-0"
                />
                <Button>Add</Button>
            </form>

            <div className="mt-4 flex flex-col gap-4">
                {todos.map((todo) => {
                    return (
                        <Task
                            key={todo.id}
                            id={todo.id}
                            isDone={todo.isDone}
                            name={todo.name}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export { Todo };
