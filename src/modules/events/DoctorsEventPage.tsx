import { useQuery } from "@tanstack/react-query";
import { EventType } from "./utils";
import { Card, List } from "@material-tailwind/react";
import DoctorEventListItem from "./components/DoctorEventListItem";
import { getEventsOfDoctor } from "./services";

export default function DoctorsEventPage() {
    const { data } = useQuery({
        queryKey: ["eventsOfDoctor"],
        queryFn: getEventsOfDoctor,
    });
    const events = data ? data : ([] as EventType[]);
    return (
        <Card className="w-full" placeholder={""}>
            <List placeholder={""}>
                {events.map((event) => (
                    <DoctorEventListItem key={event._id} event={event} />
                ))}
            </List>
        </Card>
    );
}
