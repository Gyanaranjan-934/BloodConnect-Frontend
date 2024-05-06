import { useQuery } from "@tanstack/react-query";
import { EventType } from "../utils";
import { Card, List } from "@material-tailwind/react";
import IndividualEventListItem from "./IndividualEventListItem";
import { getRegisteredEventsToIndividual } from "../services";

export default function RegisteredEvents() {
    const { data } = useQuery({
        queryKey: ["registeredEvents"],
        queryFn: getRegisteredEventsToIndividual,
    });
    const registeredEvents = (data ? data : []) as EventType[];
    console.log(registeredEvents);
    
    return (
        <Card className="w-full" placeholder={""}>
            <List placeholder={""}>
                {registeredEvents.map((event) => (
                    <div key={event._id}>
                        <IndividualEventListItem event={event} />
                    </div>
                ))}
            </List>
        </Card>
    );
}
