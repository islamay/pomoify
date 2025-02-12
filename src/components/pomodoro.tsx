import { RotateCcw, SkipForward } from "lucide-react";
import { Button } from "./button";
import clsx from "clsx";
import { usePomodoro } from "./provider/pomodoro-provider";

type PhaseProps = {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
};

function Phase({ children, isActive, onClick }: PhaseProps) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "h-8 content-center rounded cursor-pointer transition-colors",
                {
                    "bg-black font-semibold ": isActive,
                    "text-secondary-foreground hover:bg-current/10": !isActive,
                }
            )}
        >
            {children}
        </button>
    );
}

interface PhasesProps extends React.HTMLProps<HTMLDivElement> {}

function Phases({ className, ...props }: PhasesProps) {
    const { phase, setPhase, focusCounter } = usePomodoro();

    return (
        <div
            {...props}
            className={`grid grid-cols-3 gap-1 px-1 py-1 bg-secondary rounded ${className}`}
        >
            <Phase
                isActive={phase === "focus"}
                onClick={() => setPhase("focus")}
            >
                Focus
            </Phase>
            <Phase
                isActive={phase === "break"}
                onClick={() => setPhase("break")}
            >
                Break
            </Phase>
            <Phase
                isActive={phase === "long-break"}
                onClick={() => setPhase("long-break")}
            >
                Long Break
            </Phase>
        </div>
    );
}

function Pomodoro() {
    const { duration, isRunning, focusCounter, setIsRunning } = usePomodoro();

    return (
        <section
            aria-label="Pomodoro timer section"
            className="max-w-xl min-[36rem]:px-0 min-[36rem]:mx-auto mt-8 px-8"
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Phase</h3>
            </div>

            <Phases className="mt-2" />

            <h1 className="mt-8 text-[4rem] text-center font-mono font-medium">
                {duration.minutes}:{duration.seconds}
            </h1>

            <div
                aria-label="Timer control"
                className="mt-8 flex items-center justify-center gap-4"
            >
                <Button variant="ghost" size="icon">
                    <RotateCcw size={16} strokeWidth={1} />
                </Button>
                <Button
                    size="large"
                    variant={isRunning ? "secondary" : "default"}
                    onClick={() => setIsRunning((prev) => !prev)}
                >
                    {isRunning ? "Pause" : "Start"}
                </Button>
                <Button variant="ghost" size="icon">
                    <SkipForward size={16} strokeWidth={1} />
                </Button>
            </div>

            <p className="mt-4 text-center text-sm text-secondary-foreground">
                You have focused {focusCounter} time
            </p>
        </section>
    );
}

export { Pomodoro };
