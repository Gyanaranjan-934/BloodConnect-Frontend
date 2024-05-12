import { useQuery } from "@tanstack/react-query";
import { EventType } from "../utils";
import { List } from "@material-tailwind/react";
import DoctorEventListItem from "./components/DoctorEventListItem";
import { getEventsOfDoctor } from "../services";

export default function DoctorsEventPage() {
    const { data } = useQuery({
        queryKey: ["eventsOfDoctor"],
        queryFn: getEventsOfDoctor,
    });
    const events = data ? data : ([] as EventType[]);
    return (
        <div className="w-full max-h-screen m-2 shadow-md rounded-md ">
            <List
                placeholder={""}
                className="max-h-screen overflow-y-auto no-scrollbar"
            >
                {events.map((event) => (
                    <DoctorEventListItem key={event._id} event={event} />
                ))}
            </List>
        </div>
    );
}
