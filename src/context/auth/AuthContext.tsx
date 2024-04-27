/* eslint-disable @typescript-eslint/no-unused-vars */
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
import usePersistState from "./usePersistState";
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
    geoLocation: {
        latitude: number;
        longitude: number;
    };
    setGeoLocation: Dispatch<SetStateAction<any>>;
    registerOrganization: (data: any) => Promise<void>;
    registerDoctor: (data: any) => Promise<void>;
    loginUser: (
        data: any,
        type: "individual" | "organization" | "doctor" | "admin"
    ) => Promise<boolean>;
    loggedInUser: any;
    setLoggedInUser: Dispatch<SetStateAction<any>>;
    loggedInUserType: "individual" | "organization" | "doctor" | "admin";
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
        latitude: navigator.geolocation.watchPosition(
            (pos) => pos.coords.latitude
        ),
        longitude: navigator.geolocation.watchPosition(
            (pos) => pos.coords.latitude
        ),
    },
    setGeoLocation: () => {},
    registerOrganization: async (data: any): Promise<void> => {},
    registerDoctor: async (data: any): Promise<void> => {},
    loginUser: async (
        data: any,
        type: "individual" | "organization" | "doctor" | "admin"
    ): Promise<any> => {},
    loggedInUser: null,
    setLoggedInUser: () => {},
    loggedInUserType: "individual",
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [fcmToken, setFcmToken] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = usePersistState(
        "accessToken",
        false
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingValue, setLoadingValue] = useState<number>(0);
    const [geoLocation, setGeoLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [loggedInUser, setLoggedInUser] = useState();
    const [loggedInUserType, setLoggedInUserType] = useState<
        "individual" | "organization" | "doctor" | "admin"
    >("individual");

    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey:
                    "BPSW6Z9tSw-WLO4qvrxMZykj0R07mGFWl0bAUhtbaETegyVPTi9nuSQu6N1xzIkbikQ6-adQpHR7Rjk_09O6yuA",
            });
            setFcmToken(token || ""); // Use empty string as fallback
        } else if (permission === "denied") {
            setFcmToken("");
        }
    }

    const host = "http://localhost:8000/api/v1";
    const registerIndividual = async (data: any): Promise<void> => {
        console.log(data);
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
            formData.append("gender", data.gender);
            formData.append("avatar", data.avatar);
            const mongoUser = await axios.post(
                `${host}/auth/doctor/register`,
                formData
            );
            console.log(mongoUser.data); // Example usage
        } catch (error) {
            console.log(error);
        }
    };

    const loginUser = async (
        data: any,
        type: "individual" | "organization" | "doctor" | "admin"
    ): Promise<boolean> => {
        data.fcmToken = fcmToken;
        data.location = JSON.stringify(geoLocation);
        try {
            const userDetails = await axios.post(
                `${host}/auth/login/${type}`,
                data
            );
            console.log(userDetails);
            if (userDetails.statusText === "OK") {
                localStorage.clear();
                localStorage.setItem(
                    `accessToken`,
                    userDetails.data?.data?.accessToken
                );
                localStorage.setItem(
                    `refreshToken`,
                    userDetails.data?.data?.refreshToken
                );
                localStorage.setItem(
                    "loggedInUserData",
                    JSON.stringify(userDetails.data?.data?.user)
                );
                localStorage.setItem("loginType", type);
                setIsAuthenticated(true);
                setLoggedInUser(userDetails.data?.data?.user);
                setLoggedInUserType(type);
                return true;
            } else return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    useEffect(() => {
        const fetchAuthStatus = () => {
            setLoading(true);

            const token =
                localStorage.getItem("individualFirebaseToken") ||
                localStorage.getItem("organizationFirebaseToken") ||
                localStorage.getItem("doctorAccessToken");

            if (token) {
                const logUser = localStorage.getItem("loggedInUser");
                if (logUser) {
                    const user = JSON.parse(logUser);
                    setLoggedInUser(() => user);
                    setIsAuthenticated(() => true); // Set isAuthenticated immediately after user is logged in
                }
            }

            setLoading(false);
        };
        requestPermission();
        fetchAuthStatus();
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
    }, [isAuthenticated, setIsAuthenticated]);

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
                loginUser,
                loggedInUser,
                setLoggedInUser,
                loggedInUserType,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
