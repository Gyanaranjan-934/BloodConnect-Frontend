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
import { LocationType } from "../alerts/utils";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    geoLocation: LocationType;
    setGeoLocation: Dispatch<SetStateAction<LocationType>>;
    loggedInUser: any;
    setLoggedInUser: Dispatch<SetStateAction<any>>;
    loggedInUserType: "individual" | "organization" | "doctor" | "admin";
    setLoggedInUserType: Dispatch<
        SetStateAction<"individual" | "organization" | "doctor" | "admin">
    >;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    geoLocation: {
        latitude: navigator.geolocation.watchPosition(
            (pos) => pos.coords.latitude
        ),
        longitude: navigator.geolocation.watchPosition(
            (pos) => pos.coords.latitude
        ),
    },
    setGeoLocation: () => {},
    loggedInUser: null,
    setLoggedInUser: () => {},
    loggedInUserType: "individual",
    setLoggedInUserType: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = usePersistState(
        "accessToken",
        false
    );
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
        }
    }

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
                isAuthenticated,
                setIsAuthenticated,
                geoLocation,
                setGeoLocation,
                loggedInUser,
                setLoggedInUser,
                loggedInUserType,
                setLoggedInUserType,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
