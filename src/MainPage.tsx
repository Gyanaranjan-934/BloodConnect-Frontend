import { Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const MainPage = () => {
    return (
        <Routes>
            {PublicRoutes}
            {PrivateRoutes}
        </Routes>
    );
};

export default MainPage;
