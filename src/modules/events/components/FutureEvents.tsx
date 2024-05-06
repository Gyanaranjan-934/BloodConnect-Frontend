import { useQuery } from "@tanstack/react-query";
import { EventType } from "../utils";
import { Card, List } from "@material-tailwind/react";
import IndividualEventListItem from "./IndividualEventListItem";
import { showUpcomingEventsToIndividual } from "../services";

export default function FutureEvents() {
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
