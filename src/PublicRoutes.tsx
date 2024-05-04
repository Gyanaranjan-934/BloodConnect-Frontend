import { Route } from "react-router-dom";
import LoginPage from "./modules/auth/LoginPage";
import { RegistrationPage } from "./modules/auth/RegistrationPage";
import FeedPage from "./pages/FeedPage";
import About from "./pages/utils/About";
import Contact from "./pages/utils/Contact";
import { Home } from "./pages/HomePage";
import TermsAndConditions from "./components/utils/TermsAndConditions";

const PublicPage = (
    <Route path="">
        <Route index element={<Home />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="feeds/*" element={<FeedPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
    </Route>
);

export default PublicPage;
