import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { children, className, disabled, ...rest } = props;

    return (
        <button
            className={classNames(
                "cursor-pointer border rounded-sm transition-colors px-1 py-0.5",
                { "text-gray-400 cursor-not-allowed border-gray-400 bg-white": disabled },
                className
            )}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
