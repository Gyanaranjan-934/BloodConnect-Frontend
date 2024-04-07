/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "firebase/messaging";
import React, {
    createContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from "react";
import { messaging } from "../../services/firebase";
import axios from "axios";

interface AuthContextType {
    fcmToken: string;
    setFcmToken: Dispatch<SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    loadingValue: number;
    setLoadingValue: Dispatch<SetStateAction<number>>;
    registerIndividual: (data: any) => Promise<void>;
    geoLocation: any;
    setGeoLocation: Dispatch<SetStateAction<any>>;
    registerOrganization: (data: any) => Promise<void>;
    registerDoctor: (data: any) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    fcmToken: "",
    setFcmToken: () => {},
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    loading: false,
    setLoading: () => {},
    loadingValue: 0,
    setLoadingValue: () => {},
    registerIndividual: async (data: any): Promise<void> => {},
    geoLocation: {
        latitude: 0,
        longitude: 0,
    },
    setGeoLocation: () => {},
    registerOrganization: async (data: any): Promise<void> => {},
    registerDoctor: async (data: any): Promise<void> => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [fcmToken, setFcmToken] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingValue, setLoadingValue] = useState<number>(50);
    const [geoLocation, setGeoLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const checkAuthStatus = () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    };

    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey:
                    "BPSW6Z9tSw-WLO4qvrxMZykj0R07mGFWl0bAUhtbaETegyVPTi9nuSQu6N1xzIkbikQ6-adQpHR7Rjk_09O6yuA",
            });
            setFcmToken(token || ""); // Use empty string as fallback
            checkAuthStatus();
        } else if (permission === "denied") {
            setFcmToken("");
        }
    }

    const host = "http://localhost:8000/api/v1";
    const registerIndividual = async (data: any): Promise<void> => {
        try {
            console.log(data);
            const formData = new FormData();
            formData.append("fullName", data.name);
            formData.append("email", data.email);
            formData.append("phoneNo", data.phone);
            formData.append("password", data.password);
            formData.append("adhaarNo", data.adhaar);
            formData.append("bloodGroup", data.bloodGroup);
            formData.append(
                "presentAddress",
                JSON.stringify(data.presentAddress)
            );
            formData.append(
                "permanentAddress",
                JSON.stringify(data.permanentAddress)
            );
            formData.append("userDOB", data.userDOB);
            formData.append("avatar", data.avatar);
            formData.append("geolocation", JSON.stringify(geoLocation));
            const mongoUser = await axios.post(
                `${host}/auth/individual/register`,
                formData
            );
            console.log(mongoUser.data); // Example usage
        } catch (error) {
            console.log(error);
        }
    };

    const registerOrganization = async (data: any): Promise<void> => {
        try {
            console.log(data);
            const mongoUser = await axios.post(
                `${host}/auth/organization/register`,
                data
            );
            console.log(mongoUser.data); // Example usage
        } catch (error) {
            console.log(error);
        }
    };

    const registerDoctor = async (data: any): Promise<void> => {
        try {
            console.log(data);
            const formData = new FormData();
            formData.append("fullName", data.fullName);
            formData.append("email", data.email);
            formData.append("phoneNo", data.phoneNo);
            formData.append("password", data.password);
            formData.append("dateOfBirth", data.dateOfBirth);
            formData.append("doctorId", data.doctorId);
            formData.append("gender",data.gender)
            formData.append("avatar",data.avatar);
            const mongoUser = await axios.post(
                `${host}/auth/doctor/register`,
                formData
            );
            console.log(mongoUser.data); // Example usage
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        requestPermission();
        checkAuthStatus();
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setGeoLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                fcmToken,
                setFcmToken,
                isAuthenticated,
                setIsAuthenticated,
                loading,
                setLoading,
                loadingValue,
                setLoadingValue,
                registerIndividual,
                geoLocation,
                setGeoLocation,
                registerOrganization,
                registerDoctor,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
