import { ListItem, Typography } from "@material-tailwind/react";
import { EventType } from "../utils";
import { useNavigate } from "react-router-dom";

export default function DoctorEventListItem({
    event,
}: {
    event: EventType;
}) {
    const navigate = useNavigate();
    return (
        <ListItem placeholder={""} onClick={() => {
            navigate(`/events/doctor/${event._id}`);
        }}>
            <div>
                <Typography variant="h6" color="blue-gray" placeholder={""}>
                    {event.eventName}
                </Typography>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                    placeholder={""}
                >
                    {event.address}
                </Typography>
            </div>
        </ListItem>
    );
}
