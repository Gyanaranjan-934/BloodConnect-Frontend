import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import { AlertProvider } from "./modules/alerts/AlertContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faBell, fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "./modules/auth/AuthContext";
import React from "react";
import { Sidebar } from "./components/utils/Sidebar";
import { Navbar } from "./components/utils/Navbar";
import { Badge, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationComponent from "./components/utils/NotificationComponent";

library.add(fab, fas, far);

function App() {
    const { isAuthenticated } = React.useContext(AuthContext);
    const [notificationOpen, setNotificationOpen] = React.useState(false);
    return (
        <AlertProvider>
            <div className="w-screen h-screen">
                {isAuthenticated ? (
                    <div className="flex w-full">
                        <div className="w-[20%]">
                            <Sidebar />
                        </div>
                        <div className="w-[80%] relative">
                            <div className="absolute top-1 z-50 right-2">
                                <Button
                                    placeholder={"Notification"}
                                    className="bg-transparent shadow-none hover:shadow-none"
                                    onClick={() =>
                                        setNotificationOpen(!notificationOpen)
                                    }
                                >
                                    <Badge content={5}>
                                        <FontAwesomeIcon
                                            color="black"
                                            size="2x"
                                            icon={faBell}
                                        />
                                    </Badge>
                                </Button>
                                <div className="mt-2 w-full">
                                    <NotificationComponent
                                        isNotificationOpen={notificationOpen}
                                    />
                                </div>
                            </div>
                            <Routes>
                                <Route path="/*" element={<MainPage />} />
                            </Routes>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Navbar />
                        <div>
                            <Routes>
                                <Route path="/*" element={<MainPage />} />
                            </Routes>
                        </div>
                    </div>
                )}
            </div>
        </AlertProvider>
    );
}

export default App;
