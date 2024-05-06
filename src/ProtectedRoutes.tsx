import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <>
            {localStorage.getItem("accessToken") ? (
                <Component {...rest} />
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default ProtectedRoute;
