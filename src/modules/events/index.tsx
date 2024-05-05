import React from "react";
import { EventProvider } from "./EventContext";
import EventMainPage from "./EventMainPage";
import { AuthContext } from "../../context/auth/AuthContext";
import IndividualEventPage from "./IndividualEventPage";

const Index = () => {
    const { loggedInUserType } = React.useContext(AuthContext);
    return (
        <EventProvider>
            {loggedInUserType === "individual" ? (
                <IndividualEventPage />
            ) : (
                <EventMainPage />
            )}
        </EventProvider>
    );
};

export default Index;
