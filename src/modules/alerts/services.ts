/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import {
    AlertDetailsType,
    LocationType,
    NearbyDonorType,
    AlertType,
    ReceivedAlertType,
    NearbyOrganizationType,
} from "./utils";

export const getConfig = async (): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    userType: localStorage.getItem("loginType"),
                },
            };
            resolve(config);
        }, 10);
    });
};

export const getAlerts = async (): Promise<AlertType[]> => {
    try {
        const config = await getConfig();
        const createdAlerts = await axiosInstance.get(
            createEndPoint.getCreatedAlerts(),
            {
                headers: config.headers,
            }
        );
        return createdAlerts.data.data;
    } catch (error) {
        console.log("Error getting alert:", error);
        return [];
    }
};

export const createAlert = async (
    alertDetails: AlertDetailsType,
    selectedLocation: LocationType,
    address: string,
    accessToken: string,
    loggedInUserType: "individual" | "organization"
): Promise<NearbyDonorType[]> => {
    if (!accessToken) {
        console.log(accessToken);
        return [];
    }

    const formData = new FormData();

    Object.entries(alertDetails).forEach(([key, value]) => {
        if (key === "patientPhoto" && value instanceof Blob) {
            formData.append("patientImage", value);
        } else if (key === "coordinates") {
            formData.append(
                "currentLocationCoord",
                JSON.stringify(selectedLocation)
            );
        } else {
            formData.append(key, value ? value.toString() : "");
        }
    });
    formData.set("address", address);

    try {
        const { data } = await axiosInstance.post(
            createEndPoint.createAlert(),
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    userType: loggedInUserType,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        
        return data.data;
    } catch (error) {
        console.log("Error creating alert:", error);
        return [];
    }
};

export const searchDonors = async (
    currentLocation: LocationType
): Promise<NearbyOrganizationType[]> => {
    try {
        const config = await getConfig();
        const createdAlert = await axiosInstance.get(
            createEndPoint.searchDonors(),
            {
                headers: config.headers,
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
        console.log("Error finding donors:", error);
        return [];
    }
};

export const sendSelectedDonors = async (
    donors: NearbyDonorType[]
): Promise<void> => {
    try {
        const config = await getConfig();
        await axiosInstance.post(
            createEndPoint.sendSelectedDonors(),
            { donorList: donors },
            {
                headers: config.headers,
            }
        );
    } catch (error) {
        console.log("Error creating alert:", error);
    }
};

export const getReceivedAlerts = async (): Promise<ReceivedAlertType[]> => {
    try {
        const config = await getConfig();
        const createdAlerts = await axiosInstance.get(
            createEndPoint.getReceivedAlerts(),
            {
                headers: config.headers,
            }
        );
        
        return createdAlerts.data.data;
    } catch (error) {
        console.log("Error getting alert:", error);
        return [];
    }
};

export const deleteAlertSent = async (alertId: string): Promise<boolean> => {
    try {
        const config = await getConfig();
        const deletedAlert = await axiosInstance.delete(
            createEndPoint.deleteAlertSent(),
            { headers: config.headers, params: { alertId } }
        );
        if(deletedAlert.data.success){
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error deleting alert:", error);
        return false;
    }
};

export const deleteAlertReceived = async (alertId: string): Promise<boolean> => {
    console.log(alertId);
    try {
        const config = await getConfig();
        const deletedAlert = await axiosInstance.delete(
            createEndPoint.deleteAlertReceived(),
            { headers: config.headers, params: { alertId } }
        );
        if(deletedAlert.data.success){
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error deleting alert:", error);
        return false;
    }
};

export const respondAlert = async (
    alertId: string,
    isAccepted: boolean
): Promise<boolean> => {
    try {
        const config = await getConfig();
        const { data } = await axiosInstance.put(
            createEndPoint.respondAlert(),
            { alertId, isAccepted },
            {
                headers: config.headers,
            }
        );
        if (data.success) {
            if (isAccepted) {
                toast("Alert accepted successfully", { type: "success" });
            } else {
                toast("Alert rejected successfully", { type: "success" });
            }
            return true;
        } else {
            toast("Alert not responded", { type: "error" });
            return false;
        }
    } catch (error) {
        console.log("Error responding to alert:", error);
        toast("Error in responding to alert", { type: "error" });
        return false;
    }
};
