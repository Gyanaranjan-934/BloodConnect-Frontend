import React, { ReactElement, useState } from "react";
import { firebaseApp } from "../../services/firebase";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
} from "firebase/auth";
import { Checkbox, Typography } from "@material-tailwind/react";
import eyeClosed from "../../assets/eye-close-svgrepo-com.svg";
import eyeOpended from "../../assets/eye-open-svgrepo-com.svg";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
export const RegistrationFormComponent = (): ReactElement => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        phone: "",
        email: "",
        adhaar: "",
        password: "",
        confirmPassword: "",
        presentAddress: {
            street: "",
            city: "",
            state: "",
            pincode: "",
        },
        permanentAddress: {
            street: "",
            city: "",
            state: "",
            pincode: "",
        },
    });
    const [userDOB, setUserDOB] = useState<string>();
    const [presentStateDropdownOpen, setPresentDropdownOpen] =
        useState<boolean>(false);
    const [permanentStateDropdownOpen, setPermanentDropdownOpen] =
        useState<boolean>(false);
    const [bloodGroupDropdownOpen, setBloodGroupDropdownOpen] =
        useState<boolean>(false);
    const [presentState, setPresentState] = useState<string>("");
    const [permanentState, setPermanentState] = useState<string>("");
    const [bloodGroup, setBloodGroup] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<string>("weak");
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [phoneError, setPhoneError] = useState<string>("");
    const [adhaarError, setAdhaarError] = useState<string>("");
    const [isAddressSame, setSameAddress] = useState<boolean>(false);
    const {registerIndividual,setLoadingValue} = React.useContext(AuthContext);

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
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
        if (name === "phone") {
            const isValidNumber = /^\d{10}$/g.test(value);
            if (!isValidNumber) {
                setPhoneError(
                    "Phone number should be 10 digits and contain only numeric values."
                );
            } else {
                setPhoneError("");
            }
        }

        if (name === "adhaar") {
            const isValidNumber = /^\d{12}$/g.test(value);
            if (!isValidNumber) {
                setAdhaarError(
                    "Adhaar number should be 12 digits and contain only numeric values."
                );
            } else {
                setAdhaarError("");
            }
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoadingValue(10);
            if (isAddressSame) {
                setUserDetails({
                    ...userDetails,
                    permanentAddress: {
                        street: userDetails.presentAddress.street,
                        city: userDetails.presentAddress.city,
                        state: userDetails.presentAddress.state,
                        pincode: userDetails.presentAddress.pincode,
                    }
                });
            }
            
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
                    "An email has been sent to your provided email address, please verify this email to continue to login.",
                    {
                        type: "info",
                        position: "top-right",
                    }
                );
                setLoadingValue(70);
                await registerIndividual({...userDetails,userDOB,avatar,bloodGroup});    
                setLoadingValue(100);
                <Navigate to={"/login"} />;
            }
        } catch (error: any) {
            console.error(error);
            toast(error?.message || "An error occured", { type: "error" });
        }
    };

    return (
        <>
            <div className="mx-auto w-full bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full Name"
                                value={userDetails.name}
                                onChange={formHandler}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <label
                                htmlFor="phone"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={userDetails.phone}
                                onChange={formHandler}
                                placeholder="Enter your phone number"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                            {phoneError && (
                                <div className="text-red-500 text-sm">
                                    {phoneError}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
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
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label
                                    htmlFor="date"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={userDOB}
                                    onChange={(e) => {
                                        setUserDOB(e.target.value);
                                        console.log(userDOB);
                                    }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className=" -mx-3 flex flex-wrap">
                        <div className=" w-full px-3 sm:w-1/3">
                            <div className=" mb-5">
                                <label
                                    htmlFor="adhaar"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Adhaar No.
                                </label>
                                <input
                                    type="text"
                                    name="adhaar"
                                    id="adhaar"
                                    placeholder="Adhaar No."
                                    value={userDetails.adhaar}
                                    onChange={formHandler}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {adhaarError && (
                                    <div className="text-red-500 text-sm">
                                        {adhaarError}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <div className="mb-5">
                                <label
                                    htmlFor="avatar"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Profile Pic
                                </label>
                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    accept="image/*"
                                    onChange={(event) => {
                                        if (
                                            event.target.files &&
                                            event.target.files[0]
                                        ) {
                                            setAvatar(event.target.files[0]);
                                        }
                                    }}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <div className="mb-5 relative">
                                <label
                                    htmlFor="bloodGroup"
                                    className="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Blood Group
                                </label>
                                <input
                                    type="button"
                                    name="bloodGroup"
                                    id="bloodGroup"
                                    value={bloodGroup || "Choose Blood Group"}
                                    onClick={() =>
                                        setBloodGroupDropdownOpen(
                                            !bloodGroupDropdownOpen
                                        )
                                    }
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer"
                                />
                                {/* Dropdown */}
                                {bloodGroupDropdownOpen && (
                                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                        {bloodGroups.map((group) => (
                                            <div
                                                key={group}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setBloodGroup(group);
                                                    setBloodGroupDropdownOpen(
                                                        false
                                                    );
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
                    <div className=" -mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
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
                        <div className="w-full px-3 sm:w-1/2">
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
                                        value={
                                            userDetails.presentAddress.street
                                        }
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                presentAddress: {
                                                    ...userDetails.presentAddress,
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
                                        value={
                                            userDetails.presentAddress.city
                                        }
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                presentAddress: {
                                                    ...userDetails.presentAddress,
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
                                                            presentAddress: {
                                                                ...userDetails.presentAddress,
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
                                        value={
                                            userDetails.presentAddress.pincode
                                        }
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                presentAddress: {
                                                    ...userDetails.presentAddress,
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
                    <div>
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setSameAddress(!isAddressSame);
                            }}
                        >
                            <Checkbox readOnly checked={isAddressSame} />
                            <Typography>
                                Is permanent address is same as present
                            </Typography>
                        </div>
                        <Typography>Permanent Address</Typography>
                        <div className=" -mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/4">
                                <div className="mb-5">
                                    <label
                                        htmlFor="permanentStreet"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        Street No.
                                    </label>
                                    <input
                                        type="text"
                                        name="permanentStreet"
                                        id="permanentStreet"
                                        disabled={isAddressSame}
                                        value={
                                            isAddressSame
                                                ? userDetails.presentAddress
                                                      .street
                                                : userDetails.permanentAddress
                                                      .street
                                        }
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                permanentAddress: {
                                                    ...userDetails.permanentAddress,
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
                                        htmlFor="permanentCity"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="permanentCity"
                                        id="permanentCity"
                                        disabled={isAddressSame}
                                        value={
                                            isAddressSame
                                                ? userDetails.presentAddress
                                                      .street
                                                : userDetails.permanentAddress
                                                      .city
                                        }
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                permanentAddress: {
                                                    ...userDetails.permanentAddress,
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
                                        htmlFor="permanentState"
                                        className="mt-3 block text-base font-medium text-[#07074D]"
                                    >
                                        State
                                    </label>
                                    <input
                                        type="button"
                                        name="permanentState"
                                        id="permanentState"
                                        disabled={isAddressSame}
                                        value={
                                            isAddressSame
                                                ? userDetails.presentAddress
                                                      .state
                                                : permanentState ||
                                                  "Select State"
                                        }
                                        onClick={() =>
                                            setPermanentDropdownOpen(
                                                !permanentStateDropdownOpen
                                            )
                                        }
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer"
                                    />
                                    {permanentStateDropdownOpen && (
                                        <div className="absolute top-full left-0 w-full max-h-40 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                            {statesOfIndia.map((state) => (
                                                <div
                                                    key={state}
                                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                    onClick={() => {
                                                        setPermanentState(
                                                            state
                                                        );
                                                        setUserDetails({
                                                            ...userDetails,
                                                            permanentAddress:
                                                                {
                                                                    ...userDetails.permanentAddress,
                                                                    state: state,
                                                                },
                                                        });
                                                        setPermanentDropdownOpen(
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
                                        htmlFor="perpinCode"
                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                    >
                                        PIN Code
                                    </label>
                                    <input
                                        type="text"
                                        name="perpinCode"
                                        id="perpinCode"
                                        disabled={isAddressSame}
                                        value={
                                            isAddressSame
                                                ? userDetails.presentAddress
                                                      .pincode
                                                : userDetails.permanentAddress
                                                      .pincode
                                        }
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                permanentAddress: {
                                                    ...userDetails.permanentAddress,
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
                        <button className="hover:shadow-form w-auto self-center rounded-md bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
