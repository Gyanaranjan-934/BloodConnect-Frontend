/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
} from "firebase/auth";
import { firebaseApp } from "../../../services/firebase";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { Input, Typography, Select, Option } from "@material-tailwind/react";
import {
    faEye,
    faEyeSlash,
    faInfoCircle,
    faCheckCircle,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    DefaultOrganization,
    checkPasswordStrength,
    validateAdhaarNo,
    validatePhoneNumber,
} from "../utils";
import StepperComponent from "./Stepper";
import { organizationTypes, statesOfIndia } from "../constants";
import { OrganizationType } from "../types";
import { registerOrganization } from "../services";
import { AuthContext } from "../AuthContext";

export function OrganizationRegisterForm() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const [organizationDetails, setOrganizationDetails] =
        React.useState<OrganizationType>(DefaultOrganization);

    const {geoLocation} = React.useContext(AuthContext);

    const [cinError, setCINError] = useState<boolean>(true);

    const [phoneError, setPhoneError] = useState<boolean>(true);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [passwordStrength, setPasswordStrength] = useState<"Strong" | "Weak">(
        "Weak"
    );

    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

    const [adhaarError, setAdhaarError] = useState<boolean>(true);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const auth = getAuth(firebaseApp);

            const userCredential = await createUserWithEmailAndPassword(
                auth,
                organizationDetails.email,
                organizationDetails.password
            );

            if (userCredential.user) {
                await sendEmailVerification(userCredential.user);
                toast(
                    "An email has been sent to your provided email address, please verify this email to continue.",
                    {
                        type: "info",
                        position: "top-right",
                    }
                );

                await registerOrganization(organizationDetails,geoLocation);                

                <Navigate to={"/login"} />;
            }
        } catch (error: any) {
            console.error(error);
            toast(error?.message || "An error occured", { type: "error" });
        }
    };
    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setOrganizationDetails({ ...organizationDetails, [name]: value });

        if (name === "password") {
            checkPasswordStrength(value, setPasswordStrength);
            if (organizationDetails.confirmPassword !== value) {
                setPasswordMatch(false);
            } else {
                setPasswordMatch(true);
            }
        }

        if (name === "confirmPassword") {
            if (
                organizationDetails.password !== value ||
                organizationDetails.confirmPassword === ""
            ) {
                setPasswordMatch(false);
            } else {
                setPasswordMatch(true);
            }
        }

        if (name === "phone") {
            setPhoneError(!validatePhoneNumber(value));
        }

        if (name === "cinNo") {
            const isValidCIN = /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/.test(
                value
            );
            if (!isValidCIN) {
                setCINError(true);
            } else {
                setCINError(false);
            }
        }

        if (name === "organizationHeadAdhaar") {
            setAdhaarError(!validateAdhaarNo(value));
        }
    };
    return (
        <div className="w-full py-4 px-8 flex flex-col gap-y-10">
            <form onSubmit={handleSubmit}>
                {/* Name, Email, Phone Number, CIN  */}
                {activeStep === 0 && (
                    <div className="flex flex-col justify-center gap-4">
                        <Input
                            crossOrigin={"origin"}
                            label="Full Name"
                            placeholder="Full Name"
                            value={organizationDetails.name}
                            name="fullName"
                            type="text"
                            required
                            onChange={(e) =>
                                setOrganizationDetails({
                                    ...organizationDetails,
                                    name: e.target.value,
                                })
                            }
                        />
                        <Input
                            crossOrigin={"origin"}
                            label="Email Address"
                            placeholder="Enter your email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={organizationDetails.email}
                            required
                            onChange={(e) =>
                                setOrganizationDetails({
                                    ...organizationDetails,
                                    email: e.target.value,
                                })
                            }
                        />
                        <div>
                            <Input
                                crossOrigin={"origin"}
                                label="CIN Number"
                                placeholder="CIN No."
                                name="cinNo"
                                type="text"
                                value={organizationDetails.cinNo}
                                required
                                onChange={formHandler}
                            />
                            <Typography
                                placeholder={""}
                                variant="small"
                                className={`mt-2 flex items-center gap-1 font-normal ${
                                    cinError ? "text-red-500" : "text-green-500"
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        !cinError
                                            ? faCheckCircle
                                            : faTimesCircle
                                    }
                                />
                                {cinError
                                    ? "Please enter a valid CIN"
                                    : "Valid CIN"}
                            </Typography>
                        </div>
                        <div>
                            <Input
                                crossOrigin={"origin"}
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                name="phone"
                                type="tel"
                                value={organizationDetails.phone}
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
                    </div>
                )}
                {activeStep === 1 && (
                    <div className="flex flex-col justify-center gap-4">
                        <Input
                            crossOrigin={"origin"}
                            label="Organization Head Name"
                            placeholder="Enter the name of the head of the Organization"
                            name="organizationHeadName"
                            type="text"
                            value={organizationDetails.organizationHeadName}
                            required
                            onChange={formHandler}
                        />
                        <div>
                            <Input
                                required
                                crossOrigin={"origin"}
                                label="Adhaar No. of Head"
                                placeholder="Adhaar No. of Head"
                                name="organizationHeadAdhaar"
                                type="text"
                                value={
                                    organizationDetails.organizationHeadAdhaar
                                }
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
                            label="Choose Type of Organization"
                            placeholder="Type of Organization"
                            name="typeOfOrganization"
                            value={organizationDetails.typeOfOrganization}
                            onChange={(e) =>
                                setOrganizationDetails({
                                    ...organizationDetails,
                                    typeOfOrganization: e as
                                        | "healthcare"
                                        | "educational"
                                        | "charity"
                                        | "other",
                                })
                            }
                        >
                            {organizationTypes.map((option) => (
                                <Option key={option} value={option}>
                                    {option
                                        .charAt(0)
                                        .toUpperCase()
                                        .concat(option.slice(1))}
                                </Option>
                            ))}
                        </Select>

                        <div>
                            <Input
                                name="password"
                                crossOrigin={"origin"}
                                label="Password"
                                placeholder="Enter your password"
                                value={organizationDetails.password}
                                type={showPassword ? "text" : "password"}
                                required
                                onChange={formHandler}
                                icon={
                                    <FontAwesomeIcon
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className=" cursor-pointer"
                                        icon={showPassword ? faEye : faEyeSlash}
                                    />
                                }
                            />
                            <Typography
                                placeholder={""}
                                variant="small"
                                className={`mt-2 flex items-center gap-1 font-normal ${passwordStrength === "Weak" ? "text-red-500" : "text-green-500"}`}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                {!organizationDetails.password
                                    ? "Password Cannot be empty"
                                    : passwordStrength === "Weak"
                                      ? "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
                                      : "Strong Password"}
                            </Typography>
                        </div>
                        <div>
                            <Input
                                crossOrigin={"origin"}
                                label="Confirm Password"
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={organizationDetails.confirmPassword}
                                required
                                onChange={formHandler}
                                icon={
                                    <FontAwesomeIcon
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        icon={showPassword ? faEye : faEyeSlash}
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
                {activeStep === 2 && (
                    <div className="flex flex-col justify-center gap-4">
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
                                    value={organizationDetails.address.street}
                                    required
                                    onChange={(event) => {
                                        setOrganizationDetails({
                                            ...organizationDetails,
                                            address: {
                                                ...organizationDetails.address,
                                                street: event.target.value,
                                            },
                                        });
                                    }}
                                />
                                <Input
                                    crossOrigin={"origin"}
                                    label="City"
                                    placeholder="City"
                                    value={organizationDetails.address.city}
                                    required
                                    onChange={(event) => {
                                        setOrganizationDetails({
                                            ...organizationDetails,
                                            address: {
                                                ...organizationDetails.address,
                                                city: event.target.value,
                                            },
                                        });
                                    }}
                                />
                                <Select
                                    label="Choose State"
                                    placeholder="State"
                                    value={organizationDetails.address.state}
                                >
                                    {statesOfIndia.map((group) => (
                                        <Option
                                            key={group}
                                            value={group}
                                            onClick={() => {
                                                setOrganizationDetails({
                                                    ...organizationDetails,
                                                    address: {
                                                        ...organizationDetails.address,
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
                                    type="text"
                                    value={organizationDetails.address.pincode}
                                    required
                                    onChange={(event) => {
                                        setOrganizationDetails({
                                            ...organizationDetails,
                                            address: {
                                                ...organizationDetails.address,
                                                pincode: event.target.value,
                                            },
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
                <StepperComponent
                    activeStep={activeStep}
                    isLastStep={isLastStep}
                    isFirstStep={isFirstStep}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    setIsLastStep={setIsLastStep}
                    setIsFirstStep={setIsFirstStep}
                    setActiveStep={setActiveStep}
                />
            </form>
        </div>
    );
}
