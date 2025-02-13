import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

type Todo = {
    id: string;
    name: string;
    isDone: boolean;
};

type TodoContext = {
    todos: Todo[];
    addTodo: (name: string) => void;
    deleteTodo: (id: string) => void;
};

const TodoContext = createContext<TodoContext>({
    todos: [],
    addTodo() {},
    deleteTodo() {},
});

type TodoProviderProps = {
    children: React.ReactNode;
};

function TodoProvider({ children }: TodoProviderProps) {
    const [todos, setTodos] = useState<Todo[]>([]);

    function addTodo(name: string) {
        const newTodo: Todo = {
            id: v4(),
            name,
            isDone: false,
        };

        setTodos([...todos, newTodo]);
    }

    function deleteTodo(id: string) {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

function useTodo() {
    return useContext(TodoContext);
}

export { TodoProvider, useTodo };
export type { Todo };
