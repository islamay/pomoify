interface InputProps extends React.HTMLProps<HTMLInputElement> {}

function Input({ ...props }: InputProps) {
    return <input {...props} />;
}

export { Input };
