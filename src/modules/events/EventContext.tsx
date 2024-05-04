import React from "react";
import { EventConfig, EventType } from "./utils";
import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { DoctorDetailsType } from "../auth/utils";

type EventContextType = {
    createEvent: (eventDetails: EventType) => Promise<boolean>;
    getDoctors: () => Promise<DoctorDetailsType[]>;
};

export const EventContext = React.createContext<EventContextType>({
    createEvent: async () => {
        return false;
    },
    getDoctors: async () => {
        return [];
    },
});

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const createEvent = async (eventDetails: EventType) => {
        try {
            console.log(eventDetails);
            const createdEvent = await axiosInstance.post(
                createEndPoint.createEvent(),
                {
                    eventDetails: JSON.stringify(eventDetails),
                },
                EventConfig
            );
            console.log(createdEvent);
            if (createdEvent.data.success) {
                return true;
            }
            return false;
        } catch (error) {
            console.log("Error creating event:", error);
            return false;
        }
    };

    const getDoctors = async (): Promise<DoctorDetailsType[]> => {
        try {
            const doctors = await axiosInstance.get(
                createEndPoint.getDoctors(),
                EventConfig
            );
            console.log(doctors);
            return doctors.data.data;
        } catch (error) {
            console.log("Error getting doctors:", error);
            return [];
        }
    };

    return (
        <EventContext.Provider
            value={{
                createEvent,
                getDoctors,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};
