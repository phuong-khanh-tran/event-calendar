import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

export const ErrorText: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const { className, ...rest } = props;
    return <div className={classNames("text-red-500", className)} {...rest} />;
};
