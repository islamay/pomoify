import { Button } from "./button";

type TaskProps = {
    id: string;
    isDone: boolean;
    taskName: string;
};

function Task({ isDone, taskName }: TaskProps) {
    return (
        <div className="flex items-center gap-2 focus-within:bg-secondary hover:bg-secondary p-2 rounded transition-colors">
            <input type="checkbox" className="peer" defaultChecked={isDone} />
            <input
                type="text"
                className="outline-0 peer-checked:line-through peer-checked:text-secondary-foreground"
                defaultValue={taskName}
            />
        </div>
    );
}

function Todo() {
    return (
        <section
            aria-label="Todo list section"
            className="max-w-xl min-[36rem]:px-0 min-[36rem]:mx-auto mt-8 px-8"
        >
            <div className="flex justify-between items-center">
                <h3 className="font-semibold">Tasks</h3>
            </div>

            <div className="flex gap-2 mt-4">
                <input
                    placeholder="New task..."
                    className="border border-input h-9 grow rounded p-2 focus:outline-0"
                />
                <Button>Add</Button>
            </div>

            <div className="mt-4 flex flex-col gap-4">
                <Task id="1" isDone={false} taskName="Cleanup" />
                <Task id="1" isDone={false} taskName="Cleanup" />
                <Task id="1" isDone={false} taskName="Cleanup" />
            </div>
        </section>
    );
}

export { Todo };
