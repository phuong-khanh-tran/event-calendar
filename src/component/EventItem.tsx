import { Labrada } from "next/font/google";
import { FC, HTMLAttributes } from "react";

interface EventItem {
    id: string;
    title: string;
    date: string; // dd/MM/yyyy
}

interface EventItemProps extends HTMLAttributes<HTMLDivElement> {
    item: EventItem;
    onDelete: (event: EventItem) => void;
}

const EventItem: FC<EventItemProps> = (props) => {
    const { item, onDelete, ...rest } = props;

    return (
        <div className="p-1 bg-blue-500 text-white flex items-center justify-between">
            <div className="text-xs font-semibold">{item.title}</div>
            <div onClick={() => onDelete(item)}>
                <img src="./icons/close-white.svg" width={12} height={12} />
            </div>
        </div>
    );
};

export default EventItem;
