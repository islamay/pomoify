import React from "react";
import { Navbar } from "./components/navbar";
import { Pomodoro } from "./components/pomodoro";
import { PomodoroProvider } from "./components/provider/pomodoro-provider";
import { Todo } from "./components/todo";
import { TodoProvider } from "./components/provider/todo-provider";

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <PomodoroProvider>
                <Pomodoro />
            </PomodoroProvider>
            <TodoProvider>
                <Todo />
            </TodoProvider>
        </React.Fragment>
    );
}

export default App;
