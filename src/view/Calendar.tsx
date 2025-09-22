"use client";

import AddEventModal, { TAddEvent } from "@/component/AddEventModal";
import Button from "@/component/Button";
import DateCell from "@/component/DateCell";
import { dateFormatyyyyMMddSlash } from "@/component/DateInput";
import EventItem from "@/component/EventItem";
import { DateTime } from "luxon";
import { FC, ReactElement, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type EventStore = {
    [year: number]: {
        [month: number]: {
            [day: number]: EventItem[];
        };
    };
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar: FC = ({}) => {
    const today = new Date();

    const [currentDate, setCurrentDate] = useState<Date>(today);
    const [events, setEvents] = useState<EventStore>({});
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthName = DateTime.fromJSDate(currentDate).toFormat("LLLL");

    //  day = 1	First day of the specified month
    //  day = 0	Last day of the previous month
    const daysInMonth = useMemo(
        () => new Date(currentYear, currentMonth + 1, 0).getDate(),
        [currentDate, currentMonth, currentYear]
    );
    const firstDayInMonth = useMemo(
        () => new Date(currentYear, currentMonth, 1).getDay(),
        [currentDate, currentMonth, currentYear]
    );

    const addNewEvent = (data: TAddEvent) => {
        const { title, date } = data;

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const formattedDate = DateTime.fromJSDate(date).toFormat(dateFormatyyyyMMddSlash);
        const newEvent: EventItem = {
            id: uuidv4(),
            title: title,
            date: formattedDate,
        };

        setEvents((prev) => {
            const yearData = prev[year] ?? {};
            const monthData = yearData[month] ?? {};
            const dayEvents = monthData[day] ?? [];

            return {
                ...prev,
                [year]: {
                    ...yearData,
                    [month]: {
                        ...monthData,
                        [day]: [...dayEvents, newEvent],
                    },
                },
            };
        });

        setIsOpenModal(false);
    };

    const getDayEvents = (day: number): EventItem[] => {
        const dayEvents = events?.[currentYear]?.[currentMonth]?.[day] || [];
        return dayEvents;
    };

    const onRemoveEvent = (event: EventItem) => {
        const dt = DateTime.fromFormat(event.date, dateFormatyyyyMMddSlash);
        const year = dt.year;
        const month = dt.month - 1; //Luxon DateTime uses 1-based months
        const day = dt.day;

        setEvents((prev) => {
            const hasItem = prev[year]?.[month]?.[day];

            if (!hasItem) return prev;

            return {
                ...prev,
                [year]: {
                    ...prev[year],
                    [month]: {
                        ...prev[year][month],
                        [day]: prev[year][month][day].filter((item) => item.id !== event.id),
                    },
                },
            };
        });
    };

    const renderDaysInMonth = () => {
        const days: ReactElement[] = [];

        for (let i = 0; i < firstDayInMonth; i++) {
            days.push(<div key={`empty-${i}`} className="bg-gray-200 border-r border-b border-gray-400" />);
        }

        for (let day = 0; day <= daysInMonth; day++) {
            const events = getDayEvents(day);

            days.push(<DateCell key={day} day={day} evenList={events} onRemoveEvent={onRemoveEvent} />);
        }
        return days;
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 gap-4">
            <div className="grid grid-cols-[repeat(3,auto)] gap-4 items-center justify-center">
                <Button className="w-fit bg-blue-500 text-white hover:bg-blue-600" onClick={goToPrevMonth}>
                    <img src={"./icons/left-white.svg"} width={20} height={20} />
                </Button>
                <div className="font-bold text-xl">
                    {monthName} {currentYear}
                </div>
                <Button className="w-fit bg-blue-500 text-white hover:bg-blue-600" onClick={goToNextMonth}>
                    <img src={"./icons/right-white.svg"} width={20} height={20} />
                </Button>
            </div>
            <Button
                className=" bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
                onClick={() => setIsOpenModal(true)}
            >
                <img src={"/icons/add-white.svg"} width={16} height={16} alt={"add white"} />
                <div>Add new event</div>
            </Button>

            <div className="w-full grid grid-cols-7 max-w-[800px] border-t border-l border-gray-400">
                {weekDays.map((day) => {
                    return (
                        <div key={day} className="bg-gray-200 font-bold border-r border-b border-gray-400 text-center">
                            {day}
                        </div>
                    );
                })}
                {renderDaysInMonth()}
            </div>

            {isOpenModal && <AddEventModal onSave={addNewEvent} onClose={() => setIsOpenModal(false)} />}
        </div>
    );
};

export default Calendar;
