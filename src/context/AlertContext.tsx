/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AlertDetailsType, AlertType, NearByUserType } from "../modules/alerts/utils";
import createEndPoint, { axiosInstance } from "../services/createEndPoint";

type AlertContextType = {
    createAlert: (alertDetails: any) => Promise<NearByUserType[]>;
    searchDonors: (currentLocation: any) => Promise<NearByUserType[]>;
    sendSelectedDonors: (donors: any) => Promise<void>;
    getAlerts: () => Promise<AlertType[]>;
    getReceivedAlerts: () => Promise<AlertType[]>;
    deleteAlertSent: (alertId: string) => Promise<void>;
    deleteAlertReceived: (alertId: string) => Promise<void>;
};

export const AlertContext = React.createContext<AlertContextType>({
    createAlert: async () => [],
    searchDonors: async () => [],
    sendSelectedDonors: async () => {},
    getAlerts: async () => [],
    getReceivedAlerts: async () => [],
    deleteAlertSent: async () => {},
    deleteAlertReceived: async () => {},
});

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const accessToken = localStorage.getItem("accessToken");
    const loginType = localStorage.getItem("loginType");
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            userType: loginType,
        },
    };

    const createAlert = async (
        alertDetails: AlertDetailsType
    ): Promise<NearByUserType[]> => {
        const formData = new FormData();

        Object.entries(alertDetails).forEach(([key, value]) => {
            if (key === "patientPhoto" && value instanceof Blob) {
                formData.append("patientImage", value);
            } else if (key === "coordinates") {
                formData.append("currentLocationCoord", JSON.stringify(value));
            } else {
                formData.append(key, value ? value.toString() : "");
            }
        });

        try {
            const { data } = await axiosInstance.post(
                createEndPoint.createAlert(),
                formData,
                config
            );
            return data.data;
        } catch (error) {
            console.log("Error creating alert:", error);
            return [];
        }
    };

    const searchDonors = async (
        currentLocation: any
    ): Promise<NearByUserType[]> => {
        try {
            const createdAlert = await axiosInstance.get(
                createEndPoint.searchDonors(),
                {
                    ...config,
                    params: {
                        location: JSON.stringify({
                            longitude: currentLocation.longitude,
                            latitude: currentLocation.latitude,
                        }),
                    },
                }
            );
            return createdAlert.data.data;
        } catch (error) {
            console.log("Error creating alert:", error);
            return [];
        }
    };

    const sendSelectedDonors = async (donors: any) : Promise<void> => {
        try {
            await axiosInstance.post(
                createEndPoint.sendSelectedDonors(),
                { donorList: donors },
                config
            );
        } catch (error) {
            console.log("Error creating alert:", error);
        }
    };

    const getAlerts = async () : Promise<AlertType[]> => {
        try {
            const createdAlerts = await axiosInstance.get(
                createEndPoint.getCreatedAlerts(),
                {
                    ...config,
                }
            );
            console.log(createdAlerts);
            return createdAlerts.data.data;
        } catch (error) {
            console.log("Error getting alert:", error);
            return [];
        }
    };

    const getReceivedAlerts = async () : Promise<AlertType[]> => {
        try {
            const createdAlerts = await axiosInstance.get(
                createEndPoint.getReceivedAlerts(),
                {
                    ...config,
                }
            );
            console.log(createdAlerts);
            return createdAlerts.data.data;
        } catch (error) {
            console.log("Error getting alert:", error);
            return [];
        }
    };

    const deleteAlertSent = async (alertId: string) : Promise<void> => {
        try {
            const createdAlert = await axiosInstance.delete(
                createEndPoint.deleteAlertSent(),
                { ...config, params: { alertId } }
            );
            console.log(createdAlert);

            // return createdAlert.data.data;
        } catch (error) {
            console.log("Error deleting alert:", error);
        }
    };

    const deleteAlertReceived = async (alertId: string) : Promise<void> => {
        console.log(alertId);
        try {
            const createdAlert = await axiosInstance.delete(
                createEndPoint.deleteAlertReceived(),
                { ...config, params: { alertId } }
            );
            console.log(createdAlert);

            // return createdAlert.data.data;
        } catch (error) {
            console.log("Error deleting alert:", error);
        }
    };
    const contextValue: AlertContextType = {
        createAlert,
        searchDonors,
        sendSelectedDonors,
        getAlerts,
        getReceivedAlerts,
        deleteAlertSent,
        deleteAlertReceived,
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
};
