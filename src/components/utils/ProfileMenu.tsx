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
    PowerIcon,
} from "@heroicons/react/24/solid";
import { AuthContext } from "../../modules/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/user.png";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
        path: "/dashboard",
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUserData") || "{}");

export function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { setIsAuthenticated } = React.useContext(AuthContext);
    
    const closeMenu = () => setIsMenuOpen(false);
    const navigate = useNavigate();

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                    placeholder={""}
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt={loggedInUser?.name || ""}
                        className="border border-gray-900 p-0.5"
                        src={loggedInUser?.avatar || userIcon}
                        placeholder={undefined}
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1" placeholder={""}>
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => {
                                if (isLastItem) {
                                    localStorage.clear();
                                    setIsAuthenticated(false);
                                    window.location.href = "/";
                                } else {
                                    navigate(`/dashboard`);
                                    closeMenu();
                                }
                            }}
                            className={`flex items-center gap-2 rounded ${
                                isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                            }`}
                            placeholder={""}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                                placeholder={""}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}
