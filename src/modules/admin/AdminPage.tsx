import { Route } from "react-router-dom";
import AllOrganizations from "./pages/AllOrganizations";
import AllEvents from "./pages/AllEvents";
import AdminDashboard from "./AdminDashboard";
import ProtectedRoute from "../../ProtectedRoutes";
import AllDoctors from "./pages/AllDoctors";

export const AdminRoutes = (
    <>
        <Route
            path="organizations"
            element={<ProtectedRoute component={AllOrganizations} />}
        />
        <Route
            path="events"
            element={<ProtectedRoute component={AllEvents} />}
        />
        <Route
            path="doctors"
            element={<ProtectedRoute component={AllDoctors} />}
        />
    </>
);

export const Adminpage = () => {
    return <AdminDashboard />;
};
