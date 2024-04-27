import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/auth/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext);
    console.log(isAuthenticated);

    return (
        <>
            {isAuthenticated || localStorage.getItem("accessToken") ? (
                <Component {...rest} />
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default ProtectedRoute;
