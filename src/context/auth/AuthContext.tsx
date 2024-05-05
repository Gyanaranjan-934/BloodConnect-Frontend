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
import {
    DoctorType,
    IndividualUserType,
    OrganizationType,
} from "../../modules/auth/utils";
import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { LocationType } from "../../modules/alerts/utils";

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
    geoLocation: LocationType;
    setGeoLocation: Dispatch<SetStateAction<LocationType>>;
    registerOrganization: (data: any) => Promise<void>;
    registerDoctor: (data: any) => Promise<void>;
    loginUser: (
        data: any,
        type: "individual" | "organization" | "doctor" | "admin"
    ) => Promise<boolean>;
    loggedInUser: any;
    setLoggedInUser: Dispatch<SetStateAction<any>>;
    loggedInUserType: "individual" | "organization" | "doctor" | "admin";
    getLocation?: () => LocationType;
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
    registerIndividual: async (): Promise<void> => {},
    geoLocation: {
        latitude: navigator.geolocation.watchPosition(
            (pos) => pos.coords.latitude
        ),
        longitude: navigator.geolocation.watchPosition(
            (pos) => pos.coords.latitude
        ),
    },
    setGeoLocation: () => {},
    registerOrganization: async (): Promise<void> => {},
    registerDoctor: async (): Promise<void> => {},
    loginUser: async (): Promise<any> => {},
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
    const [geoLocation, setGeoLocation] = useState<LocationType>({
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

    const registerIndividual = async (
        data: IndividualUserType
    ): Promise<void> => {
        try {
            data.currentLocation = {
                latitude: geoLocation.latitude,
                longitude: geoLocation.longitude,
            };
            console.log(data);
            const mongoUser = await axiosInstance.post(
                createEndPoint.createIndividual(),
                data
            );
            console.log(mongoUser.data);
        } catch (error) {
            console.log(error);
        }
    };

    const registerOrganization = async (
        data: OrganizationType
    ): Promise<void> => {
        try {
            data.currentLocation = {
                latitude: geoLocation.latitude,
                longitude: geoLocation.longitude,
            };
            console.log(data);
            const mongoUser = await axiosInstance.post(
                createEndPoint.createOrganization(),
                data
            );
            console.log(mongoUser.data);
        } catch (error) {
            console.log(error);
        }
    };

    const registerDoctor = async (data: DoctorType): Promise<void> => {
        try {
            console.log(data);
            const mongoUser = await axiosInstance.post(
                createEndPoint.createDoctor(),
                data
            );
            console.log(mongoUser.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loginUser = async (
        data: any,
        type: "individual" | "organization" | "doctor" | "admin"
    ): Promise<boolean> => {
        data.location = JSON.stringify(geoLocation);
        try {
            const userDetails = await axiosInstance.post(
                createEndPoint.loginUser(type),
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

    const getLocation = (): LocationType => {
        const location: LocationType = {
            latitude: 0,
            longitude: 0,
        };

        navigator.geolocation.watchPosition((position) => {
            console.log(position);
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
            setGeoLocation(location);
        });

        console.log(location);
        return location;
    };

    useEffect(() => {
        const fetchAuthStatus = () => {
            const token =
                localStorage.getItem("individualFirebaseToken") ||
                localStorage.getItem("organizationFirebaseToken") ||
                localStorage.getItem("doctorAccessToken");

            if (token) {
                const logUser = localStorage.getItem("loggedInUser");
                if (logUser) {
                    const user = JSON.parse(logUser);
                    setLoggedInUser(() => user);
                    setIsAuthenticated(() => true);
                }
            }
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

        const userTypeInLocalStorage = localStorage.getItem("loginType");
        if (userTypeInLocalStorage) {
            setLoggedInUserType(
                userTypeInLocalStorage === "individual"
                    ? "individual"
                    : userTypeInLocalStorage === "organization"
                      ? "organization"
                      : userTypeInLocalStorage === "doctor"
                        ? "doctor"
                        : "admin"
            );
        }
    }, [isAuthenticated, setIsAuthenticated, loggedInUserType]);

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
                getLocation,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
