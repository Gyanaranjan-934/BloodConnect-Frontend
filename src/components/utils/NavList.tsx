import { Typography, MenuItem } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";

const PublicNavList = [
    {
        label: "About",
        path: "/about",
    },
    {
        label: "Contact",
        path: "/contact",
    },
    {
        label: "Feed",
        path: "/feeds",
    },
];

const PrivateNavList = [
    {
        label: "Dashboard",
        path: "/dashboard",
    },
    {
        label: "Alerts",
        path: "/alerts",
    },
    {
        label: "Events",
        path: "/events",
    },
];

export default function NavList({
    isAuthenticated,
    setIsAlertPopupOpen,
    setIsSearchDonorsPopupOpen,
}: {
    isAuthenticated: boolean;
    setIsAlertPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSearchDonorsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {isAuthenticated &&
                PrivateNavList.map((navItem) => (
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
            {isAuthenticated && (
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
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-medium text-blue-gray-500"
                        placeholder={""}
                        onClick={() => setIsSearchDonorsPopupOpen(true)}
                    >
                        {" "}
                        <MenuItem
                            className="flex items-center gap-2 lg:rounded-full"
                            placeholder={""}
                        >
                            <span className="text-gray-900">Search Donors</span>
                        </MenuItem>
                    </Typography>
                </>
            )}
        </ul>
    );
}
