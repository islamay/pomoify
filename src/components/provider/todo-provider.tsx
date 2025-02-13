import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { z } from "zod";

const todoSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    isDone: z.boolean(),
});

type Todo = z.infer<typeof todoSchema>;

type TodoContext = {
    todos: Todo[];
    addTodo: (name: string) => void;
    updateTodo: (id: string, newTodo: Todo) => void;
    deleteTodo: (id: string) => void;
};

const TodoContext = createContext<TodoContext>({
    todos: [],
    addTodo() {},
    updateTodo() {},
    deleteTodo() {},
});

type TodoProviderProps = {
    children: React.ReactNode;
};

const TODO_ADDRESS = "todos";

function getTodosFromLocalStorage(): Todo[] {
    const todos = localStorage.getItem(TODO_ADDRESS);
    if (!todos) return [];

    try {
        const parsed = JSON.parse(todos);
        return z.array(todoSchema).parse(parsed);
    } catch (error) {
        return [];
    }
}

function saveTodosToLocalStorage(todos: Todo[]) {
    const stringifyTodos = JSON.stringify(todos);
    localStorage.setItem(TODO_ADDRESS, stringifyTodos);
}

function TodoProvider({ children }: TodoProviderProps) {
    const [todos, setTodos] = useState<Todo[]>(getTodosFromLocalStorage());

    function addTodo(name: string) {
        const newTodo: Todo = {
            id: v4(),
            name,
            isDone: false,
        };

        setTodos([...todos, newTodo]);
    }

    function updateTodo(id: string, newTodo: Todo) {
        const targetedTodoIndex = todos.findIndex((todo) => todo.id === id);
        if (targetedTodoIndex === -1) return;

        const todosDuplicate = new Array(...todos);
        todosDuplicate[targetedTodoIndex] = newTodo;
        setTodos(todosDuplicate);
    }

    function deleteTodo(id: string) {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
    }

    useEffect(() => {
        saveTodosToLocalStorage(todos);
    }, [todos]);

    return (
        <TodoContext.Provider
            value={{ todos, addTodo, updateTodo, deleteTodo }}
        >
            {children}
        </TodoContext.Provider>
    );
}

function useTodo() {
    return useContext(TodoContext);
}

export { TodoProvider, useTodo };
export type { Todo };
