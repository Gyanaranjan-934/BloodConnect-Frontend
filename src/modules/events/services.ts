import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { DoctorDetailsType } from "../auth/utils";
import { EventInputType, EventConfig, EventType } from "./utils";

export const createEvent = async (eventDetails: EventInputType) => {
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

export const getDoctors = async (): Promise<DoctorDetailsType[]> => {
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

export const showUpcomingEventsToIndividual = async (): Promise<
    EventType[]
> => {
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
};

export const getEventsOfOrganization = async (): Promise<EventType[]> => {
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

export const getRegisteredEventsToIndividual = async (): Promise<
    EventType[]
> => {
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

export const registerForEventByIndividual = async (
    eventId: string
): Promise<void> => {
    try {
        console.log(eventId);

        const response = await axiosInstance.post(
            createEndPoint.registerForEventByIndividual(),
            { eventId },
            EventConfig
        );
        console.log(response);
    } catch (error) {
        console.log("Error registering for event:", error);
    }
};

export const getEventsOfDoctor = async (): Promise<EventType[]> => {
    try {
        const events = await axiosInstance.get(
            createEndPoint.getEventsOfDoctor(),
            EventConfig
        );
        console.log(events);
        return events.data.data;
    } catch (error) {
        console.log("Error getting events:", error);
        return [];
    }
};

export const registerForEventByDoctor = async (
    eventId: string
): Promise<void> => {
    try {
        console.log(eventId);

        const response = await axiosInstance.post(
            createEndPoint.registerForEventByDoctor(),
            { eventId },
            EventConfig
        );
        console.log(response);
    } catch (error) {
        console.log("Error registering for event:", error);
    }
};

export const getEventDetails = async (
    eventId: string | undefined
): Promise<EventType[]> => {
    console.log(eventId);

    if (!eventId) {
        return [];
    }
    try {
        const eventDetails = await axiosInstance.get(
            createEndPoint.getEventDetails(),
            {
                ...EventConfig,
                params: {
                    eventId,
                },
            }
        );
        console.log(eventDetails);
        const eventDetailsData: EventType[] = [];
        eventDetailsData.push(eventDetails.data.data);
        return eventDetailsData;
    } catch (error) {
        console.log("Error getting event details:", error);
        return [];
    }
};
