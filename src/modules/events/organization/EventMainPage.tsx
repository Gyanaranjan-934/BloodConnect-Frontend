import React, { useState } from "react";
import EventForm from "../components/EventForm";
import { EventInputType, InitialEventInputDetails } from "../utils";
import EventHeader from "./components/EventHeader";
import EventTabs from "../components/EventTabs";

const EventMainPage = () => {
    const [eventDetails, setEventDetails] =
        useState<EventInputType>(InitialEventInputDetails);
    const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
    /*
        create event main page:

        1. Top horizontal bar will cover only the heading and a button to open the form for creating a new event
        2. Below the heading, there will be a tab bar with the following tabs:
            I. Events in progress
            II. Upcoming events
            III. Past events
        3. Below the tab bar, there will be a list of events in the current tab
        4. When a user clicks on an event, the event details will be displayed in a modal
        5. When a user clicks on the "Create Event" button, the form will be displayed
    
    */
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
                />
            )}
        </>
    );
};

export default EventMainPage;
