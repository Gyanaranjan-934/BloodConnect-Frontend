import { ErrorBoundary } from "react-error-boundary";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    return (
        <>
            {localStorage.getItem("accessToken") ? (
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <Component {...rest} />
                </ErrorBoundary>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default ProtectedRoute;
