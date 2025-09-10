import { Labrada } from "next/font/google";
import { FC, HTMLAttributes } from "react";

interface EventItem {
    id: string;
    title: string;
    date: string; // yyyy-MM-dd
}

interface EventItemProps extends HTMLAttributes<HTMLDivElement> {
    item: EventItem;
    onDelete: (event: EventItem) => void;
}

const EventItem: FC<EventItemProps> = (props) => {
    const { item, onDelete, ...rest } = props;

    return (
        <div className="p-0.5 bg-blue-600 text-white text-xs flex items-center justify-between">
            <div>{item.title}</div>
            <div onClick={() => onDelete(item)}>
                <img src="./icons/close.svg" width={12} height={12} />
            </div>
        </div>
    );
};

export default EventItem;
