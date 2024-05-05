import React from "react";
import { EventType } from "../utils";
import { ListItem, Typography } from "@material-tailwind/react";
import IndividualEventDetailsPopup from "./IndividualEventDetailsPopup";

export default function IndividualEventListItem({
    event,
}: {
    event: EventType;
}) {
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    return (
        <>
            <ListItem
                placeholder={""}
                onClick={() => setIsPopupOpen(true)}
            >
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
            <IndividualEventDetailsPopup
                open={isPopupOpen}
                setOpen={setIsPopupOpen}
                event={event}
            />
        </>
    );
}
