import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
// index.js

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            const registration = await navigator.serviceWorker.register(
                "/firebase-messaging-sw.js"
            );
            console.log("Service worker registered:", registration);
        } catch (error) {
            console.error("Service worker registration failed:", error);
        }
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
