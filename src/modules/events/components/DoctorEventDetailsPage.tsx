import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { EventType } from "../utils";
import { getEventDetails } from "../services";

export default function DoctorEventDetailsPage() {
    const { eventId } = useParams();
    
    const { data } = useQuery({
        queryKey: ["eventDetails", eventId],
        queryFn: () => getEventDetails(eventId),
    });
    const eventDetails = data ? (data as EventType[])[0] : null;
    console.log(eventDetails);
    if (!eventId) {
        return <Navigate to={"/events"} />;
    }
    return (
        <>
            {eventDetails && (
                <div>
                    <h1>{eventDetails.eventName}</h1>
                    <p>{eventDetails.address}</p>
                </div>
            )}
        </>
    );
}
