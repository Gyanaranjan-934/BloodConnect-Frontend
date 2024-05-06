import React from "react";
import {
    Typography,
    Button,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../modules/auth/AuthContext";
import { Progress } from "@material-tailwind/react";

export function Navbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const { loadingValue } = React.useContext(AuthContext);
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                placeholder={"About"}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to={"/about"} className={({isActive})=> isActive? "text-red-300" : ""}>
                    <span className="flex items-center">About Us</span>
                </NavLink>
            </Typography>
            <Typography
                placeholder={"Contact"}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to={"/contact"} className={({isActive})=> isActive? "text-red-300" : ""}>
                    <span className="flex items-center">Contact Us</span>
                </NavLink>
            </Typography>
            <Typography
                placeholder={"Feed"}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to={"/feeds"} className={({isActive})=> isActive? "text-red-300" : ""}>
                    <span className="flex items-center">Feed</span>
                </NavLink>
            </Typography>
        </ul>
    );

    return (
        <div className="sticky w-full overflow-auto bg-red-50">
            <nav className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to={"/"}>
                        <Typography
                            placeholder={"BloodConnect"}
                            className="mr-4 cursor-pointer py-1.5 font-medium"
                        >
                            BloodConnect
                        </Typography>
                    </Link>
                    {navList}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-x-1">
                            <Link to={"/login"}>
                                <Button
                                    variant="text"
                                    size="sm"
                                    className="hidden lg:inline-block"
                                    placeholder={""}
                                >
                                    <span>Log In</span>
                                </Button>
                            </Link>
                            <Link to={"/register"}>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block"
                                    placeholder={""}
                                >
                                    <span>Sign Up</span>
                                </Button>
                            </Link>
                        </div>
                        <IconButton
                            variant="text"
                            placeholder={""}
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http:www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http:www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button placeholder={"Log in"} fullWidth variant="text" size="sm" className="">
                            <span>Log In</span>
                        </Button>
                        <Button
                            placeholder={"Sign in"}
                            fullWidth
                            variant="gradient"
                            size="sm"
                            className=""
                        >
                            <span>Sign Up</span>
                        </Button>
                    </div>
                </Collapse>
            </nav>
            <Progress
                placeholder={"progress bar"}
                value={loadingValue}
                color={"red"}
                style={{
                    backgroundColor: "transparent",
                    height: "4px",
                    position: "fixed",
                    marginBottom: "20px",
                }}
            />
        </div>
    );
}
