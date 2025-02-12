import React from "react";
import { Navbar } from "./components/navbar";
import { Pomodoro } from "./components/pomodoro";

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <Pomodoro />
        </React.Fragment>
    );
}

export default App;
