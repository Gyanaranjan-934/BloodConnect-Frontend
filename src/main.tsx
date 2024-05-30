import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./modules/auth/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            await navigator.serviceWorker.register(
                "/firebase-messaging-sw.js"
            );
            // console.log("Service worker registered:", registration);
        } catch (error) {
            // console.error("Service worker registration failed:", error);
        }
    });
}

// const persister = createSyncStoragePersister({
//     storage: window.localStorage,
// });

const theme = {
    tabsHeader: {
        defaultProps: {
            className: "",
        },
        styles: {
            base: {
                display: "flex",
                position: "relative",
                bg: "bg-blue-gray-50",
                bgOpacity: "bg-opacity-60",
                borderRadius: "rounded-lg",
                p: "p-1",
                zIndex: 1,
            },
            horizontal: {
                flexDirection: "flex-row",
            },
            vertical: {
                flexDirection: "flex-col",
            },
        },
    },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider value={theme}>
                <BrowserRouter>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
