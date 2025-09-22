import { FC } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import { Input } from "./Input";
import classNames from "classnames";

export const dateFormatyyyyMMddSlash = "dd/MM/yyyy";
const DateInput: FC<DatePickerProps> = (props) => {
    const {
        dateFormat = dateFormatyyyyMMddSlash,
        wrapperClassName,
        customInput = (
            <Input
                className={classNames("w-full bg-[url('/icons/calendar.svg')] bg-[center_right_8px] bg-no-repeat")}
            />
        ),
        ...rest
    } = props;

    return (
        <DatePicker dateFormat={dateFormat} customInput={customInput} onKeyDown={(e) => e.preventDefault()} {...rest} />
    );
};

export default DateInput;
