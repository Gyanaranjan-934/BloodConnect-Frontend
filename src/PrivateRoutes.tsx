import { Route } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Events, { EventRoutes } from "./modules/events/index";
import AlertPage from "./modules/alerts/AlertPage";
import { AdminRoutes } from "./modules/admin/AdminPage";
import AppointmentPage from "./modules/appointment";
const PrivatePage = (
    <Route path="">
        <Route path="dashboard">
            <Route index element={<ProtectedRoute component={Dashboard} />} />
            {AdminRoutes}
        </Route>
        <Route path="alerts/*">
            <Route index element={<ProtectedRoute component={AlertPage} />} />
        </Route>
        <Route path="events/*">
            <Route index element={<ProtectedRoute component={Events} />} />
            {EventRoutes}
        </Route>
        <Route path="appointments" element={<ProtectedRoute component={AppointmentPage} />} />
    </Route>
);

export default PrivatePage;
