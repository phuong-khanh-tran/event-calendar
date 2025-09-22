import classNames from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
    const { error, className, ...rest } = props;

    return (
        <input
            ref={ref}
            className={classNames(
                "bg-white text-ink-500 border rounded px-1 py-0.5 font-normal text-base max-h-12 placeholder:text-ink-200 disabled:border-ink-100 disabled:text-disable disabled:bg-bg-disable",
                className
            )}
            {...rest}
        />
    );
});

Input.displayName = "Input";
