import React from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
    Badge,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../modules/auth/AuthContext";
import { Link } from "react-router-dom";
import { ProfileMenu } from "./ProfileMenu";
import NavList from "./NavList";
import ErrorBoundary from "../../ErrorBoundary";
import CreateAlertForm from "../../modules/alerts/components/CreateAlertForm";
import SearchDonors from "../donors/SearchDonors";
import AuthPopup from "../../modules/auth/components/AuthPopup";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationComponent from "./NotificationComponent";

export default function NavbarLayout() {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(false);
    const [isSearchDonorsPopupOpen, setIsSearchDonorsPopupOpen] =
        React.useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
    const [isAuthPopupOpen, setIsAuthPopupOpen] = React.useState(false);
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const { isAuthenticated } = React.useContext(AuthContext);
    const [notificationOpen, setNotificationOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    return (
        <>
            <Navbar
                className="mx-auto w-full fixed z-10 p-2 max-w-full lg:rounded-full lg:pl-6 bg-red-50"
                placeholder={""}
            >
                <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                    <Link to={"/"}>
                        <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mr-4 ml-2 cursor-pointer py-1.5 font-semibold"
                            placeholder={""}
                        >
                            BloodConnect
                        </Typography>
                    </Link>
                    <div className="hidden lg:block">
                        <NavList
                            isAuthenticated={isAuthenticated}
                            setIsAlertPopupOpen={setIsAlertPopupOpen}
                            setIsSearchDonorsPopupOpen={
                                setIsSearchDonorsPopupOpen
                            }
                        />
                    </div>

                    {!isAuthenticated && (
                        <div className="flex gap-2 justify-center px-4">
                            <Button
                                size="sm"
                                placeholder={""}
                                onClick={() => {
                                    setIsLoginPopupOpen(true);
                                    setIsAuthPopupOpen(true);
                                    setIsRegisterPopupOpen(false);
                                }}
                            >
                                <span>Log In</span>
                            </Button>

                            <Button
                                size="sm"
                                placeholder={""}
                                onClick={() => {
                                    setIsRegisterPopupOpen(true);
                                    setIsAuthPopupOpen(true);
                                    setIsLoginPopupOpen(false);
                                }}
                            >
                                <span>Register</span>
                            </Button>
                        </div>
                    )}

                    <IconButton
                        size="sm"
                        color="blue-gray"
                        variant="text"
                        onClick={toggleIsNavOpen}
                        className="ml-auto mr-2 lg:hidden"
                        placeholder={""}
                    >
                        <Bars2Icon className="h-6 w-6" />
                    </IconButton>

                    {isAuthenticated && <ProfileMenu />}
                    {isAuthenticated && (
                        <div className="fixed top-1 lg-max:right-[15%] lg:right-20">
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
                    )}
                </div>
                <Collapse open={isNavOpen} className="overflow-scroll">
                    <NavList
                        isAuthenticated={isAuthenticated}
                        setIsAlertPopupOpen={setIsAlertPopupOpen}
                        setIsSearchDonorsPopupOpen={setIsSearchDonorsPopupOpen}
                    />
                </Collapse>
            </Navbar>
            {isAlertPopupOpen && (
                <CreateAlertForm onClose={setIsAlertPopupOpen} />
            )}
            {isSearchDonorsPopupOpen && (
                <ErrorBoundary>
                    <SearchDonors onClose={setIsSearchDonorsPopupOpen} />
                </ErrorBoundary>
            )}
            {isAuthPopupOpen && (
                <ErrorBoundary>
                    <AuthPopup
                        isRegisterForm={isRegisterPopupOpen}
                        isLoginForm={isLoginPopupOpen}
                        open={isAuthPopupOpen}
                        setOpen={setIsAuthPopupOpen}
                        openRegisterForm={setIsRegisterPopupOpen}
                        openLoginForm={setIsLoginPopupOpen}
                    />
                </ErrorBoundary>
            )}
        </>
    );
}
