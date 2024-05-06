import React from "react";
type EventContextType = object;

export const EventContext = React.createContext<EventContextType>({});

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <EventContext.Provider value={{}}>{children}</EventContext.Provider>;
};
