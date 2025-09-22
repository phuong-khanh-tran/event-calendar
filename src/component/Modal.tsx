import classNames from "classnames";
import { FC, HTMLAttributes } from "react";

export interface IModalProps extends HTMLAttributes<HTMLDivElement> {
    onClose?: () => void;
}
const Modal: FC<IModalProps> = (props) => {
    const { children, className, onClose, ...rest } = props;

    return (
        <div className="fixed inset-0 bg-[#767f8580]/50 overflow-hidden flex items-center justify-center">
            <div className={classNames("bg-white rounded-xl relative p-4", className)} {...rest}>
                <div className="absolute cursor-pointer top-4 right-4" onClick={onClose}>
                    <img src={"./icons/close.svg"} width={24} height={24} />
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
