/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import React, { ReactElement } from "react";
import { firebaseApp } from "../../../services/firebase";
import { AuthContext } from "../../../context/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { toast } from "react-toastify";

type LoginType = "individual" | "organization" | "admin" | "doctor";

const LoginOptions: { label: string; value: LoginType }[] = [
    {
        label: "Individual",
        value: "individual",
    },
    {
        label: "Organization",
        value: "organization",
    },
    {
        label: "Admin",
        value: "admin",
    },
    {
        label: "Doctor",
        value: "doctor",
    },
];

const LoginFormComponent = (): ReactElement => {
    const [userDetails, setUserDetails] = React.useState({
        email: "",
        password: "",
    });
    const { setIsAuthenticated } = React.useContext(AuthContext);
    const [loginType, setLoginType] = React.useState<LoginType>("individual");
    const navigate = useNavigate();
    const { loginUser } = React.useContext(AuthContext);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(userDetails);
        if (loginType === "individual" || loginType === "organization") {
            try {
                const response = await loginUser(userDetails,loginType)
                console.log(response);
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
                    // store the data in mongodb
                    const resoponse = await loginUser(userDetails, loginType);
                    console.log(resoponse);

                    if (resoponse) {
                        setIsAuthenticated(true);
                        localStorage.setItem(
                            `${loginType}FirebaseToken`,
                            loggedInUser.user.refreshToken
                        );
                        toast("Login successful", { type: "success" });
                        navigate("/dashboard");
                    } else {
                        toast("Some error occured", { type: "error" });
                    }
                }
            } catch (error:any) {
                console.error(error);
                toast(error?.message || "An error occured", { type: "error" });
            }
        } else if (loginType === "admin" || loginType === "doctor") {
            try {
                await loginUser(userDetails, loginType);
            } catch (error) {
                console.log(error);
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
                                        value={loginType.charAt(0).toUpperCase().concat(loginType.slice(1))}
                                    >
                                        {LoginOptions.map((option) => (
                                            <Option
                                                key={option.value}
                                                value={option.value}
                                                onClick={() =>
                                                    setLoginType(option.value)
                                                }
                                            >
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="w-full"
                                    placeholder={undefined}
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
