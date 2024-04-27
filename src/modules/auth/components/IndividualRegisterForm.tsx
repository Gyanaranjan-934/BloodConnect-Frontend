import React, { ReactElement, useState } from "react";
import { firebaseApp } from "../../../services/firebase";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
} from "firebase/auth";
import {
    Button,
    Checkbox,
    Input,
    Option,
    Select,
    Step,
    Stepper,
    Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faEye,
    faEyeSlash,
    faInfoCircle,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
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
    const [bloodGroup, setBloodGroup] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<string>(
        "Use at least 8 characters, one uppercase, one lowercase, one special character and one number."
    );
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [phoneError, setPhoneError] = useState<boolean>(true); 
    const [adhaarError, setAdhaarError] = useState<boolean>(true);
    const [isAddressSame, setSameAddress] = useState<boolean>(false);
    const { registerIndividual, setLoadingValue } =
        React.useContext(AuthContext);

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
            setPasswordStrength("You have entered an empty password");
        } else if (!isStrongPassword) {
            setPasswordStrength(
                "Use at least 8 characters, one uppercase, one lowercase, one special character and one number."
            );
        } else {
            setPasswordStrength("Strong Password");
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
                    true
                );
            } else {
                setPhoneError(false);
            }
        }

        if (name === "adhaar") {
            const isValidNumber = /^\d{12}$/g.test(value);
            if (!isValidNumber) {
                setAdhaarError(
                    true
                );
            } else {
                setAdhaarError(false);
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
                    },
                });
            }
            // await registerIndividual({...userDetails,userDOB,avatar,bloodGroup});
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
                await registerIndividual({
                    ...userDetails,
                    userDOB,
                    avatar,
                    bloodGroup,
                });
                setLoadingValue(100);
                <Navigate to={"/login"} />;
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast(error?.message || "An error occured", { type: "error" });
        } finally {
            setLoadingValue(0);
        }
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
    return (
        <>
            {/* <div className="p-4 w-full bg-white">
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
                                        value={userDetails.presentAddress.city}
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
                            <Checkbox
                                label="Is permanent address is same as present"
                                readOnly
                                checked={isAddressSame}
                                crossOrigin={undefined}
                                onChange={(e) => setSameAddress(!isAddressSame)}
                            />
                            <Typography placeholder={""}>
                                Is permanent address is same as present
                            </Typography>
                        </div>
                        <Typography placeholder={""}>
                            Permanent Address
                        </Typography>
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
                                                            permanentAddress: {
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
            </div> */}

            <div className="w-full py-4 px-8 flex flex-col gap-y-10">
                <form onSubmit={handleSubmit}>
                    {/* First Page includes Full Name, Email, Phone Number, Password, Confirm Password */}
                    {activeStep === 0 && (
                        <div className="flex flex-col justify-center gap-4">
                            <Input
                                crossOrigin={"origin"}
                                label="Full Name"
                                placeholder="Full Name"
                                value={userDetails.name}
                                name="fullName"
                                required
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <Input
                                crossOrigin={"origin"}
                                label="Email Address"
                                placeholder="Enter your email"
                                name="email"
                                value={userDetails.email}
                                required
                                onChange={(e) =>
                                    setUserDetails({
                                        ...userDetails,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <div>
                            <Input
                                crossOrigin={"origin"}
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={userDetails.phone}
                                required
                                onChange={formHandler}
                            />
                            <Typography
                                    placeholder={""}
                                    variant="small"
                                    className={`mt-2 flex items-center gap-1 font-normal ${
                                        phoneError
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            !phoneError
                                                ? faCheckCircle
                                                : faTimesCircle
                                        }
                                    />
                                    {phoneError
                                        ? "Please enter a valid phone number of 10 digits"
                                        : "Valid phone number"}
                                </Typography>
                            </div>
                            <div>
                                <Input
                                    name="password"
                                    crossOrigin={"origin"}
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={userDetails.password}
                                    type={showPassword ? "text" : "password"}
                                    required
                                    onChange={formHandler}
                                    icon={
                                        <FontAwesomeIcon
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            icon={
                                                showPassword
                                                    ? faEye
                                                    : faEyeSlash
                                            }
                                        />
                                    }
                                />
                                <Typography
                                    placeholder={""}
                                    variant="small"
                                    className={`mt-2 flex items-center gap-1 font-normal ${passwordStrength === "You have entered an empty password" ? "text-red-500" : passwordStrength === "Strong Password" ? "text-green-500" : "text-gray-500"}`}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    {passwordStrength}
                                </Typography>
                            </div>
                            <div>
                                <Input
                                    crossOrigin={"origin"}
                                    label="Confirm Password"
                                    placeholder="Enter your password"
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={userDetails.confirmPassword}
                                    required
                                    onChange={formHandler}
                                    icon={
                                        <FontAwesomeIcon
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            icon={
                                                showPassword
                                                    ? faEye
                                                    : faEyeSlash
                                            }
                                        />
                                    }
                                />
                                <Typography
                                    placeholder={""}
                                    variant="small"
                                    className={`mt-2 flex items-center gap-1 font-normal ${
                                        !passwordMatch
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            passwordMatch
                                                ? faCheckCircle
                                                : faTimesCircle
                                        }
                                    />
                                    {passwordMatch
                                        ? "Password Matched"
                                        : "Password not matching"}
                                </Typography>
                            </div>
                        </div>
                    )}
                    {/* Second Page includes Adhaar No., Date of Birth, Blood Group, Profile Pic */}
                    {activeStep === 1 && (
                        <div className="flex flex-col justify-center gap-4">
                            <Input
                                crossOrigin={"origin"}
                                label="Date of Birth"
                                type="date"
                                required
                                placeholder="Enter your date of birth"
                                value={userDOB}
                                onChange={(e) => {
                                    setUserDOB(e.target.value);
                                }}
                            />
                            <div>
                                <Input
                                    required
                                    crossOrigin={"origin"}
                                    label="Adhaar No."
                                    placeholder="Adhaar No."
                                    name="adhaar"
                                    value={userDetails.adhaar}
                                    onChange={formHandler}
                                />
                                <Typography
                                    placeholder={""}
                                    variant="small"
                                    className={`mt-2 flex items-center gap-1 font-normal ${
                                        adhaarError
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            !adhaarError
                                                ? faCheckCircle
                                                : faTimesCircle
                                        }
                                    />
                                    {adhaarError
                                        ? "Please enter a valid Adhaar No."
                                        : "Valid Adhaar No."}
                                </Typography>
                            </div>
                            <Select
                                label="Choose Blood Group"
                                placeholder="Blood Group"
                                value={bloodGroup}
                                
                            >
                                {bloodGroups.map((group) => (
                                    <Option
                                        key={group}
                                        value={group}
                                        onClick={() => {
                                            setBloodGroup(group);
                                        }}
                                    >
                                        {group}
                                    </Option>
                                ))}
                            </Select>
                            <Input
                                required
                                crossOrigin={"origin"}
                                label="Profile Pic"
                                placeholder="Profile Pic"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    if (
                                        event.target.files &&
                                        event.target.files[0]
                                    ) {
                                        setAvatar(event.target.files[0]);
                                    }
                                }}
                            />
                        </div>
                    )}

                    {activeStep === 2 && (
                        <div className="flex flex-col justify-center gap-4 p-4">
                            {/* Address */}
                            <div className="">
                                <Typography
                                    type="h2"
                                    className="font-semibold text-lg"
                                    placeholder={""}
                                >
                                    Present Address
                                </Typography>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        crossOrigin={"origin"}
                                        label="Street No."
                                        placeholder="Street No."
                                        value={
                                            userDetails.presentAddress.street
                                        }
                                        required
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                presentAddress: {
                                                    ...userDetails.presentAddress,
                                                    street: event.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <Input
                                        crossOrigin={"origin"}
                                        label="City"
                                        placeholder="City"
                                        value={userDetails.presentAddress.city}
                                        required
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                presentAddress: {
                                                    ...userDetails.presentAddress,
                                                    city: event.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <Select
                                        label="Choose State"
                                        placeholder="State"
                                        value={userDetails.presentAddress.state}
                                    >
                                        {statesOfIndia.map((group) => (
                                            <Option
                                                key={group}
                                                value={group}
                                                onClick={() => {
                                                    setUserDetails({
                                                        ...userDetails,
                                                        presentAddress: {
                                                            ...userDetails.presentAddress,
                                                            state: group,
                                                        },
                                                    });
                                                }}
                                            >
                                                {group}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Input
                                        crossOrigin={"origin"}
                                        label="PIN Code"
                                        placeholder="PIN Code"
                                        value={
                                            userDetails.presentAddress.pincode
                                        }
                                        required
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                presentAddress: {
                                                    ...userDetails.presentAddress,
                                                    pincode: event.target.value,
                                                },
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <Typography
                                    type="h2"
                                    className="font-semibold text-lg"
                                    placeholder={""}
                                >
                                    Permanent Address
                                </Typography>
                                <Checkbox
                                    label="Is permanent address is same as present"
                                    readOnly
                                    checked={isAddressSame}
                                    crossOrigin={undefined}
                                    onChange={() =>
                                        setSameAddress(!isAddressSame)
                                    }
                                />
                                <div className="flex flex-col gap-4">
                                    <Input
                                        crossOrigin={"origin"}
                                        label="Street No."
                                        placeholder="Street No."
                                        value={
                                            userDetails.permanentAddress.street
                                        }
                                        disabled={isAddressSame}
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                permanentAddress: {
                                                    ...userDetails.permanentAddress,
                                                    street: event.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <Input
                                        crossOrigin={"origin"}
                                        label="City"
                                        placeholder="City"
                                        value={
                                            userDetails.permanentAddress.city
                                        }
                                        disabled={isAddressSame}
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                permanentAddress: {
                                                    ...userDetails.permanentAddress,
                                                    city: event.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <Select
                                        disabled={isAddressSame}
                                        label="Choose State"
                                        placeholder="State"
                                        value={isAddressSame? userDetails.presentAddress.state: userDetails.permanentAddress.state}
                                    >
                                        {statesOfIndia.map((group) => (
                                            <Option
                                                key={group}
                                                value={group}
                                                onClick={() => {
                                                    setUserDetails({
                                                        ...userDetails,
                                                        permanentAddress: {
                                                            ...userDetails.permanentAddress,
                                                            state: group,
                                                        },
                                                    });
                                                }}
                                            >
                                                {group}
                                            </Option>
                                        ))}
                                    </Select>
                                    <Input
                                        crossOrigin={"origin"}
                                        label="PIN Code"
                                        placeholder="PIN Code"
                                        value={
                                            userDetails.permanentAddress.pincode
                                        }
                                        disabled={isAddressSame}
                                        onChange={(event) => {
                                            setUserDetails({
                                                ...userDetails,
                                                permanentAddress: {
                                                    ...userDetails.permanentAddress,
                                                    pincode: event.target.value,
                                                },
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="mt-8">
                        <Stepper
                            activeStep={activeStep}
                            isLastStep={(value) => setIsLastStep(value)}
                            isFirstStep={(value) => setIsFirstStep(value)}
                            placeholder={""}
                        >
                            <Step
                                onClick={() => setActiveStep(0)}
                                placeholder={""}
                                className="cursor-pointer"
                            >
                                1
                            </Step>
                            <Step
                                onClick={() => setActiveStep(1)}
                                placeholder={""}
                                className="cursor-pointer"
                            >
                                2
                            </Step>
                            <Step
                                onClick={() => setActiveStep(2)}
                                placeholder={""}
                                className="cursor-pointer"
                            >
                                3
                            </Step>
                        </Stepper>
                        <div className="mt-16 flex justify-between">
                            <Button
                                onClick={handlePrev}
                                disabled={isFirstStep}
                                placeholder={""}
                            >
                                Prev
                            </Button>
                            {activeStep !== 2 ? (
                                <Button
                                    onClick={handleNext}
                                    disabled={isLastStep}
                                    placeholder={""}
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleNext}
                                    type="submit"
                                    disabled={!isLastStep}
                                    placeholder={""}
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
