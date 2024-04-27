import React from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import IndividualDashboard from "./components/IndividualDashboard";
import AdminDashboard from "./components/AdminDashboard";
import OrganizationDashboard from "./components/OrganizationDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import ErrorBoundary from "../../ErrorBoundary";

const Dashboard = () => {
    const { loggedInUserType } = React.useContext(AuthContext);
    
    let dashboardComponent = null;

    switch (loggedInUserType) {
        case "individual":
            dashboardComponent = <IndividualDashboard />;
            break;
        case "admin":
            dashboardComponent = <AdminDashboard />;
            break;
        case "organization":
            dashboardComponent = <OrganizationDashboard />;
            break;
        case "doctor":
            dashboardComponent = <DoctorDashboard />;
            break;
        default:
            // Handle unexpected user types or display a fallback component
            dashboardComponent = (
                <p>Dashboard not available for this user type.</p>
            );
            break;
    }

    return <ErrorBoundary>{dashboardComponent}</ErrorBoundary>;
};

export default Dashboard;