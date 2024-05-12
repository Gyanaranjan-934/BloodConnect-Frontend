import { ListItem, Typography } from "@material-tailwind/react";
import { EventType } from "../../utils";
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
            <ListItem placeholder={""} className="m-2 border-gray-700" onClick={() => setIsPopupOpen(true)}>
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
            {isPopupOpen && (
                <OrganizationEventDetailsPopup
                    open={isPopupOpen}
                    setOpen={setIsPopupOpen}
                    event={event}
                />
            )}
        </>
    );
}
