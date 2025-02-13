import { RotateCcw, Settings, SkipForward } from "lucide-react";
import { Button } from "./button";
import clsx from "clsx";
import { usePomodoro } from "./provider/pomodoro-provider";
import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";

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
    const { phase, setPhase } = usePomodoro();

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

interface PomodoroDurationInputProps extends React.HTMLProps<HTMLInputElement> {
    id: string;
    label: string;
    unit: string;
}
function PomodoroDurationInput({
    label,
    id,
    unit,
    ...props
}: PomodoroDurationInputProps) {
    return (
        <div className="grid grid-cols-5 items-center gap-4">
            <label className="col-span-2" htmlFor={id}>
                {label}
            </label>
            <div className="grid grid-cols-5 col-span-3 ">
                <Input
                    id={id}
                    type="number"
                    className="col-span-4 rounded-r-none"
                    {...props}
                />
                <div className="bg-secondary content-center px-2 border border-border rounded-r">
                    <p className="text-secondary-foreground text-sm truncate">
                        {unit}
                    </p>
                </div>
            </div>
        </div>
    );
}

function Pomodoro() {
    const {
        duration,
        settings,
        isRunning,
        isDone,
        focusCounter,
        setIsRunning,
        nextPhase,
    } = usePomodoro();

    return (
        <section
            aria-label="Pomodoro timer section"
            className="max-w-xl min-[36rem]:px-0 min-[36rem]:mx-auto mt-8 px-8"
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Phase</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Settings size={16} strokeWidth={1} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Pomodoro settings</DialogTitle>
                            <DialogDescription>
                                Change timer duration and behavior based on your
                                need
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                            <PomodoroDurationInput
                                id="focus-duration-setting"
                                label="Focus duration"
                                defaultValue={settings.focus}
                                unit="Minutes"
                            />
                            <PomodoroDurationInput
                                id="break-duration-setting"
                                label="Break duration"
                                defaultValue={settings.break}
                                unit="Minutes"
                            />
                            <PomodoroDurationInput
                                id="focus-duration-setting"
                                label="Long break duration"
                                defaultValue={settings.longBreak}
                                unit="Minutes"
                            />
                            <PomodoroDurationInput
                                id="long-break-interval-setting"
                                label="Long break after"
                                defaultValue={settings.longBreakInterval}
                                unit="Phase"
                            />

                            <DialogFooter className="flex gap-4 justify-end mt-8">
                                <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button>Save</Button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
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
                {isDone ? (
                    <Button size="large" onClick={nextPhase}>
                        Next Phase
                    </Button>
                ) : (
                    <Button
                        size="large"
                        variant={isRunning ? "secondary" : "default"}
                        onClick={() => setIsRunning((prev) => !prev)}
                    >
                        {isRunning ? "Pause" : "Start"}
                    </Button>
                )}
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
