import { ListItem, Typography } from "@material-tailwind/react";
import { EventType } from "../utils";
import React from "react";
import OrganizationEventDetailsPopup from "./OrganizationEventDetailsPopup";

export default function EventListItem({
    event,
    setEvents,
}: {
    event: EventType;
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
}) {
    const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
    return (
        <>
            <ListItem placeholder={""} onClick={() => setIsPopupOpen(true)}>
                <div>
                    <Typography variant="h6" color="blue-gray" placeholder={""}>
                        {event.eventName}
                    </Typography>
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
            <OrganizationEventDetailsPopup
                open={isPopupOpen}
                setOpen={setIsPopupOpen}
                event={event}
            />
        </>
    );
}
