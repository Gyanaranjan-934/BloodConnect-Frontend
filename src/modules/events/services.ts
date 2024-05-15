import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { getConfig } from "../alerts/services";
import { BloodReportType, DoctorDetailsType } from "../auth/types";
import {
    AttendDonorsByDoctorType,
    DonorFormDetailsByDoctorType,
    EventDetailsType,
} from "./types";
import { EventInputType, EventType } from "./utils";

export const createEvent = async (eventDetails: EventInputType) => {
    try {
        console.log(eventDetails);
        const config = await getConfig();
        const createdEvent = await axiosInstance.post(
            createEndPoint.createEvent(),
            {
                eventDetails: JSON.stringify(eventDetails),
            },
            {
                headers: config.headers,
            }
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
        const config = await getConfig();
        const doctors = await axiosInstance.get(
            createEndPoint.getDoctors(),
            {
                headers: config.headers,
            }
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
        const config = await getConfig();
        const upcomingEvents = await axiosInstance.get(
            createEndPoint.showUpcomingEventsIndividual(),
            {
                headers: config.headers,
            }
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
        const config = await getConfig();
        const events = await axiosInstance.get(
            createEndPoint.showEventsOrganization(),
            {
                headers: config.headers,
            }
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
        const config = await getConfig();
        const events = await axiosInstance.get(
            createEndPoint.showRegisteredEventsIndividual(),
            {
                headers: config.headers,
            }
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
): Promise<boolean> => {
    try {
        const config = await getConfig();
        const response = await axiosInstance.post(
            createEndPoint.registerForEventByIndividual(),
            { eventId },
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error registering for event:", error);
        return false;
    }
};

export const getEventsOfDoctor = async (): Promise<EventType[]> => {
    try {
        const config = await getConfig();
        const events = await axiosInstance.get(
            createEndPoint.getEventsOfDoctor(),
            {
                headers: config.headers,
            }
        );
        console.log(events);
        return events.data.data;
    } catch (error) {
        console.log("Error getting events:", error);
        return [];
    }
};

export const registerForEventByDoctor = async (
    eventId: string,
    userDetails: DonorFormDetailsByDoctorType
): Promise<boolean> => {
    try {
        const config = await getConfig();
        const response = await axiosInstance.post(
            createEndPoint.registerForEventByDoctor(),
            { eventId, ...userDetails },
            {
                headers: config.headers,
            }
        );
        if(response.data.success){
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error registering for event:", error);
        return false;
    }
};

export const getEventDetails = async (
    eventId: string | undefined
): Promise<EventDetailsType | null> => {
    if (!eventId) {
        return null;
    }
    try {
        const config = await getConfig();
        const eventDetails = await axiosInstance.get(
            createEndPoint.getEventDetails(),
            {
                headers: config.headers,
                params: {
                    eventId,
                },
            }
        );
        console.log("eventdetails: ", eventDetails);
        return eventDetails.data.data as EventDetailsType;
    } catch (error) {
        console.log("Error getting event details:", error);
        return null;
    }
};

export const getAttendedDonors = async (
    eventId: string | undefined
): Promise<AttendDonorsByDoctorType[]> => {
    if (!eventId) {
        return [];
    }
    try {
        const config = await getConfig();
        const donorDetails = await axiosInstance.get(
            createEndPoint.getAttendedDonors(),
            {
                headers: config.headers,
                params: {
                    eventId,
                },
            }
        );
        console.log(donorDetails);

        return donorDetails.data.data as AttendDonorsByDoctorType[];
    } catch (error) {
        console.log("Error getting attended donors details:", error);
        return [];
    }
};

export const fillBloodReport = async (
    eventId: string | undefined,
    donorId: string,
    bloodReportDetails: BloodReportType
): Promise<boolean> => {
    try {
        const config = await getConfig();
        console.log(eventId, donorId, bloodReportDetails);

        if (!eventId || !donorId || !bloodReportDetails) {
            return false;
        }
        const response = await axiosInstance.post(
            createEndPoint.fillBloodReport(),
            { lastCamp: eventId, userId: donorId, ...bloodReportDetails },
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error filling blood report:", error);
        return false;
    }
};
