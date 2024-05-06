import React from "react";
import {
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../modules/auth/AuthContext";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        path: "/dashboard",
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        path: "/dashboard",
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
        path: "/dashboard",
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
        path: "/dashboard",
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        path: "/dashboard",
    },
];

export function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const { setIsAuthenticated } = React.useContext(AuthContext);

    return (
        <div className="absolute bottom-1 w-full py-2 px-3 flex items-center justify-evenly gap-8 left-0">
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                placement="bottom-end"
            >
                <MenuHandler>
                    <div className="flex items-center justify-evenly rounded shadow bg-gray-300 p-2 w-full">
                        <Avatar
                            placeholder={"Profile"}
                            variant="circular"
                            size="sm"
                            alt="tania andrew"
                            className="border border-gray-900 p-0.5"
                            src={""}
                        />
                        <Button
                            placeholder={"Profile"}
                            variant="text"
                            color="blue-gray"
                        >
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-3 w-3 transition-transform ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </Button>
                    </div>
                </MenuHandler>
                <MenuList placeholder={"Menu"} className="p-1">
                    {profileMenuItems.map((item, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                            <MenuItem
                                placeholder={"Menu"}
                                key={item.label}
                                onClick={() => {
                                    if (isLastItem) {
                                        localStorage.clear();
                                        setIsAuthenticated(false);
                                        <Navigate to={"/login"} />;
                                    }
                                    closeMenu;
                                }}
                                className={`flex items-center gap-2 rounded ${
                                    isLastItem
                                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                        : ""
                                }`}
                            >
                                {React.createElement(item.icon, {
                                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                    strokeWidth: 2,
                                })}
                                <Typography
                                    placeholder={"Menu"}
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color={isLastItem ? "red" : "inherit"}
                                >
                                    {!isLastItem && (
                                        <Link to={item.path}>{item.label}</Link>
                                    )}
                                    {isLastItem && <span>{item.label}</span>}
                                </Typography>
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        </div>
    );
}
