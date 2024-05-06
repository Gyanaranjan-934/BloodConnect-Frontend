import React, { ReactElement } from "react";
import { AuthContext } from "../modules/auth/AuthContext";
import PrivateHomePage from "./PrivateHomePage";
import PublicHomePage from "./PublicHomePage";

export const Home = (): ReactElement => {
    const { isAuthenticated } = React.useContext(AuthContext);
    return <>{isAuthenticated ? <PrivateHomePage /> : <PublicHomePage />}</>;
};
