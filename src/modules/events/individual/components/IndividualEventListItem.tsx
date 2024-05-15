import React from "react";
import { EventType } from "../../utils";
import { Chip, ListItem, Typography } from "@material-tailwind/react";
import IndividualEventDetailsPopup from "./IndividualEventDetailsPopup";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faClockFour,
    faDotCircle,
    faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function IndividualEventListItem({
    event,
    isRegistered,
}: {
    event: EventType;
    isRegistered: boolean;
}) {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    return (
        <>
            <ListItem placeholder={""} onClick={() => setIsPopupOpen(true)}>
                <div className="w-full">
                    <div className="flex justify-between">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            placeholder={""}
                        >
                            {event.eventName}
                        </Typography>
                        <div className="flex gap-2">
                            {new Date() > new Date(event.startDate) ? (
                                <Chip
                                    variant="ghost"
                                    color="red"
                                    size="sm"
                                    value="Ended"
                                    icon={<FontAwesomeIcon icon={faCircle} />}
                                />
                            ) : (
                                <Chip
                                    variant="ghost"
                                    color="green"
                                    size="sm"
                                    value="Active"
                                    icon={
                                        <FontAwesomeIcon icon={faDotCircle} />
                                    }
                                />
                            )}
                            {new Date(event.endDate) < new Date() && (
                                <Chip
                                    value={
                                        event.isAttended
                                            ? "Attended"
                                            : "Not Attended"
                                    }
                                    color="green"
                                    variant="ghost"
                                    icon={
                                        <FontAwesomeIcon icon={faUserCheck} />
                                    }
                                />
                            )}
                            <Chip
                                value={`${new Date(event.endDate) < new Date() ? "Ended on" : "Last Date"}: ${moment(event.endDate).format("DD/MM/YYYY")}`}
                                color="teal"
                                variant="ghost"
                            />
                            <Chip
                                value={`${event.startTime} - ${event.endTime}`}
                                color="teal"
                                variant="ghost"
                                icon={<FontAwesomeIcon icon={faClockFour} />}
                            />
                        </div>
                    </div>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                        placeholder={""}
                    >
                        {event.address}
                    </Typography>
                </div>
            </ListItem>
            <IndividualEventDetailsPopup
                open={isPopupOpen}
                setOpen={setIsPopupOpen}
                event={event}
                isRegistered={isRegistered}
            />
        </>
    );
}
