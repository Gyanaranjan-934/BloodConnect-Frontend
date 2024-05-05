import React from "react";
import { EventType } from "../utils";
import { List } from "@material-tailwind/react";
import EventListItem from "./EventListItem";

export default function PastEvents({ eventList }: { eventList: EventType[] }) {
    const [pastEvents, setPastEvents] = React.useState<EventType[]>(eventList);
    React.useEffect(() => {
        setPastEvents(eventList);
    }, [eventList]);
    return (
        <List
            placeholder={""}
            className="max-h-screen w-full overflow-y-auto no-scrollbar"
        >
            {pastEvents.map((event) => (
                <EventListItem
                    key={event._id}
                    event={event}
                    setEvents={setPastEvents}
                />
            ))}
        </List>
    );
}
