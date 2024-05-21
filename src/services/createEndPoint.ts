import axios from "axios";

const host = import.meta.env.VITE_SERVER_URL;

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
    showRegisteredEventsIndividual: (): string =>
        "/event/get-registered-events",
    registerForEventByIndividual: (): string => "/event/register-by-self",
    registerForEventByDoctor: (): string => "/event/register-by-doctor",
    getEventsOfDoctor: (): string => "/event/get-events-of-doctor",
    getEventDetails: (): string => "/event/get-event-details",
    getAttendedDonors: (): string => "/event/get-attended-donors",
    fillBloodReport: (): string => "/report/fill-blood-report",
    editProfile: (type: "individual" | "organization"): string =>
        `/auth/edit-profile/${type}`,
    uploadIndividualAvatar: (): string => "/auth/upload-avatar/individual",
    getAllOrganizations: (): string => "/admin/get-all-organizations",
    getOrganizationById: (organizationId: string): string =>
        `/admin/get-organization-details/${organizationId}`,
    verifyOrganization: (organizationId: string): string =>
        `/admin/verify-organization/${organizationId}`,
    verifyEvent: (eventId: string): string => `/admin/verify-event/${eventId}`,
    verifyDoctor: (doctorId: string): string =>
        `/admin/verify-doctor/${doctorId}`,
    deleteOrganization: (organizationId: string): string =>
        `/admin/delete-organization/${organizationId}`,
    deleteEvent: (eventId: string): string => `/admin/delete-event/${eventId}`,
    deleteDoctor: (doctorId: string): string =>
        `/admin/delete-doctor/${doctorId}`,
    loginAdmin: (): string => "/admin/login",
    getAdminDashboard: (): string => "/admin/get-admin-dashboard",
    getAllEventstoAdmin: (): string => "/admin/get-all-events",
    getAllDoctors: (): string => "/admin/get-all-doctors",
    createAppointment: (): string => "/appointment/create",
    getAppointments: (): string => "/appointment/get-appointments",
    respondAppointment: (appointmentId: string): string =>
        `/appointment/respond-appointment/${appointmentId}`,
    getBloodReports: (): string => "/report/get-blood-reports",
    updateEvent: (): string => "/event/update-event",
};
