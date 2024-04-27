import { Route } from "react-router-dom";
import Dashboard from "../modules/dashboard/Dashboard";
import ProtectedRoute from "../ProtectedRoutes";

const PrivatePage = (
    <Route path="">
        <Route
            path="dashboard"
            element={<ProtectedRoute component={Dashboard} />}
        />
    </Route>
);

export default PrivatePage;
