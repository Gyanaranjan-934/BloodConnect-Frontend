import { useQuery } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import { getRegisteredEventsToIndividual } from "../../services";
import { EventType } from "../../utils";
import IndividualEventListItem from "./IndividualEventListItem";

export default function RegisteredEvents() {
    const { data } = useQuery({
        queryKey: ["registeredEvents"],
        queryFn: getRegisteredEventsToIndividual,
    });
    let registeredEvents = (data ? data : []) as EventType[];
    registeredEvents = registeredEvents.sort(
        (a: EventType, b: EventType) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    );

    return (
        <Card className="w-full" placeholder={""}>
            <List placeholder={""}>
                {registeredEvents.map((event) => (
                    <div key={event._id}>
                        <IndividualEventListItem
                            isRegistered={true}
                            event={event}
                        />
                    </div>
                ))}
            </List>
        </Card>
    );
}
