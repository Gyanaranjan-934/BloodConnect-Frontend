import { toast } from "react-toastify";
import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import {
    AlertDetailsType,
    LocationType,
    NearByUserType,
    AlertType,
} from "./utils";

const accessToken = localStorage.getItem("accessToken");
const loginType = localStorage.getItem("loginType");
const config = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
        userType: loginType,
    },
};

export const createAlert = async (
    alertDetails: AlertDetailsType,
    selectedLocation: LocationType,
    address: string
): Promise<NearByUserType[]> => {
    console.log(selectedLocation, address);

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
            config
        );
        console.log(data);
        return data.data;
    } catch (error) {
        console.log("Error creating alert:", error);
        return [];
    }
};

export const searchDonors = async (
    currentLocation: LocationType
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

export const sendSelectedDonors = async (
    donors: NearByUserType[]
): Promise<void> => {
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

export const getAlerts = async (): Promise<AlertType[]> => {
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

export const getReceivedAlerts = async (): Promise<AlertType[]> => {
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

export const deleteAlertSent = async (alertId: string): Promise<void> => {
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

export const deleteAlertReceived = async (alertId: string): Promise<void> => {
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

export const respondAlert = async (
    alertId: string,
    isAccepted: boolean
): Promise<void> => {
    try {
        const { data } = await axiosInstance.put(
            createEndPoint.respondAlert(),
            { alertId, isAccepted },
            config
        );
        if (data.success) {
            if (isAccepted) {
                toast("Alert accepted successfully", { type: "success" });
            } else {
                toast("Alert rejected successfully", { type: "success" });
            }
        } else {
            toast("Alert not responded", { type: "error" });
        }
    } catch (error) {
        console.log("Error responding to alert:", error);
        toast("Error in responding to alert", { type: "error" });
    }
};
