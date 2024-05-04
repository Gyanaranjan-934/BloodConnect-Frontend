import { Route } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Events from "./modules/events/index";
import AlertPage from "./modules/alerts/AlertPage";
const PrivatePage = (
    <Route path="">
        <Route
            path="dashboard"
            element={<ProtectedRoute component={Dashboard} />}
        />
        <Route path="alerts" element={<ProtectedRoute component={AlertPage} />} />
        <Route path="events" element={<ProtectedRoute component={Events} />} />
    </Route>
);

export default PrivatePage;
