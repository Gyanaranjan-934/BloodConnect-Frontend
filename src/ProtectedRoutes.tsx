import { Navigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    return (
        <>
            {localStorage.getItem("accessToken") ? (
                <Component {...rest} />
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default ProtectedRoute;
