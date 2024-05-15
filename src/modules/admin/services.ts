/* eslint-disable @typescript-eslint/no-explicit-any */
import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { LoginFormType, LoginResposneType } from "../auth/types";
import { EventType } from "../events/utils";
import { AdminDashboardType, DoctorType, OrganizationType } from "./types";

const getConfig = async (): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    userType: "admin",
                },
            };
            resolve(config);
        }, 10);
    });
};

export const getAllOrganizations = async (
    pageNo: number
): Promise<{
    organizations: OrganizationType[];
    pageNo: number;
    totalCount: number;
} | null> => {
    try {
        const config = await getConfig();
        const organizations = await axiosInstance.get(
            createEndPoint.getAllOrganizations(),
            {
                headers: config.headers,
                params: {
                    pageNo,
                },
            }
        );
        console.log(organizations);

        return organizations.data.data;
    } catch (error) {
        console.log("Error getting organizations:", error);
        return null;
    }
};

export const getOrganizationById = async (
    organizationId: string
): Promise<OrganizationType | null> => {
    try {
        const config = await getConfig();
        const organization = await axiosInstance.get(
            createEndPoint.getOrganizationById(organizationId),
            {
                headers: config.headers,
            }
        );
        if (organization.data.success) {
            return organization.data.data;
        }
        return null;
    } catch (error) {
        console.log("Error getting organization:", error);
        return null;
    }
};

export const getAllEvents = async (
    pageNo: number
): Promise<{
    events: EventType[];
    pageNo: number;
    totalCount: number;
} | null> => {
    try {
        const config = await getConfig();
        const events = await axiosInstance.get(
            createEndPoint.getAllEventstoAdmin(),
            {
                headers: config.headers,
                params: {
                    pageNo,
                },
            }
        );
        console.log(events);

        return events.data.data;
    } catch (error) {
        console.log("Error getting events:", error);
        return null;
    }
};

export const getAllDoctors = async (
    pageNo: number
): Promise<{
    doctors: DoctorType[];
    pageNo: number;
    totalCount: number;
} | null> => {
    try {
        const config = await getConfig();
        const doctors = await axiosInstance.get(
            createEndPoint.getAllDoctors(),
            {
                headers: config.headers,
                params: {
                    pageNo,
                },
            }
        );
        console.log(doctors);

        return doctors.data.data;
    } catch (error) {
        console.log("Error getting doctors:", error);
        return null;
    }
};  

export const verifyOrganization = async (
    organizationId: string
): Promise<boolean> => {
    try {
        const config = await getConfig();
        console.log(config);

        const response = await axiosInstance.patch(
            createEndPoint.verifyOrganization(organizationId),
            {},
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error verifying organization:", error);
        return false;
    }
};

export const verifyEvent = async (eventId: string): Promise<boolean> => {
    try {
        const config = await getConfig();
        const response = await axiosInstance.patch(
            createEndPoint.verifyEvent(eventId),
            {},
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error verifying event:", error);
        return false;
    }
};

export const verifyDoctor = async (doctorId: string): Promise<boolean> => {
    try {
        const config = await getConfig();
        const response = await axiosInstance.patch(
            createEndPoint.verifyDoctor(doctorId),
            {},
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error verifying doctor:", error);
        return false;
    }
};

export const deleteOrganization = async (
    organizationId: string
): Promise<boolean> => {
    try {
        const config = await getConfig();
        const response = await axiosInstance.delete(
            createEndPoint.deleteOrganization(organizationId),
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error deleting organization:", error);
        return false;
    }
};

export const deleteEvent = async (eventId: string): Promise<boolean> => {
    try {
        const config = await getConfig();
        const response = await axiosInstance.delete(
            createEndPoint.deleteEvent(eventId),
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error deleting event:", error);
        return false;
    }
};

export const deleteDoctor = async (doctorId: string): Promise<boolean> => {
    try {
        const config = await getConfig();
        const response = await axiosInstance.delete(
            createEndPoint.deleteDoctor(doctorId),
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error deleting doctor:", error);
        return false;
    }
};

export const loginAdmin = async (
    userDetails: LoginFormType
): Promise<LoginResposneType> => {
    try {
        const response = await axiosInstance.post(createEndPoint.loginAdmin(), {
            ...userDetails,
        });
        if (response.data.success) {
            localStorage.setItem("loginType", "admin");
            localStorage.setItem("accessToken", response.data.data.accessToken);
            localStorage.setItem(
                "refreshToken",
                response.data.data.refreshToken
            );
            return {
                success: true,
                userData: response.data.data,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
            };
        }
        return {
            success: false,
        };
    } catch (error) {
        console.log("Error logging in as admin:", error);
        return {
            success: false,
        };
    }
};

export const getAdminDashboard =
    async (): Promise<AdminDashboardType | null> => {
        try {
            const config = await getConfig();
            const dashboardDetails = await axiosInstance.get(
                createEndPoint.getAdminDashboard(),
                {
                    headers: config.headers,
                }
            );
            if (dashboardDetails.data.success) {
                return dashboardDetails.data.data as AdminDashboardType;
            }
            return null;
        } catch (error) {
            console.log("Error getting admin dashboard:", error);
            return null;
        }
    };
