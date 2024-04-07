import {
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import React, { ReactElement } from "react";
import { firebaseApp } from "../../services/firebase";
import { AuthContext } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

const LoginFormComponent = (): ReactElement => {
    const [userDetails, setUserDetails] = React.useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const { setIsAuthenticated } = React.useContext(AuthContext);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const auth = getAuth(firebaseApp);
        try {
            const loggedInUser = await signInWithEmailAndPassword(
                auth,
                userDetails.email,
                userDetails.password
            );
            if (!loggedInUser) {
                alert("Email or password is incorrect");
            }
            if (!loggedInUser.user.emailVerified) {
                await sendEmailVerification(loggedInUser.user);
                alert(
                    "Please verify your email. You have received a link to verify your email. After verification please sign in again."
                );
            } else {
                setIsAuthenticated(true);
                // store the data in mongodb
                localStorage.setItem("token", loggedInUser.user.refreshToken);
            }
            console.log(loggedInUser);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
                    Welcome Back!
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={userDetails.email}
                            onChange={(e) =>
                                setUserDetails({
                                    ...userDetails,
                                    email: e.target.value,
                                })
                            }
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={userDetails.password}
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        password: e.target.value,
                                    })
                                }
                                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12a3 3 0 116 0 3 3 0 01-6 0z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <a
                            href="#"
                            className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link to="/register">
                            <p className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Create Account
                            </p>
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginFormComponent;
