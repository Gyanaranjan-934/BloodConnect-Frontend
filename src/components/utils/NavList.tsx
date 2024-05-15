import { Typography, MenuItem } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../modules/auth/AuthContext";
import React from "react";

const PublicNavList = [
    {
        label: "About",
        path: "/about",
    },
    {
        label: "Contact",
        path: "/contact",
    },
];

const PrivateNavList = [
    {
        label: "Dashboard",
        path: "/dashboard",
    },
];

export default function NavList({
    isAuthenticated,
    setIsAlertPopupOpen,
}: {
    isAuthenticated: boolean;
    setIsAlertPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [navList, setNavList] = React.useState(PrivateNavList);
    const { loggedInUserType } = React.useContext(AuthContext);
    React.useEffect(() => {
        let updatedNavList = [...PrivateNavList]; // Create a copy of PrivateNavList

        if (loggedInUserType !== "admin") {
            updatedNavList = updatedNavList.concat({
                label: "Events",
                path: "/events",
            });
        }

        if (loggedInUserType === "individual") {
            updatedNavList = updatedNavList.concat({
                label: "Alerts",
                path: "/alerts",
            });
        }

        if (loggedInUserType === "organization") {
            updatedNavList = updatedNavList.concat({
                label: "Appointments",
                path: "/appointments",
            });
        }

        // Update navList state
        setNavList(updatedNavList);
    }, [loggedInUserType]);

    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {isAuthenticated &&
                navList.map((navItem) => (
                    <NavLink
                        key={navItem.label}
                        to={navItem.path}
                        className={({ isActive }) =>
                            isActive ? "text-red-300" : ""
                        }
                    >
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-medium text-blue-gray-500"
                            placeholder={""}
                        >
                            <MenuItem
                                className="flex items-center gap-2 lg:rounded-full"
                                placeholder={""}
                            >
                                <span className="text-gray-900">
                                    {" "}
                                    {navItem.label}
                                </span>
                            </MenuItem>
                        </Typography>
                    </NavLink>
                ))}
            {PublicNavList.map((navItem) => (
                <Typography
                    key={navItem.label}
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500"
                    placeholder={""}
                >
                    <NavLink
                        to={navItem.path}
                        className={({ isActive }) =>
                            isActive ? " bg-red-300" : ""
                        }
                    >
                        <MenuItem
                            className="flex items-center gap-2 lg:rounded-full"
                            placeholder={""}
                        >
                            <span className="text-gray-900">
                                {" "}
                                {navItem.label}
                            </span>
                        </MenuItem>
                    </NavLink>
                </Typography>
            ))}
            {isAuthenticated && loggedInUserType === "individual" && (
                <>
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-medium text-blue-gray-500"
                        placeholder={""}
                        onClick={() => setIsAlertPopupOpen(true)}
                    >
                        <MenuItem
                            className="flex items-center gap-2 lg:rounded-full"
                            placeholder={""}
                        >
                            <span className="text-gray-900">Create Alert</span>
                        </MenuItem>
                    </Typography>
                </>
            )}
        </ul>
    );
}
