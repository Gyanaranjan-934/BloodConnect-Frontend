/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, useState } from "react";
import { firebaseApp } from "../../../services/firebase";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
} from "firebase/auth";
import {
    Checkbox,
    Input,
    Option,
    Select,
    Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faEye,
    faEyeSlash,
    faInfoCircle,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
    DefaultIndividualForm,
    checkPasswordStrength,
    validateAdhaarNo,
    validatePhoneNumber,
} from "../utils";
import StepperComponent from "./Stepper";
import { bloodGroups, statesOfIndia } from "../constants";
import { IndividualFormType } from "../types";
import { registerIndividual } from "../services";

export const RegistrationFormComponent = (): ReactElement => {
    const [individualDetails, setIndividualDetails] =
        React.useState<IndividualFormType>(DefaultIndividualForm);

    const [userDOB, setUserDOB] = useState<string>("");

    const [bloodGroup, setBloodGroup] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [passwordStrength, setPasswordStrength] = useState<"Strong" | "Weak">(
        "Weak"
    );

    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

    const [phoneError, setPhoneError] = useState<boolean>(true);

    const [adhaarError, setAdhaarError] = useState<boolean>(true);

    const [isAddressSame, setSameAddress] = useState<boolean>(false);

    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setIndividualDetails({ ...individualDetails, [name]: value });

        if (name === "password") {
            checkPasswordStrength(value, setPasswordStrength);
            if (individualDetails.confirmPassword !== value) {
                setPasswordMatch(false);
            } else {
                setPasswordMatch(true);
            }
        }

        if (name === "confirmPassword") {
            setPasswordMatch(
                individualDetails.password !== value ||
                    individualDetails.password === ""
                    ? false
                    : true
            );
        }

        // Additional validation for phone and adhaar
        if (name === "phone") {
            setPhoneError(!validatePhoneNumber(value));
        }

        if (name === "adhaar") {
            setAdhaarError(!validateAdhaarNo(value));
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (isAddressSame) {
                setIndividualDetails({
                    ...individualDetails,
                    permanentAddress: {
                        street: individualDetails.presentAddress.street,
                        city: individualDetails.presentAddress.city,
                        state: individualDetails.presentAddress.state,
                        pincode: individualDetails.presentAddress.pincode,
                    },
                });
            }
            const auth = getAuth(firebaseApp);
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                individualDetails.email,
                individualDetails.password
            );
            if (userCredential.user) {
                await sendEmailVerification(userCredential.user);
                toast(
                    "An email has been sent to your provided email address, please verify this email to continue to login.",
                    {
                        type: "info",
                    }
                );
                setIndividualDetails({
                    ...individualDetails,
                    dateOfBirth: userDOB,
                    bloodGroup,
                });
                await registerIndividual(individualDetails);
                <Navigate to={"/login"} />;
            }
        } catch (error: any) {
            console.error(error);
            toast(error?.message || "An error occured", { type: "error" });
        }
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
    return (
        <>
            <div className="w-full py-4 px-8 flex flex-col gap-y-10">
                <form onSubmit={handleSubmit}>
                    {/* First Page includes Full Name, Email, Phone Number, Password, Confirm Password */}
                    {activeStep === 0 && (
                        <div className="flex flex-col justify-center gap-4">
                            <Input
                                crossOrigin={"origin"}
                                label="Full Name"
                                placeholder="Full Name"
                                value={individualDetails.name}
                                name="fullName"
                                required
                                onChange={(e) =>
                                    setIndividualDetails({
                                        ...individualDetails,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <Input
                                crossOrigin={"origin"}
                                label="Email Address"
                                placeholder="Enter your email"
                                name="email"
                                value={individualDetails.email}
                                required
                                onChange={(e) =>
                                    setIndividualDetails({
                                        ...individualDetails,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <div>
                                <Input
                                    name="password"
                                    crossOrigin={"origin"}
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={individualDetails.password}
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
                                    className={`mt-2 flex items-center gap-1 font-normal ${passwordStrength === "Weak" ? "text-red-500" : "text-green-500"}`}
                                >
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    {!individualDetails.password
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
                                    value={individualDetails.confirmPassword}
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
                    {/* Second Page includes Adhaar No., Date of Birth, Blood Group, Phone number*/}
                    {activeStep === 1 && (
                        <div className="flex flex-col justify-center gap-4">
                            <div>
                                <Input
                                    crossOrigin={"origin"}
                                    label="Phone Number"
                                    placeholder="Enter your phone number"
                                    name="phone"
                                    value={individualDetails.phone}
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
                                    type="text"
                                    value={individualDetails.adhaarNo}
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
                                            individualDetails.presentAddress
                                                .street
                                        }
                                        required
                                        onChange={(event) => {
                                            setIndividualDetails({
                                                ...individualDetails,
                                                presentAddress: {
                                                    ...individualDetails.presentAddress,
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
                                            individualDetails.presentAddress
                                                .city
                                        }
                                        required
                                        onChange={(event) => {
                                            setIndividualDetails({
                                                ...individualDetails,
                                                presentAddress: {
                                                    ...individualDetails.presentAddress,
                                                    city: event.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <Select
                                        label="Choose State"
                                        placeholder="State"
                                        value={
                                            individualDetails.presentAddress
                                                .state
                                        }
                                    >
                                        {statesOfIndia.map((group) => (
                                            <Option
                                                key={group}
                                                value={group}
                                                onClick={() => {
                                                    setIndividualDetails({
                                                        ...individualDetails,
                                                        presentAddress: {
                                                            ...individualDetails.presentAddress,
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
                                            individualDetails.presentAddress
                                                .pincode
                                        }
                                        required
                                        onChange={(event) => {
                                            setIndividualDetails({
                                                ...individualDetails,
                                                presentAddress: {
                                                    ...individualDetails.presentAddress,
                                                    pincode: Number(
                                                        event.target.value
                                                    ),
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
                                            individualDetails.permanentAddress
                                                .street
                                        }
                                        disabled={isAddressSame}
                                        onChange={(event) => {
                                            setIndividualDetails({
                                                ...individualDetails,
                                                permanentAddress: {
                                                    ...individualDetails.permanentAddress,
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
                                            individualDetails.permanentAddress
                                                .city
                                        }
                                        disabled={isAddressSame}
                                        onChange={(event) => {
                                            setIndividualDetails({
                                                ...individualDetails,
                                                permanentAddress: {
                                                    ...individualDetails.permanentAddress,
                                                    city: event.target.value,
                                                },
                                            });
                                        }}
                                    />
                                    <Select
                                        disabled={isAddressSame}
                                        label="Choose State"
                                        placeholder="State"
                                        value={
                                            isAddressSame
                                                ? individualDetails
                                                      .presentAddress.state
                                                : individualDetails
                                                      .permanentAddress.state
                                        }
                                    >
                                        {statesOfIndia.map((group) => (
                                            <Option
                                                key={group}
                                                value={group}
                                                onClick={() => {
                                                    setIndividualDetails({
                                                        ...individualDetails,
                                                        permanentAddress: {
                                                            ...individualDetails.permanentAddress,
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
                                            individualDetails.permanentAddress
                                                .pincode
                                        }
                                        disabled={isAddressSame}
                                        onChange={(event) => {
                                            setIndividualDetails({
                                                ...individualDetails,
                                                permanentAddress: {
                                                    ...individualDetails.permanentAddress,
                                                    pincode: Number(
                                                        event.target.value
                                                    ),
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
        </>
    );
};
