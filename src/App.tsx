import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/auth/AuthContext";
import { RegistrationPage } from "./pages/registration";
import LoginPage from "./pages/login";
import { Home } from "./pages/home";
import ErrorBoundary from "./ErrorBoundary";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import { StickyNavbar } from "./components/utils/Navbar";
import { Progress } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {loadingValue} = React.useContext(AuthContext);
    return (
        <AuthProvider>
            <Router>
                <StickyNavbar />
                <ToastContainer stacked newestOnTop />
                <Progress
                    placeholder={"progress bar"}
                    value={loadingValue}
                    color={"red"}
                    style={{ height: "4px" }}
                />
                <Routes>
                    <Route
                        path="/register"
                        element={
                            <ErrorBoundary>
                                <RegistrationPage />
                            </ErrorBoundary>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <ErrorBoundary>
                                <LoginPage />
                            </ErrorBoundary>
                        }
                    />
                    <Route path="/home" element={<Home />} />
                    {/* Use ProtectedRoute within a Route's element */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute
                                component={Dashboard} // Pass the component as a prop
                            />
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
