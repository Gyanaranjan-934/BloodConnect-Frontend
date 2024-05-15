import React from "react";
import { EventProvider } from "./EventContext";
import EventMainPage from "./organization/EventMainPage";
import { AuthContext } from "../auth/AuthContext";
import IndividualEventPage from "./individual/IndividualEventPage";
import DoctorsEventPage from "./doctor/DoctorsEventPage";
import { Navigate, Route } from "react-router-dom";
import DoctorEventDetailsPage from "./doctor/DoctorEventDetailsPage";

export const EventRoutes = (
    <Route path="doctor/:eventId" element={<DoctorEventDetailsPage />} />
);

const Index = () => {
    const { loggedInUserType } = React.useContext(AuthContext);
    if (loggedInUserType === "admin") {
        return <Navigate to={"/dashboard"} />;
    }
    return (
        <EventProvider>
            {loggedInUserType === "individual" ? (
                <IndividualEventPage />
            ) : loggedInUserType === "doctor" ? (
                <DoctorsEventPage />
            ) : loggedInUserType === "organization" ? (
                <EventMainPage />
            ) : (
                <></>
            )}
        </EventProvider>
    );
};

export default Index;
