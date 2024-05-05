import { useQuery } from "@tanstack/react-query";
import React from "react";
import { EventContext } from "../EventContext";
import { EventType } from "../utils";
import { Card, List } from "@material-tailwind/react";
import IndividualEventListItem from "./IndividualEventListItem";

export default function FutureEvents() {
    const { showUpcomingEventsToIndividual } = React.useContext(EventContext);
    const { data } = useQuery({
        queryKey: ["upcomingEvents"],
        queryFn: showUpcomingEventsToIndividual,
    });
    const upcomingEvents = data ? data : ([] as EventType[]);
    return (
        <Card className="w-full" placeholder={""}>
            <List placeholder={""}>
                {upcomingEvents.map((event) => (
                    <div key={event._id}>
                        <IndividualEventListItem event={event} />
                    </div>
                ))}
            </List>
        </Card>
    );
}
