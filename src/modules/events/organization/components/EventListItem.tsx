import { ListItem, Typography } from "@material-tailwind/react";
import { EventInputType, EventType } from "../../utils";
import React from "react";
import OrganizationEventDetailsPopup from "./OrganizationEventDetailsPopup";
import EventForm from "../../components/EventForm";

export default function EventListItem({
    event,
}: {
    event: EventType;
    setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
}) {
    const [isPopupOpen, setIsPopupOpen] = React.useState<boolean>(false);
    const [isEditEnabled, setIsEditEnabled] = React.useState<boolean>(false);
    const [eventDetails, setEventDetails] = React.useState<EventInputType>({
        ...event,
        eventId: event._id,
        doctorsList: event.doctors.map((doctor) => doctor._id),
        startDate: new Date(event.startDate).toLocaleDateString(),
        endDate: new Date(event.endDate).toLocaleDateString(),
        location: {
            latitude: event.location.coordinates[1],
            longitude: event.location.coordinates[0],
        },
    });
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
            {isPopupOpen && !isEditEnabled && (
                <OrganizationEventDetailsPopup
                    open={isPopupOpen}
                    setOpen={setIsPopupOpen}
                    event={event}
                    setEditEnabled={setIsEditEnabled}
                />
            )}
            {isEditEnabled && !isPopupOpen && (
                <EventForm
                    onClose={setIsEditEnabled}
                    eventDetails={eventDetails}
                    setEventDetails={setEventDetails}
                    isEdit={true}
                />
            )}
        </>
    );
}
