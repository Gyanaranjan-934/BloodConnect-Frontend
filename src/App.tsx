import { getToken } from "firebase/messaging";
import { messaging } from "./services/firebase";
import { RegistrationPage } from "./pages/registration";
import { useEffect } from "react";
import { AuthProvider } from "./context/auth/AuthContext";

function App() {
    return (
        <>
            <AuthProvider>
                <RegistrationPage />
            </AuthProvider>
        </>
    );
}

export default App;
