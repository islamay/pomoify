import React from "react";
import { Navbar } from "./components/navbar";
import { Pomodoro } from "./components/pomodoro";
import { PomodoroProvider } from "./components/provider/pomodoro-provider";

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <PomodoroProvider>
                <Pomodoro />
            </PomodoroProvider>
        </React.Fragment>
    );
}

export default App;
