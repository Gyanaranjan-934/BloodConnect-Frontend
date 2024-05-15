import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Chip,
} from "@material-tailwind/react";
import React from "react";
import { EventType } from "../../utils";
import { registerForEventByIndividual } from "../../services";
import moment from "moment";
import { calculateDistance } from "../../../../services/calculateDistance";
import { AuthContext } from "../../../auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoad } from "@fortawesome/free-solid-svg-icons";

export default function IndividualEventDetailsPopup({
    open,
    setOpen,
    event,
    isRegistered,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    event: EventType;
    isRegistered: boolean;
}) {
    const handleOpen = () => setOpen(!open);
    const [registered, setRegistered] = React.useState<boolean>(isRegistered);
    const handleRegister = async () => {
        const response = await registerForEventByIndividual(event._id);
        if (response) {
            setRegistered(true);
        }
    };
    const { geoLocation } = React.useContext(AuthContext);
    return (
        <>
            <Dialog
                placeholder={""}
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader placeholder={""}>
                    <div className="flex justify-between w-full">
                        <Typography placeholder="" variant="h4">
                            {event.eventName}
                        </Typography>
                        <div className="flex gap-2">
                            <Chip
                                value={
                                    calculateDistance(
                                        geoLocation.latitude,
                                        geoLocation.longitude,
                                        event.location.coordinates[1],
                                        event.location.coordinates[0]
                                    ).toFixed(2) + " KM"
                                }
                                icon={<FontAwesomeIcon icon={faRoad} />}
                                color="red"
                            />
                            <Chip value={event.isPaid ? "Paid" : "Unpaid"} />
                        </div>
                    </div>
                </DialogHeader>
                <DialogBody placeholder={""}>
                    <div className="flex w-full flex-col gap-4 px-4">
                        <div className="flex justify-between mt-2">
                            <Typography placeholder="">
                                Start Date:{" "}
                                <span>
                                    {moment(event.startDate).format(
                                        "DD/MM/YYYY"
                                    )}
                                </span>
                            </Typography>
                            <Typography placeholder="">
                                End Date:{" "}
                                <span>
                                    {moment(event.endDate).format("DD/MM/YYYY")}
                                </span>
                            </Typography>
                        </div>
                        <div className="flex justify-between mt-2">
                            <Typography placeholder="">
                                Start Time: <span>{event.startTime}</span>
                            </Typography>
                            <Typography placeholder="">
                                End Time: <span>{event.endTime}</span>
                            </Typography>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Typography placeholder="">
                                Address: <span>{event.address}</span>
                            </Typography>
                            {event.isPaid && (
                                <>
                                    {event.paymentType === "cash" && (
                                        <Typography placeholder="">
                                            Payment Amount:{" "}
                                            <span>{event.paymentAmount}</span>
                                        </Typography>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter placeholder={""}>
                    <Button
                        placeholder={""}
                        variant="gradient"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        placeholder={""}
                        variant="filled"
                        color="green"
                        onClick={handleRegister}
                        disabled={event.endDate < new Date() || registered}
                    >
                        <span>
                            {event.isAttended
                                ? "Attended"
                                : registered
                                  ? "Registered"
                                  : "Register"}
                        </span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
