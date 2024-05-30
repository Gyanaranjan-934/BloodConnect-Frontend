import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Typography,
    Chip,
    Popover,
    PopoverHandler,
    IconButton,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
import React from "react";
import { EventType } from "../../events/utils";
import EventDetailsPopup from "./EventDetailsPopup";
const TABLEHEAD = [
    "Id",
    "Event Name",
    "Org. Email",
    "Org. Status",
    "Org. Phone",
    "Head of Event",
    "Address",
    "Verified",
    "Actions",
];

export default function EventsTable({
    isLoading,
    eventDetails,
    handleVerify,
    handleDelete,
}: {
    isLoading: boolean;
    eventDetails: {
        events: EventType[];
        pageNo: number;
        totalCount: number;
    };
    handleVerify: (eventId: string) => void;
    handleDelete: (eventId: string) => void;
}) {
    const [eventDetailsPopupOpen, seteventDetailsPopupOpen] =
        React.useState(false);
    const [selectedEvent, setSelectedEvent] = React.useState<EventType | null>(
        null
    );
    return (
        <>
            <table className="w-full min-w-max table-auto text-left border border-gray-500">
                <thead>
                    <tr>
                        {TABLEHEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                    placeholder={""}
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="">
                    {eventDetails.events.map((event, index) => {
                        const isLast = index === eventDetails.events.length - 1;
                        const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={event._id}>
                                <td className={classes}>
                                    <div className="flex items-center gap-3">
                                        <Typography
                                            placeholder={""}
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {event._id}
                                        </Typography>
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {event.eventName}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        title={event.organizationId.email}
                                        className="font-normal line-clamp-1 text-ellipsis max-w-36"
                                    >
                                        {event.organizationId.email}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <div className="w-max">
                                        <Chip
                                            size="sm"
                                            variant="ghost"
                                            value={
                                                event.organizationId.isVerified
                                                    ? "Verified"
                                                    : "Not Verified"
                                            }
                                            color={
                                                event.organizationId.isVerified
                                                    ? "green"
                                                    : "red"
                                            }
                                        />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {event.organizationId.phone}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {event.eventHeadName}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        title={event.address}
                                        className="font-normal line-clamp-2 text-ellipsis max-w-36 "
                                    >
                                        {event.address}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <div className="w-max">
                                        <Chip
                                            size="sm"
                                            variant="ghost"
                                            value={
                                                event.isVerified
                                                    ? "Verified"
                                                    : "Not Verified"
                                            }
                                            color={
                                                event.isVerified
                                                    ? "green"
                                                    : "red"
                                            }
                                        />
                                    </div>
                                </td>
                                <td className={classes}>
                                    <Popover placement="bottom-end">
                                        <PopoverHandler>
                                            <IconButton
                                                variant="text"
                                                placeholder={""}
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </PopoverHandler>
                                        <PopoverContent
                                            placeholder={""}
                                            className="w-40"
                                        >
                                            <div className="flex flex-col gap-2">
                                                <Button
                                                    placeholder={""}
                                                    size="sm"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setSelectedEvent(event);
                                                        seteventDetailsPopupOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                                {!event.isVerified && (
                                                    <Button
                                                        size="sm"
                                                        placeholder={""}
                                                        variant="outlined"
                                                        onClick={() => {
                                                            handleVerify(
                                                                event._id
                                                            );
                                                            event.isVerified =
                                                                true;
                                                        }}
                                                    >
                                                        {isLoading ? "Verifying..." : "Verify"}
                                                    </Button>
                                                )}
                                                <Button
                                                    placeholder={""}
                                                    size="sm"
                                                    variant="outlined"
                                                    color="red"
                                                    onClick={() => {
                                                        handleDelete(event._id);
                                                    }}
                                                >
                                                    {isLoading ? "Deleting..." : "Delete"}
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {selectedEvent && eventDetailsPopupOpen && (
                <EventDetailsPopup
                    setOpen={seteventDetailsPopupOpen}
                    event={selectedEvent}
                />
            )}
        </>
    );
}
