import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePomodoro } from "../provider/pomodoro-provider";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../button";
import { DialogClose, DialogFooter } from "../ui/dialog";

const formSchema = z.object({
    focus: z.coerce.number().min(1).max(60),
    break: z.coerce.number().min(1).max(60),
    longBreak: z.coerce.number().min(1).max(60),
    longBreakInterval: z.coerce.number().min(1),
});

function PomodoroSettingForm() {
    const { settings, setSettings } = usePomodoro();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            focus: settings.focus,
            break: settings.break,
            longBreak: settings.longBreak,
            longBreakInterval: settings.longBreakInterval,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setSettings(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="focus"
                        render={({ field }) => {
                            return (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel className="font-semibold">
                                        Focus
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name="break"
                        render={({ field }) => {
                            return (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel className="font-semibold">
                                        Break
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name="longBreak"
                        render={({ field }) => {
                            return (
                                <FormItem className="flex flex-col gap-2">
                                    <FormLabel className="font-semibold">
                                        Long Break
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    ></FormField>
                </div>
                <FormField
                    control={form.control}
                    name="longBreakInterval"
                    render={({ field }) => {
                        return (
                            <FormItem className="grid grid-cols-3 items-center gap-4 mt-4">
                                <FormLabel className="font-semibold col-span-2">
                                    Long Break Interval
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                ></FormField>

                <div className="mt-8 flex flex-row justify-end gap-4">
                    <DialogClose asChild>
                        <Button type="button" variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit">Save</Button>
                    </DialogClose>
                </div>
            </form>
        </Form>
    );
}

export { PomodoroSettingForm };
