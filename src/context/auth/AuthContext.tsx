// TokenContext.js
import { getToken } from "firebase/messaging";
import React, { createContext, useState } from "react";
import { messaging } from "../../services/firebase";

interface AuthContextType {
    fcmToken: string;
    setFcmToken: React.Dispatch<React.SetStateAction<string>>; // Specify the correct type
}

export const AuthContext = createContext<AuthContextType>({
    fcmToken: "",
    setFcmToken: () => {}, // Empty function as placeholder
});

export const AuthProvider = ({ children }) => {
    const [fcmToken, setFcmToken] = useState("");
    async function requestPermission() {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            // Generate Token
            const token = await getToken(messaging, {
                vapidKey:
                    "BPSW6Z9tSw-WLO4qvrxMZykj0R07mGFWl0bAUhtbaETegyVPTi9nuSQu6N1xzIkbikQ6-adQpHR7Rjk_09O6yuA",
            });
            setFcmToken(token);
            console.log(token,fcmToken);
            
        } else if (permission === "denied") {
            setFcmToken("");
        }
    }
    React.useEffect(() => {
        // Req user for notification permission
        requestPermission();
    }, []);
    return (
        <AuthContext.Provider value={{ fcmToken, setFcmToken }}>
            {children}
        </AuthContext.Provider>
    );
};
