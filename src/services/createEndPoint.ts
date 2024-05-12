import axios from "axios";

const host = "http://localhost:8000/api/v1";

export const axiosInstance = axios.create({
    baseURL: host,
});

export default {
    createEvent: (): string => "/event/create",
    searchDoctors: (): string => "/doctor/search-doctor",
    getDoctors: (): string => "/doctor/get-doctors",
    createIndividual: (): string => "/auth/individual/register",
    createOrganization: (): string => "/auth/organization/register",
    createDoctor: (): string => "/auth/doctor/register",
    loginUser: (
        type: "individual" | "organization" | "doctor" | "admin"
    ): string => `${host}/auth/login/${type}`,
    getDashboard: (
        type: "individual" | "organization" | "doctor" | "admin"
    ): string => `/auth/dashboard/${type}`,
    createAlert: (): string => "/alert/create",
    searchDonors: (): string => "/alert/find-donors",
    sendSelectedDonors: (): string => "/alert/get-donors-list",
    deleteAlertSent: (): string => "/alert/delete-alert-by-sender",
    deleteAlertReceived: (): string => "/alert/delete-alert-by-recipient",
    getReceivedAlerts: (): string => "/alert/get-received-alerts",
    getCreatedAlerts: (): string => "/alert/get-created-alerts",
    respondAlert: (): string => "/alert/respond-alert",
    showUpcomingEventsIndividual: (): string => "/event/get-upcoming-events",
    showEventsOrganization: (): string => "/event/get-events",
    showRegisteredEventsIndividual: (): string => "/event/get-registered-events",
    registerForEventByIndividual: (): string => "/event/register-by-self",
    registerForEventByDoctor: (): string => "/event/register-by-doctor",
    getEventsOfDoctor: (): string => "/event/get-events-of-doctor",
    getEventDetails: (): string => "/event/get-event-details",
    getAttendedDonors: (): string => "/event/get-attended-donors",
    fillBloodReport: (): string => "/report/fill-blood-report",
    editProfile: (type: "individual" | "organization"): string => `/auth/edit-profile/${type}`,
    uploadIndividualAvatar: (): string => "/auth/upload-avatar/individual",
};
