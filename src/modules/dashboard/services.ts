import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import {
    IndividualDashboardType,
    OrganizationDashboardType,
    DoctorDashboardType,
} from "./types";

const accessToken = localStorage.getItem("accessToken");
const loginType = localStorage.getItem("loginType");
const config = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
};
export const getUserDashboard = async (): Promise<
    | IndividualDashboardType
    | OrganizationDashboardType
    | DoctorDashboardType
    | null
> => {
    if (!accessToken || !loginType) {
        throw new Error("Access token or login type is missing");
    }
    try {
        const dashboardDetails = await axiosInstance.get(
            createEndPoint.getDashboard(
                loginType as "individual" | "organization" | "doctor" | "admin"
            ),
            {
                ...config,
                headers: {
                    ...config.headers,
                    userType: loginType,
                },
            }
        );
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
