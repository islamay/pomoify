import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "flex items-center justify-center rounded cursor-pointer transition-colors",
    {
        variants: {
            variant: {
                default:
                    "font-semibold bg-primary text-primary-foreground hover:bg-primary/90",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/90",
                ghost: "bg-transparent hover:bg-accent/90",
            },
            size: {
                default: "h-9 px-4 py-2",
                large: "h-9 px-8",
                icon: "w-9 h-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

function Button({ asChild, variant, size, className, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button };
