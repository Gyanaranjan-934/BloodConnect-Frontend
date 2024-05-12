import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { getConfig } from "../alerts/services";
import {
    IndividualDashboardType,
    OrganizationDashboardType,
    DoctorDashboardType,
} from "./types";

export const getUserDashboard = async (
    loginType?: string
): Promise<
    | IndividualDashboardType
    | OrganizationDashboardType
    | DoctorDashboardType
    | null
> => {

    const config = await getConfig();

    try {
        const dashboardDetails = await axiosInstance.get(
            createEndPoint.getDashboard(
                loginType as "individual" | "organization" | "doctor" | "admin"
            ),
            {
                headers: config.headers,
            }
        );

        if(!dashboardDetails.data.success){
            localStorage.clear();
            window.location.href = "/";
        }

        console.log(dashboardDetails);
        
        
        const dashboardData = dashboardDetails.data?.data;
        if (loginType === "individual") {
            return dashboardData as IndividualDashboardType;
        } else if (loginType === "organization") {
            return dashboardData as OrganizationDashboardType;
        }
        return dashboardData as DoctorDashboardType;
    } catch (error) {
        console.log("Error fetching dashboard:", error);
        return null;
    }
};

export const uploadIndividualAvatar = async (
    userAvatar: File | undefined,
    accessToken?: string|null
): Promise<void> => {
    try {
        const config = await getConfig();
        if (!userAvatar || !accessToken) {
            return;
        }
        const formData = new FormData();
        formData.append("avatar", userAvatar);
        const response = await axiosInstance.patch(
            createEndPoint.uploadIndividualAvatar(),
            formData,
            {
                headers: config.headers,
            }
        );
        console.log(response);
    } catch (error) {
        console.log("Error uploading avatar:", error);
    }
};