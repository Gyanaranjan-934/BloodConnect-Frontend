import React from "react";
import {
    Button,
    Card,
    CardBody,
    Chip,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography,
} from "@material-tailwind/react";
import { EventType } from "../../events/utils";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import DoctorDetailsPopup from "./DoctorDetailsPopup";
import { DoctorType } from "../types";

export default function EventDetailsPopup({
    setOpen,
    event,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    event: EventType;
}) {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(true);
    const handleClose = () => {
        setIsAlertPopupOpen(false);

        setTimeout(() => {
            setOpen(false);
        }, 100);
    };

    const [isDoctorDetailsPopupOpen, setIsDoctorDetailsPopupOpen] =
        React.useState(false);
    const [selectedDoctor, setSelectedDoctor] =
        React.useState<DoctorType | null>(null);
    return (
        <>
            <div
                className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isAlertPopupOpen ? "opacity-100" : "opacity-0"}`}
            >
                <div
                    className={`bg-white rounded-lg shadow-md w-[60%] h-min max-h-[90%]  overflow-y-auto p-4 text-center z-10 transform transition-transform ease-in duration-500 ${isAlertPopupOpen ? "scale-100" : "scale-90"}`}
                >
                <DialogHeader placeholder={""}>
                    <div className="flex gap-2">
                        <Typography placeholder={""} variant="h4">
                            {event.eventName}
                        </Typography>
                        <Chip
                            value={
                                event.isVerified ? "Verified" : "Not Verified"
                            }
                            color={event.isVerified ? "green" : "red"}
                            className="mr-1"
                        />
                    </div>
                </DialogHeader>
                <DialogBody placeholder={""}>
                    <Card placeholder={""}>
                        <CardBody placeholder={""}>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <Typography placeholder={""}>
                                        Event Name: {event.eventName}
                                    </Typography>
                                    <Typography placeholder={""}>
                                        Event Head Name: {event.eventHeadName}
                                    </Typography>
                                </div>
                                <div className="flex gap-2">
                                    <Typography placeholder={""}>
                                        Start Date:{" "}
                                        {moment(event.startDate).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </Typography>
                                    <Typography placeholder={""}>
                                        End Date:{" "}
                                        {moment(event.endDate).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </Typography>
                                </div>
                                <div className="flex gap-2">
                                    <Typography placeholder={""}>
                                        Start Time: {event.startTime}
                                    </Typography>
                                    <Typography placeholder={""}>
                                        End Time: {event.endTime}
                                    </Typography>
                                </div>
                                <div className="flex gap-2">
                                    <Typography placeholder={""}>
                                        Is Paid: {event.isPaid}
                                    </Typography>
                                    <Typography placeholder={""}>
                                        Payment Type: {event.paymentType}
                                    </Typography>
                                    <Typography placeholder={""}>
                                        Payment Amount: {event.paymentAmount}
                                    </Typography>
                                </div>
                                <div className="flex gap-2">
                                    <Typography placeholder={""}>
                                        Target Total Blood Units:{" "}
                                        {event.targetTotalBlood}
                                    </Typography>
                                    <Typography placeholder={""}>
                                        Max No. of Donors:{" "}
                                        {event.maxDonorCapacity}
                                    </Typography>
                                </div>
                                <div className="flex gap-2">
                                    <Typography placeholder={""}>
                                        Available Staffs:{" "}
                                        {event.availableStaffCount}
                                    </Typography>
                                    <Typography placeholder={""}>
                                        Available Beds:{" "}
                                        {event.availableBedCount}
                                    </Typography>
                                </div>
                                <Typography placeholder={""}>
                                    Address: {event.address}
                                </Typography>
                                <div className="flex flex-col gap-2 justify-center items-center w-full">
                                    <Typography placeholder={""} variant="h6">
                                        Doctors Registered:{" "}
                                        {event.doctors.length}
                                    </Typography>
                                    <div className="w-full max-h-full ">
                                        {event.doctors.map((doctor) => (
                                            <div
                                                key={doctor._id}
                                                className="flex w-full m-1 p-1 shadow rounded justify-between gap-2"
                                            >
                                                <Typography placeholder={""}>
                                                    {doctor.name}
                                                </Typography>
                                                <Chip
                                                    value={
                                                        doctor.isVerified
                                                            ? "Verified"
                                                            : "Not Verified"
                                                    }
                                                    color={
                                                        doctor.isVerified
                                                            ? "green"
                                                            : "red"
                                                    }
                                                    variant="ghost"
                                                    icon={
                                                        <FontAwesomeIcon
                                                            icon={
                                                                doctor.isVerified
                                                                    ? faCheckCircle
                                                                    : faTimesCircle
                                                            }
                                                        />
                                                    }
                                                />
                                                <Button
                                                    placeholder={""}
                                                    variant="outlined"
                                                    color="blue-gray"
                                                    onClick={() => {
                                                        setSelectedDoctor(
                                                            doctor
                                                        );
                                                        setIsDoctorDetailsPopupOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </DialogBody>
                <DialogFooter placeholder={""}>
                    <Button
                        placeholder={""}
                        variant="text"
                        color="red"
                        onClick={handleClose}
                        className="mr-1"
                    >
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </div>
            </div>
            {selectedDoctor && (
                <DoctorDetailsPopup
                    open={isDoctorDetailsPopupOpen}
                    setOpen={setIsDoctorDetailsPopupOpen}
                    doctor={selectedDoctor}
                />
            )}
        </>
    );
}
