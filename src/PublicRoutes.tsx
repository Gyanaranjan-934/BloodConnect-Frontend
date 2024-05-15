import { Route } from "react-router-dom";
import About from "./pages/utils/About";
import Contact from "./pages/utils/Contact";
import { Home } from "./pages/HomePage";
import TermsAndConditions from "./components/utils/TermsAndConditions";

const PublicPage = (
    <Route path="">
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
    </Route>
);

export default PublicPage;
