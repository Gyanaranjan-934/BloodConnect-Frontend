import React from "react";
import { EventConfig, EventInputType, EventType } from "./utils";
import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { DoctorDetailsType } from "../auth/utils";

type EventContextType = {
    createEvent: (eventDetails: EventInputType) => Promise<boolean>;
    getDoctors: () => Promise<DoctorDetailsType[]>;
    showUpcomingEventsToIndividual: () => Promise<EventType[]>;
    getEventsOfOrganization: () => Promise<EventType[]>;
    getRegisteredEventsToIndividual: () => Promise<EventType[]>;
    registerForEventByIndividual: (eventId: string) => Promise<void>;
};

export const EventContext = React.createContext<EventContextType>({
    createEvent: async () => false,
    getDoctors: async () => [],
    showUpcomingEventsToIndividual: async () => [],
    getEventsOfOrganization: async () => [],
    getRegisteredEventsToIndividual: async () => [],
    registerForEventByIndividual: async () => {},
});

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const createEvent = async (eventDetails: EventInputType) => {
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

    const showUpcomingEventsToIndividual = async(): Promise<EventType[]> => {
        try {
            const upcomingEvents = await axiosInstance.get(
                createEndPoint.showUpcomingEventsIndividual(),
                EventConfig
            );
            console.log(upcomingEvents);
            return upcomingEvents.data.data;
        } catch (error) {
            console.log("Error getting upcoming events:", error);
            return [];
        }
    }

    const getEventsOfOrganization = async (): Promise<EventType[]> => {
        try {
            const events = await axiosInstance.get(
                createEndPoint.showEventsOrganization(),
                EventConfig
            );
            console.log(events);
            return events.data.data;
        } catch (error) {
            console.log("Error getting events:", error);
            return [];
        }
    };

    const getRegisteredEventsToIndividual = async (): Promise<EventType[]> => {
        try {
            const events = await axiosInstance.get(
                createEndPoint.showRegisteredEventsIndividual(),
                EventConfig
            );
            console.log(events);
            return events.data.data;
        } catch (error) {
            console.log("Error getting events:", error);
            return [];
        }
    };

    const registerForEventByIndividual = async(eventId: string): Promise<void> => {
        try {
            console.log(eventId);
            
            const response = await axiosInstance.post(
                createEndPoint.registerForEventByIndividual(),
                {eventId},
                EventConfig
            );
            console.log(response);
            
        } catch (error) {
            console.log("Error registering for event:", error);
        }
    };

    return (
        <EventContext.Provider
            value={{
                createEvent,
                getDoctors,
                showUpcomingEventsToIndividual,
                getEventsOfOrganization,
                getRegisteredEventsToIndividual,
                registerForEventByIndividual
            }}
        >
            {children}
        </EventContext.Provider>
    );
};
