import React from "react";
import { EventProvider } from "./EventContext";
import EventMainPage from "./EventMainPage";
import { AuthContext } from "../auth/AuthContext";
import IndividualEventPage from "./IndividualEventPage";
import DoctorsEventPage from "./DoctorsEventPage";
import { Route } from "react-router-dom";
import DoctorEventDetailsPage from "./components/DoctorEventDetailsPage";

export const EventRoutes = (
    <Route path="doctor/:eventId" element={<DoctorEventDetailsPage />} />
)

const Index = () => {
    const { loggedInUserType } = React.useContext(AuthContext);
    return (
        <EventProvider>
            {loggedInUserType === "individual" ? (
                <IndividualEventPage />
            ) : loggedInUserType === "doctor" ? (
                <DoctorsEventPage />
            ) : (
                <EventMainPage />
            )}
        </EventProvider>
    );
};

export default Index;
