import clsx from "clsx";
import { Button } from "./button";
import { Checkbox } from "./ui/checkbox";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Todo as TodoPrimitive, useTodo } from "./provider/todo-provider";
import { CheckCheck, Ellipsis, Minus, Trash } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

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
    const { todos, addTodo, clearCompletedTodos, clearTodos } = useTodo();
    const [newTodo, setNewTodo] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);

    const todoFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addTodo(newTodo);
        setNewTodo("");
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [todos]);

    return (
        <section
            aria-label="Todo list section"
            className="max-w-xl min-[36rem]:px-0 min-[36rem]:mx-auto mt-8 px-8"
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Tasks</h3>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Ellipsis size={16} strokeWidth={1} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-1 w-max flex flex-col">
                        <PopoverClose asChild>
                            <Button
                                className="justify-start gap-4"
                                variant="ghost"
                                onClick={clearCompletedTodos}
                            >
                                <CheckCheck size={16} strokeWidth={1} />
                                Clear completed task
                            </Button>
                        </PopoverClose>
                        <PopoverClose asChild>
                            <Button
                                className="justify-start gap-4"
                                variant="ghost"
                                onClick={clearTodos}
                            >
                                <Trash size={16} strokeWidth={1} />
                                Clear all task
                            </Button>
                        </PopoverClose>
                    </PopoverContent>
                </Popover>
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
                <div ref={bottomRef} />
            </div>
        </section>
    );
}

export { Todo };
