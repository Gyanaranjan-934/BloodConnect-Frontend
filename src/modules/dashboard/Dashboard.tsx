import React from "react";
import { AuthContext } from "../auth/AuthContext";
import IndividualDashboard from "./components/IndividualDashboard";
import OrganizationDashboard from "./components/OrganizationDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import { DashboardProvider } from "./DashboardContext";
import { Adminpage } from "../admin/AdminPage";
import { ErrorBoundary } from "react-error-boundary";

const Dashboard = () => {
    const { loggedInUserType } = React.useContext(AuthContext);

    let dashboardComponent = null;

    switch (loggedInUserType) {
        case "individual":
            dashboardComponent = <IndividualDashboard />;
            break;
        case "admin":
            dashboardComponent = <Adminpage />;
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

    return (
        <>
            <DashboardProvider>
                <div className="flex flex-col h-screen bg-gray-100 w-full">
                    <ErrorBoundary fallback={<div>Something went wrong</div>}>
                        {dashboardComponent}
                    </ErrorBoundary>
                </div>
            </DashboardProvider>
        </>
    );
};

export default Dashboard;
