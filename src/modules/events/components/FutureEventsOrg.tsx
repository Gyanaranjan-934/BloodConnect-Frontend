import React from "react";
import { EventType } from "../utils";
import { Card, List } from "@material-tailwind/react";
import EventListItem from "./EventListItem";

export default function FutureEventsOrg({
    eventList,
}: {
    eventList: EventType[];
}) {
    const [futureEvents, setFutureEvents] =
        React.useState<EventType[]>(eventList);
    React.useEffect(() => {
        setFutureEvents(eventList);
    }, [eventList]);
    return (
        <Card className="w-full" placeholder={""}>
            <List placeholder={""}>
                {futureEvents.map((event) => (
                    <EventListItem
                        key={event._id}
                        event={event}
                        setEvents={setFutureEvents}
                    />
                ))}
            </List>
        </Card>
    );
}
