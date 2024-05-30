import { faRoad } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Dialog,
    DialogHeader,
    Typography,
    Chip,
    DialogBody,
    Input,
    Select,
    DialogFooter,
    Button,
    Option,
} from "@material-tailwind/react";
import React from "react";
import { calculateDistance } from "../../../services/calculateDistance";
import { NearbyOrganizationType } from "../../alerts/utils";
import { AuthContext } from "../../auth/AuthContext";
import { createAppointment } from "../services";
import { toast } from "react-toastify";

const TIME_SLOTS = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
];

export default function OrganzationDetailsPopup({
    open,
    setOpen,
    organization,
    setEditSuccess,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    organization: NearbyOrganizationType | null;
    setEditSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const handleOpen = () => setOpen(!open);
    const [distance, setDistance] = React.useState<number>(0);
    const [selectedDate, setSelectedDate] = React.useState<string>("");
    const [selectedTime, setSelectedTime] = React.useState<string>("");
    const { geoLocation } = React.useContext(AuthContext);
    React.useEffect(() => {
        if (organization) {
            // get the perticular location

            const distance = calculateDistance(
                geoLocation.latitude,
                geoLocation.longitude,
                organization.currentLocation?.coordinates[1],
                organization.currentLocation?.coordinates[0]
            );
            setDistance(distance);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);

    const handleAppointmentRegistration = async () => {
        const response = await createAppointment({
            appointmentDate: selectedDate,
            appointmentTime: selectedTime,
            organizationId: organization?._id,
        });
        if (response) {
            setEditSuccess(true);
            setOpen(false);
        }else{
            toast("Appointment not registered", { type: "error" });
        }
    };
    return (
        <>
            {organization && (
                <Dialog
                    size="sm"
                    placeholder={""}
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader className="" placeholder={""}>
                        <div className="w-full flex justify-between items-center bg-gray-50 p-2 rounded shadow">
                            <Typography placeholder={""} variant="h3">
                                {organization.name}
                            </Typography>
                            <Chip
                                icon={<FontAwesomeIcon icon={faRoad} />}
                                color="green"
                                value={distance.toFixed(2) + " KM"}
                                className="mr-2"
                            />
                        </div>
                    </DialogHeader>
                    <form onSubmit={handleAppointmentRegistration}>
                        <DialogBody placeholder={""}>
                            <div className="flex flex-col gap-4">
                                <div className="rounded shadow p-2 bg-gray-200">
                                    <Typography
                                        placeholder={""}
                                        variant="paragraph"
                                        color="black"
                                        className="font-bold"
                                    >
                                        Email:{" "}
                                        <span className=" text-sm font-normal">
                                            {organization.email}
                                        </span>
                                    </Typography>
                                    <Typography
                                        placeholder={""}
                                        variant="paragraph"
                                        color="black"
                                        className="font-bold"
                                    >
                                        Phone:{" "}
                                        <span className=" text-sm font-normal">
                                            {organization.phone}
                                        </span>
                                    </Typography>
                                    <Typography
                                        placeholder={""}
                                        variant="paragraph"
                                        color="black"
                                        className="font-bold"
                                    >
                                        Address:{" "}
                                        <span className=" text-sm font-normal">
                                            {Object.values(
                                                organization.address
                                            ).join(", ")}
                                        </span>
                                    </Typography>
                                </div>
                                <div className="flex justify-around gap-2">
                                    <Input
                                        crossOrigin={"origin"}
                                        label="Date of appointment"
                                        type="date"
                                        required
                                        placeholder="Enter your date of appointment"
                                        value={selectedDate}
                                        onChange={(e) => {
                                            setSelectedDate(e.target.value);
                                        }}
                                    />
                                    <Select
                                        label="Time of appointment"
                                        placeholder="Time of appointment"
                                        value={selectedTime}
                                        onChange={(e) => {
                                            setSelectedTime(e ? e : "");
                                        }}
                                    >
                                        {TIME_SLOTS.map((timeSlot) => (
                                            <Option
                                                key={timeSlot}
                                                value={timeSlot}
                                            >
                                                {timeSlot}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </DialogBody>
                        <DialogFooter placeholder={""}>
                            <Button
                                placeholder={""}
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button
                                placeholder={""}
                                variant="gradient"
                                color="green"
                                type="submit"
                            >
                                <span>Book Appointment</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            )}
        </>
    );
}
