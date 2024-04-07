import React, { useState } from "react";
import eyeClosed from "../../assets/eye-close-svgrepo-com.svg";
import eyeOpended from "../../assets/eye-open-svgrepo-com.svg";
import { AuthContext } from "../../context/auth/AuthContext";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
} from "firebase/auth";
import { firebaseApp } from "../../services/firebase";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export function OrganizationRegisterForm() {
    const [userDetails, setUserDetails] = React.useState({
        organizationName: "",
        email: "",
        organizationHeadName: "",
        organizationHeadAdhaar: "",
        password: "",
        confirmPassword: "",
        phoneNo: "",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: "",
        },
        type: "",
        cinNo: "",
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [cinError, setCINError] = useState<string>("");
    const [presentState, setPresentState] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<string>("weak");
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [adhaarError, setAdhaarError] = useState<string>("");
    const [presentStateDropdownOpen, setPresentDropdownOpen] =
        useState<boolean>(false);
    const { registerOrganization, setLoadingValue } =
        React.useContext(AuthContext);
    const typesOfOrganization = [
        "Healthcare",
        "Educational",
        "Charity",
        "Other",
    ];
    const statesOfIndia = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
        "Andaman and Nicobar Islands",
        "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu",
        "Lakshadweep",
        "Delhi",
        "Puducherry",
    ];
    const [typeDropDownOpen, setTypeDropDownOpen] = useState<boolean>(false);
    const [orgType, setOrgType] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoadingValue(10);
            setLoading(true);
            const auth = getAuth(firebaseApp);
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userDetails.email,
                userDetails.password
            );
            setLoadingValue(50);
            if (userCredential.user) {
                await sendEmailVerification(userCredential.user);
                toast(
                    "An email has been sent to your provided email address, please verify this email to continue.",
                    {
                        type: "info",
                        position: "top-right",
                    }
                );
                setLoadingValue(70);
                await registerOrganization(userDetails);
                setLoadingValue(100);
                <Navigate to={"/login"} />;
            }
        } catch (error: any) {
            console.error(error);
            toast(error?.message || "An error occured", { type: "error" });
        }finally{
            setLoading(false);
        }
    };
    const checkPasswordStrength = (password: string) => {
        const isStrongPassword =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
                password
            );
        if (password.length === 0) {
            setPasswordStrength("weak");
        } else if (!isStrongPassword) {
            setPasswordStrength(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
            );
        } else {
            setPasswordStrength("Strong");
        }
    };
    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });

        if (name === "password") {
            checkPasswordStrength(value);
            if (userDetails.confirmPassword !== value) {
                setPasswordMatch(false);
            } else {
                setPasswordMatch(true);
            }
        }

        if (name === "confirmPassword") {
            if (userDetails.password !== value) {
                setPasswordMatch(false);
            } else {
                setPasswordMatch(true);
            }
        }

        // Additional validation for phone and adhaar
        if (name === "phoneNo") {
            const isValidNumber = /^\d{10}$/g.test(value);
            if (!isValidNumber) {
                setPhoneError(
                    "Phone number should be 10 digits and contain only numeric values."
                );
            } else {
                setPhoneError("Valid");
            }
        }

        if (name === "cinNo") {
            const isValidCIN = /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/.test(
                value
            );
            if (!isValidCIN) {
                setCINError("Invalid CIN");
            } else {
                setCINError("Valid");
            }
        }

        if (name === "organizationHeadAdhaar") {
            const isValidNumber = /^\d{12}$/g.test(value);
            if (!isValidNumber) {
                setAdhaarError(
                    "Adhaar number should be 12 digits and contain only numeric values."
                );
            } else {
                setAdhaarError("Valid");
            }
        }
    };
    return (
        <div className="mx-auto w-full bg-white">
            <form onSubmit={handleSubmit}>
                {/* Name and Phone */}
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="organizationName"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Name of Organization
                            </label>
                            <input
                                type="text"
                                name="organizationName"
                                id="organizationName"
                                placeholder="Full Name"
                                value={userDetails.organizationName}
                                onChange={formHandler}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="phoneNo"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNo"
                                id="phoneNo"
                                value={userDetails.phoneNo}
                                onChange={formHandler}
                                placeholder="Enter your phone number"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {phoneError && (
                                <div
                                    className={`${phoneError === "Valid" ? "text-green-500" : "text-red-500"} text-sm`}
                                >
                                    {phoneError}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Email and CIN and Type*/}
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/3">
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={userDetails.email}
                                onChange={formHandler}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div className=" w-full px-3 sm:w-1/3">
                        <div className=" mb-5">
                            <label
                                htmlFor="cinNo"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                CIN Number
                            </label>
                            <input
                                type="text"
                                name="cinNo"
                                id="cinNo"
                                placeholder="CIN No."
                                value={userDetails.cinNo}
                                onChange={formHandler}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {cinError && (
                                <div
                                    className={`${cinError === "Valid" ? "text-green-500" : "text-red-500"} text-sm`}
                                >
                                    {cinError}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/3">
                        <div className="mb-5 relative">
                            <label
                                htmlFor="type"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Type of Organization
                            </label>
                            <input
                                type="button"
                                name="type"
                                id="type"
                                value={orgType || "Type of Organization"}
                                onClick={() =>
                                    setTypeDropDownOpen(!typeDropDownOpen)
                                }
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer"
                            />
                            {/* Dropdown */}
                            {typeDropDownOpen && (
                                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                    {typesOfOrganization.map((group) => (
                                        <div
                                            key={group}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setOrgType(group);
                                                setTypeDropDownOpen(false);
                                                setUserDetails({
                                                    ...userDetails,
                                                    type: group,
                                                });
                                            }}
                                        >
                                            {group}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Head name and adhaar */}
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="organizationHeadName"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Head of the Organization
                            </label>
                            <input
                                type="text"
                                name="organizationHeadName"
                                id="organizationHeadName"
                                value={userDetails.organizationHeadName}
                                onChange={formHandler}
                                placeholder="Enter the name of the head of the Organization"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="organizationHeadAdhaar"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Adhaar no. of Head
                            </label>
                            <input
                                type="text"
                                name="organizationHeadAdhaar"
                                id="organizationHeadAdhaar"
                                value={userDetails.organizationHeadAdhaar}
                                onChange={formHandler}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        {adhaarError && (
                            <div
                                className={`${adhaarError === "Valid" ? "text-green-500" : "text-red-500"} text-sm`}
                            >
                                {adhaarError}
                            </div>
                        )}
                    </div>
                </div>
                {/* Password and confirm password */}
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={userDetails.password}
                                    onChange={formHandler}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <img
                                            src={eyeClosed}
                                            height="20px"
                                            width="20px"
                                            alt="Closed Eye"
                                        />
                                    ) : (
                                        <img
                                            src={eyeOpended}
                                            height="20px"
                                            width="20px"
                                            alt="Open Eye"
                                        />
                                    )}
                                </button>
                            </div>
                            <div
                                className={`text-sm ${passwordStrength === "weak" ? "text-red-500" : passwordStrength === "Strong" ? "text-green-500" : "text-yellow-500"}`}
                            >
                                {passwordStrength}
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                        <div className="mb-5">
                            <label
                                htmlFor="confirmPassword"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Enter your password"
                                    value={userDetails.confirmPassword}
                                    onChange={formHandler}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md pr-10"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <img
                                            src={eyeClosed}
                                            height="20px"
                                            width="20px"
                                            alt="Closed Eye"
                                        />
                                    ) : (
                                        <img
                                            src={eyeOpended}
                                            height="20px"
                                            width="20px"
                                            alt="Open Eye"
                                        />
                                    )}
                                </button>
                            </div>
                            <div
                                className={`text-sm ${!passwordMatch ? "text-red-500" : "text-green-500"}`}
                            >
                                {passwordMatch
                                    ? "Password Matched"
                                    : "Password not matching"}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Present Address</p>
                    <div className=" -mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/4">
                            <div className="mb-5">
                                <label
                                    htmlFor="presentStreet"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Street No.
                                </label>
                                <input
                                    type="text"
                                    name="presentStreet"
                                    id="presentStreet"
                                    value={userDetails.address.street}
                                    onChange={(event) => {
                                        setUserDetails({
                                            ...userDetails,
                                            address: {
                                                ...userDetails.address,
                                                street: event.target.value,
                                            },
                                        });
                                    }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/4">
                            <div className="mb-5">
                                <label
                                    htmlFor="presentCity"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="presentCity"
                                    id="presentCity"
                                    value={userDetails.address.city}
                                    onChange={(event) => {
                                        setUserDetails({
                                            ...userDetails,
                                            address: {
                                                ...userDetails.address,
                                                city: event.target.value,
                                            },
                                        });
                                    }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/4 relative">
                            <div className="mb-5">
                                <label
                                    htmlFor="presentState"
                                    className="mt-3 block text-base font-medium text-[#07074D]"
                                >
                                    State
                                </label>
                                <input
                                    type="button"
                                    name="presentState"
                                    id="presentState"
                                    value={presentState || "Select State"}
                                    onClick={() =>
                                        setPresentDropdownOpen(
                                            !presentStateDropdownOpen
                                        )
                                    }
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer"
                                />
                                {presentStateDropdownOpen && (
                                    <div className="absolute top-full left-0 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        {statesOfIndia.map((state) => (
                                            <div
                                                key={state}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setPresentState(state);
                                                    setUserDetails({
                                                        ...userDetails,
                                                        address: {
                                                            ...userDetails.address,
                                                            state: state,
                                                        },
                                                    });
                                                    setPresentDropdownOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                {state}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full px-3 sm:w-1/4">
                            <div className="mb-5 relative">
                                <label
                                    htmlFor="pinCode"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    PIN Code
                                </label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    id="pinCode"
                                    value={userDetails.address.pincode}
                                    onChange={(event) => {
                                        setUserDetails({
                                            ...userDetails,
                                            address: {
                                                ...userDetails.address,
                                                pincode: event.target.value,
                                            },
                                        });
                                    }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="hover:shadow-form w-auto rounded-md bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}
