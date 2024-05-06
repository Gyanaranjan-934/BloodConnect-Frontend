import { Route } from "react-router-dom";
import Dashboard from "./modules/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Events, { EventRoutes } from "./modules/events/index";
import AlertPage from "./modules/alerts/AlertPage";
const PrivatePage = (
    <Route path="">
        <Route
            path="dashboard"
            element={<ProtectedRoute component={Dashboard} />}
        />
        <Route path="alerts/*">
            <Route index element={<ProtectedRoute component={AlertPage} />} />
        </Route>
        <Route path="events/*">
            <Route index element={<ProtectedRoute component={Events} />}/>
            {EventRoutes}
        </Route>
    </Route>
);

export default PrivatePage;
