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
    searchDonors: (): string => "/alert/get-donors",
    sendSelectedDonors: (): string => "/alert/get-donors-list",
    deleteAlertSent: (): string => "/alert/delete-alert-by-sender",
    deleteAlertReceived: (): string => "/alert/delete-alert-by-recipient",
    getReceivedAlerts: (): string => "/alert/get-received-alerts",
    getCreatedAlerts: (): string => "/alert/get-created-alerts",
};
