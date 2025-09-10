import { FC } from "react";
import EventItem from "./EventItem";
import _ from "lodash";

export interface IDateCellProps {
    day: number;
    evenList?: EventItem[];
    onRemoveEvent: (event: EventItem) => void;
}

const DateCell: FC<IDateCellProps> = ({ day, evenList, onRemoveEvent }) => {
    return (
        <div className="flex flex-col gap-2 p-2 border-r border-b border-gray-400">
            <div className="font-bold text-left">{day}</div>
            <div className="flex flex-col gap-1">
                {evenList &&
                    !_.isEmpty(evenList) &&
                    evenList.map((event) => {
                        return <EventItem key={event.id} item={event} onDelete={onRemoveEvent} />;
                    })}
            </div>
        </div>
    );
};

export default DateCell;
