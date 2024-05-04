/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import {
    IndividualDashboardType,
    OrganizationDashboardType,
    DoctorDashboardType,
} from "./types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

type DashboardContextType = {
    getUserDashboard: () => Promise<
        | IndividualDashboardType
        | OrganizationDashboardType
        | DoctorDashboardType
        | any
    >;
};

export const DashboardContext = React.createContext<DashboardContextType>({
    getUserDashboard: async () => {},
});

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const accessToken = localStorage.getItem("accessToken");
    const loginType = localStorage.getItem("loginType");
    const navigate = useNavigate();
    const { setIsAuthenticated } = React.useContext(AuthContext);
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const userType: "individual" | "organization" | "doctor" | "admin" =
        loginType === "individual"
            ? "individual"
            : loginType === "organization"
              ? "organization"
              : loginType === "doctor"
                ? "doctor"
                : "admin";

    const getUserDashboard = async (): Promise<
        | IndividualDashboardType
        | OrganizationDashboardType
        | DoctorDashboardType
        | any
    > => {
        if (!accessToken || !loginType) {
            throw new Error("Access token or login type is missing");
        }
        try {
            const dashboardDetails = await axiosInstance.get(
                createEndPoint.getDashboard(userType),
                {
                    ...config,
                    headers: {
                        ...config.headers,
                        userType: userType,
                    },
                }
            );
            if (dashboardDetails.data.message === "jwt expired") {
                localStorage.clear();
                setIsAuthenticated(false);
                navigate("/login");
            }
            const dashboardData = dashboardDetails.data?.data;

            

            if (userType === "individual") {
                return dashboardData as IndividualDashboardType;
            } else if (userType === "organization") {
                return dashboardData as OrganizationDashboardType;
            } else if (userType === "doctor") {
                return dashboardData as DoctorDashboardType;
            }
            return dashboardData as any;
        } catch (error) {
            console.log("Error fetching dashboard:", error);
            navigate("/login");
            return null;
        }
    };

    const contextValue: DashboardContextType = {
        getUserDashboard,
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
};
