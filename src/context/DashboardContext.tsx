/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "./auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { DefaultIndividual } from "../services/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type DashboardContextType = {
    getUserDashboard: () => Promise<void>;
    individualDashboard: IndividualDetailsType | null;
    setIndividualDashboard: React.Dispatch<
        React.SetStateAction<IndividualDetailsType>
    >;
    getDashboardDetails: () => Promise<AxiosResponse<any, any>>;
};

export const DashboardContext = React.createContext<DashboardContextType>({
    getUserDashboard: () => Promise.resolve(),
    setIndividualDashboard: () => {},
    individualDashboard: null,
    getDashboardDetails: () => Promise.resolve(),
});

export type IndividualDetailsType = {
    _id: string;
    email: string;
    fullName: string;
    avatar: string;
    adhaarNo: string;
    dateOfBirth: string;
    permanentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: number;
        _id: string;
    };
    presentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: number;
        _id: string;
    };
    phoneNo: string;
    password: string;
    receivedAlerts: any[];
    bloodReports: any[];
    eventsRegistered: any[];
    eventsAttended: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    refreshToken: string;
    currentLocation: {
        latitude: number;
        longitude: number;
    };
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { geoLocation, isAuthenticated } = React.useContext(AuthContext);
    const [individualDashboard, setIndividualDashboard] =
        React.useState<IndividualDetailsType>(DefaultIndividual);
    const { setIsAuthenticated } = React.useContext(AuthContext);
    const host = "http://localhost:8000/api/v1";
    const accessToken = localStorage.getItem("accessToken");
    const loginType = localStorage.getItem("loginType");
    
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            userType: loginType,
        },
    };
    const navigate = useNavigate();

    
    const getDashboardDetails = async () => {
        return await axios.get(`${host}/auth/dashboard/${loginType}`, config);
    };
    

    
    const getUserDashboard = async () => {
        try {
            if (!accessToken || !loginType) {
                throw new Error("Access token or login type is missing");
            }

            const dashboardDetails: AxiosResponse<any> = await axios.get(
                `${host}/auth/dashboard/${loginType}`,
                config
            );

            console.log(dashboardDetails.data.data);
            if (dashboardDetails.data.message === "jwt expired") {
                setIsAuthenticated(false);
                <Navigate to={"/login"} />;
            } else {
                const response = dashboardDetails.data?.data;
                if (response) {
                    if (loginType === "individual") {
                        const userDashboardDetails: IndividualDetailsType = {
                            ...response,
                            currentLocation: {
                                latitude: geoLocation.latitude,
                                longitude: geoLocation.longitude,
                            },
                        };
                        setIndividualDashboard(userDashboardDetails);
                    }
                }
            }
        } catch (error) {
            console.log("Error fetching dashboard:", error);
        }
    };

    const contextValue: DashboardContextType = {
        getUserDashboard,
        individualDashboard,
        setIndividualDashboard,
        getDashboardDetails,
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
};
