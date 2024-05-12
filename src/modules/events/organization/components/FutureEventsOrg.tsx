import React from "react";
import { EventType } from "../../utils";
import { Card, List } from "@material-tailwind/react";
import EventListItem from "./EventListItem";

export default function FutureEventsOrg({
    eventList,
}: {
    eventList: EventType[];
}) {
    console.log(eventList);

    const [futureEvents, setFutureEvents] =
        React.useState<EventType[]>(eventList);
    React.useEffect(() => {
        console.log(eventList);

        setFutureEvents(eventList);
    }, [eventList]);

    return (
        <>
            {futureEvents && (
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
            )}
        </>
    );
}
