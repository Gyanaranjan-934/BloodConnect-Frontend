import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./modules/auth/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

const queryClient = new QueryClient();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const registration = await navigator.serviceWorker.register(
                "/firebase-messaging-sw.js"
            );
            // console.log("Service worker registered:", registration);
        } catch (error) {
            // console.error("Service worker registration failed:", error);
        }
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrowserRouter>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
