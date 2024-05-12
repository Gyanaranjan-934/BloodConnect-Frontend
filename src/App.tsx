import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import NavbarLayout from "./components/utils/Navbar";
import React from "react";
// import { ToastContainer } from "react-toastify";

library.add(fab, fas, far);

function App() {
    return (
        <div className="w-screen h-screen">
            <div className="flex justify-center">
                <NavbarLayout />
            </div>
            <div className=" mt-16">
                <Routes>
                    <Route path="/*" element={<MainPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
