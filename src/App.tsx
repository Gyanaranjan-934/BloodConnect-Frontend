import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import NavbarLayout from "./components/utils/Navbar";
import NotFoundPage from "./components/utils/NotFoundPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

library.add(fab, fas, far);

function App() {
    return (
        <div className="">
            <ToastContainer />
            <div className="flex justify-center">
                <NavbarLayout />
            </div>
            <div className=" mt-16">
                <Routes>
                    <Route path="/*" element={<MainPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
