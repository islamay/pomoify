import React, {
    createContext,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

type Phase = "focus" | "break" | "long-break";

const FOCUS_DURATION = 1;
const BREAK_DURATION = 1;
const LONG_BREAK_DURATION = 1;
const LONG_BREAK_AFTER = 4;

type PomodoroContext = {
    phase: Phase;
    isRunning: boolean;
    isDone: boolean;
    showNotification: boolean;
    focusCounter: number;
    duration: {
        minutes: string;
        seconds: string;
    };
    setPhase: React.Dispatch<SetStateAction<Phase>>;
    setIsRunning: React.Dispatch<SetStateAction<boolean>>;
    setShowNotification: React.Dispatch<SetStateAction<boolean>>;
};

const PomodoroContext = createContext<PomodoroContext>({
    phase: "focus",
    isRunning: false,
    isDone: false,
    showNotification: false,
    focusCounter: 0,
    duration: {
        minutes: "25",
        seconds: "00",
    },
    setPhase() {},
    setIsRunning() {},
    setShowNotification() {},
});

type PomodoroProviderProps = {
    children: React.ReactNode;
};

function shouldBeLongBreak(currentPhase: Phase, focusCounter: number) {
    if (currentPhase === "focus" && focusCounter % LONG_BREAK_AFTER === 0) {
        return true;
    } else return false;
}

function PomodoroProvider({ children }: PomodoroProviderProps) {
    const [phase, setPhase] = useState<Phase>("focus");
    const [isRunning, setIsRunning] = useState(false);
    const initialDuration = useMemo(() => {
        if (phase === "focus") return FOCUS_DURATION;
        else if (phase === "break") return BREAK_DURATION;
        else return LONG_BREAK_DURATION;
    }, [phase]);

    const [duration, setDuration] = useState(initialDuration);
    const [isDone, setIsDone] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [focusCounter, setFocusCounter] = useState(0);

    const { minutes, seconds } = useMemo(() => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration - minutes * 60;

        const stringifyMinutes =
            minutes < 10 ? "0" + minutes.toString() : minutes.toString();
        const stringifySeconds =
            seconds < 10 ? "0" + seconds.toString() : seconds.toString();

        return {
            minutes: stringifyMinutes,
            seconds: stringifySeconds,
        };
    }, [duration]);

    function nextPhase() {
        setPhase((prev) => {
            if (prev === "focus") {
                const updatedFocusCounter = focusCounter + 1;
                setFocusCounter(updatedFocusCounter);
                if (shouldBeLongBreak(prev, updatedFocusCounter))
                    return "long-break";
                else return "break";
            } else return "focus";
        });
    }

    function resetTimer() {
        setIsRunning(false);
        setIsDone(false);
        setDuration(initialDuration);
    }

    useEffect(() => {
        resetTimer();
    }, [phase]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (duration === 0) {
            nextPhase();
        }

        if (isRunning && duration !== 0) {
            interval = setInterval(() => {
                setDuration((prev) => prev - 1);
                clearInterval(interval);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isRunning, duration]);

    return (
        <PomodoroContext.Provider
            value={{
                phase,
                isRunning,
                isDone,
                showNotification,
                focusCounter,
                duration: { minutes, seconds },
                setPhase,
                setIsRunning,
                setShowNotification,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    );
}

function usePomodoro() {
    return useContext(PomodoroContext);
}

export { PomodoroProvider, usePomodoro };
