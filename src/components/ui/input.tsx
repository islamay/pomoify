interface InputProps extends React.HTMLProps<HTMLInputElement> {}
function Input({ className, ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`border border-input h-9 rounded p-2 focus:outline-0 ${className}`}
        />
    );
}

export { Input };
