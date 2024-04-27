import axios from "axios";
import React, { useState } from "react";

type AlertContextType = {
    setAlert: (alert: string) => void;
    alert: string;
    createAlert: (alertDetails: any, patientImage: any) => Promise<any[]>;
    searchDonors: (currentLocation: any) => Promise<void>; 
    sendSelectedDonors: (donors: any) => Promise<void>;
};

export const AlertContext = React.createContext<AlertContextType>({
    setAlert: () => {},
    alert: "",
    createAlert: async() => {return []},
    searchDonors: async() => {},
    sendSelectedDonors: async() => {},
});

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const host = "http://localhost:8000/api/v1";
    const accessToken = localStorage.getItem("accessToken");
    const loginType = localStorage.getItem("loginType");
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            userType: loginType,
        },
    };
    const [alert, setAlert] = useState<string>("");

    const createAlert = async (alertDetails: any, patientImage: any) => {
        const formData = new FormData();
        console.log(alertDetails);
        
        formData.append("patientImage", patientImage);
        formData.append("patientName", alertDetails.patientName);
        formData.append("problemDescription", alertDetails.problemDescription);
        formData.append("age", alertDetails.patientAge);
        formData.append("gender", alertDetails.gender);
        formData.append("dateOfRequirement", alertDetails.dateOfRequirement);
        formData.append("expiryTime", alertDetails.timeOfRequirement);
        formData.append("address", alertDetails.address);
        formData.append(
            "currentLocationCoord",
            JSON.stringify(alertDetails.coordinates)
        );
        formData.append("noOfDonorsToSend", alertDetails.noOfDonorsToSend);
        formData.append("bloodGroup", alertDetails.bloodGroup);
        console.log(formData);
        try {
            const createdAlert = await axios.post(
                `${host}/alert/create`,
                formData,
                config
            );
            return createdAlert.data.data;
        } catch (error) {
            console.log("Error creating alert:", error);
            return [];
        }
    };

    const searchDonors = async (currentLocation: any) => {
        try {
            console.log(currentLocation);

            const createdAlert = await axios.get(`${host}/alert/find-donors`, {
                ...config,
                params: {
                    location: JSON.stringify({
                        longitude: currentLocation.longitude,
                        latitude: currentLocation.latitude,
                    }),
                },
            });
            console.log(createdAlert.data.data);
            return createdAlert.data.data;
        } catch (error) {
            console.log("Error creating alert:", error);
        }
    };

    const sendSelectedDonors = async (donors: any) => {
        try {
            console.log(donors);
            const createdAlert = await axios.post(
                `${host}/alert/get-donors-list`,
                {donorList:donors},
                config
            );
            console.log(createdAlert);
            
            // return createdAlert.data.data;
        } catch (error) {
            console.log("Error creating alert:", error);

        }
    };

    const contextValue: AlertContextType = {
        setAlert,
        alert,
        createAlert,
        searchDonors,
        sendSelectedDonors,
    };

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
};
