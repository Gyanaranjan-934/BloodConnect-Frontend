import { Routes, Route } from "react-router-dom";
import PublicPage from "../PublicRoutes";
import PrivatePage from "../PrivateRoutes";

const MainPage = () => {
    return (
        <Routes>
            <Route path="/">
                {PublicPage}
                {PrivatePage}
            </Route>
        </Routes>
    );
};

export default MainPage;
