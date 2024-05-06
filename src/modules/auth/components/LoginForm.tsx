/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import React, { ReactElement } from "react";
import { firebaseApp } from "../../../services/firebase";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { loginUser } from "../services";
import { LoginFormType } from "../types";
import { loginTypes } from "../constants";

const LoginFormComponent = (): ReactElement => {
    const [userDetails, setUserDetails] = React.useState<LoginFormType>({
        email: "",
        password: "",
        userType: "individual",
    });

    const {
        setIsAuthenticated,
        geoLocation,
        setLoggedInUserType,
        setLoggedInUser,
    } = React.useContext(AuthContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (
            userDetails.userType === "individual" ||
            userDetails.userType === "organization"
        ) {
            try {
                const auth = getAuth(firebaseApp);
                const loggedInUser = await signInWithEmailAndPassword(
                    auth,
                    userDetails.email,
                    userDetails.password
                );
                if (!loggedInUser) {
                    toast("Email or password is incorrect", { type: "error" });
                }
                if (!loggedInUser.user.emailVerified) {
                    await sendEmailVerification(loggedInUser.user);
                    toast(
                        "Please verify your email. You have received a link to verify your email. After verification please sign in again.",
                        {
                            type: "info",
                        }
                    );
                } else {
                    const response = await loginUser(userDetails, geoLocation);
                    if (response.success) {
                        setIsAuthenticated(true);
                        setLoggedInUserType(userDetails.userType);
                        setLoggedInUser(response.userData);
                        localStorage.setItem(
                            `${userDetails.userType}FirebaseToken`,
                            loggedInUser.user.refreshToken
                        );
                        toast("Login successful", { type: "success" });
                        window.location.href = "/dashboard";
                    } else {
                        toast("Some error occured", { type: "error" });
                    }
                }
            } catch (error: any) {
                console.error(error);
                toast(error?.message || "An error occured", { type: "error" });
            }
        } else if (
            userDetails.userType === "admin" ||
            userDetails.userType === "doctor"
        ) {
            try {
                const response = await loginUser(userDetails);
                if (response.success) {
                    setIsAuthenticated(true);
                    setLoggedInUserType(userDetails.userType);
                    setLoggedInUser(response.userData);
                    toast("Login successful", { type: "success" });
                    window.location.href = "/dashboard";
                } else {
                    toast("Some error occured", { type: "error" });
                }
            } catch (error) {
                console.log(error);
                toast("An error occured", { type: "error" });
            }
        }
    };
    return (
        <>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="m-2 px-8 py-20">
                    <div className="flex flex-col px-10 py-14 gap-y-10 shadow rounded">
                        {/* Header */}
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                                Signin to your account
                            </h1>
                            <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
                                Don't have an account ?{" "}
                                <Link to={"/register"}>
                                    <span className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400">
                                        Signup
                                    </span>
                                </Link>{" "}
                                for free
                            </p>
                        </div>
                        {/* form container */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-y-6">
                                <Input
                                    crossOrigin={"origin"}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Your Email"
                                    value={userDetails.email}
                                    onChange={(e) =>
                                        setUserDetails({
                                            ...userDetails,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <Input
                                    crossOrigin={"origin"}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Your Password"
                                    value={userDetails.password}
                                    onChange={(e) =>
                                        setUserDetails({
                                            ...userDetails,
                                            password: e.target.value,
                                        })
                                    }
                                />

                                <div>
                                    <Select
                                        label="Login As"
                                        placeholder="Login Type"
                                        value={userDetails.userType}
                                        onChange={(e) =>
                                            setUserDetails({
                                                ...userDetails,
                                                userType: e as
                                                    | "individual"
                                                    | "organization"
                                                    | "doctor"
                                                    | "admin",
                                            })
                                        }
                                    >
                                        {loginTypes.map((option) => (
                                            <Option key={option} value={option}>
                                                {option
                                                    .charAt(0)
                                                    .toUpperCase()
                                                    .concat(option.slice(1))}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="w-full"
                                    placeholder={""}
                                    type="submit"
                                >
                                    Signin
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginFormComponent;
