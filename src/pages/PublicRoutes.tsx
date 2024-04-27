import { Route } from "react-router-dom";
import LoginPage from "../modules/auth/LoginPage";
import { RegistrationPage } from "../modules/auth/RegistrationPage";
import FeedPage from "./FeedPage";
import About from "./utils/About";
import Contact from "./utils/Contact";
import { Home } from "./HomePage";

const PublicPage = (
    <Route path="">
        <Route index element={<Home />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="feeds/*" element={<FeedPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
    </Route>
);

export default PublicPage;
