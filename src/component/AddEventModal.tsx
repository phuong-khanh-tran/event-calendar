import { FC } from "react";
import Modal, { IModalProps } from "./Modal";
import { Input } from "./Input";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./Button";
import DateInput from "./DateInput";
import { ErrorText } from "./ErrorText";

interface IAddEventModalProps extends IModalProps {
    onSave: (data: TAddEvent) => void;
}

const addEventSchema = Yup.object().shape({
    title: Yup.string().required("Event title is required"),
    date: Yup.date().required("Event date is required"),
});

export type TAddEvent = Yup.InferType<typeof addEventSchema>;

const AddEventModal: FC<IAddEventModalProps> = (props) => {
    const { onSave, onClose, ...rest } = props;
    const {
        formState: { errors },
        register,
        handleSubmit,
        control,
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(addEventSchema),
        defaultValues: {
            title: "",
            date: new Date(Date.now()),
        },
    });

    const onSubmit = handleSubmit((data) => {
        onSave(data);
    });

    return (
        <Modal className="flex flex-col gap-5 w-[500px]" onClose={onClose} {...rest}>
            <div className="font-bold text-2xl w-[500px]">Add Event</div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <div className="font-bold text-lg">Event Title</div>
                    <Input {...register("title")} />
                    {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-bold text-lg">Event Date:</div>
                    <Controller
                        control={control}
                        name="date"
                        render={({ field }) => (
                            <DateInput onChange={(date) => field.onChange(date)} selected={field.value} />
                        )}
                    />
                </div>
            </div>
            <div className="flex gap-2 w-full">
                <Button className="bg-green-500 hover:bg-green-600 text-white w-full" onClick={onSubmit}>
                    Save
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-600 text-white w-full" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

export default AddEventModal;
