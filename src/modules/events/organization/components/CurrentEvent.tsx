import React from "react";
import { EventType } from "../../utils";
import { Card, List } from "@material-tailwind/react";
import EventListItem from "./EventListItem";

export default function CurrentEvent({
    eventList,
}: {
    eventList: EventType[];
}) {
    const [currentEvents, setCurrentEvents] =
        React.useState<EventType[]>(eventList);
    React.useEffect(() => {
        console.log(eventList);
        
        setCurrentEvents(eventList);
    }, [eventList]);
    return (
        <Card className="w-full" placeholder={""}>
            <List placeholder={""}>
                {currentEvents.map((event) => (
                    <EventListItem
                        key={event._id}
                        event={event}
                        setEvents={setCurrentEvents}
                    />
                ))}
            </List>
        </Card>
    );
}
