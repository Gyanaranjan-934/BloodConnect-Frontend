import { useState } from "react";
import EventForm from "../components/EventForm";
import { EventInputType, InitialEventInputDetails } from "../utils";
import EventHeader from "./components/EventHeader";
import EventTabs from "../components/EventTabs";

const EventMainPage = () => {
    const [eventDetails, setEventDetails] =
        useState<EventInputType>(InitialEventInputDetails);
    const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
    return (
        <>
            <div>
                <EventHeader setIsAlertPopupOpen={setIsAlertPopupOpen} />
                <EventTabs />
            </div>
            {isAlertPopupOpen && (
                <EventForm
                    onClose={setIsAlertPopupOpen}
                    eventDetails={eventDetails}
                    setEventDetails={setEventDetails}
                    isEdit={false}
                />
            )}
        </>
    );
};

export default EventMainPage;
