/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import {
    Button,
    Input,
    Option,
    Select,
    Typography,
} from "@material-tailwind/react";
import {
    faEye,
    faEyeSlash,
    faInfoCircle,
    faCheckCircle,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    DefaultDoctor,
    checkPasswordStrength,
    validatePhoneNumber,
} from "../utils";
import { DoctorType } from "../types";
import { registerDoctor } from "../services";

const DoctorRegisterForm = () => {
    const [doctorDetails, setDoctorDetails] =
        useState<DoctorType>(DefaultDoctor);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [passwordStrength, setPasswordStrength] = useState<"Strong" | "Weak">(
        "Weak"
    );

    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

    const [phoneError, setPhoneError] = useState<boolean>(true);

    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDoctorDetails({ ...doctorDetails, [name]: value });

        if (name === "password") {
            checkPasswordStrength(value, setPasswordStrength);
            if (doctorDetails.confirmPassword !== value) {
                setPasswordMatch(false);
            } else {
                setPasswordMatch(true);
            }
        }

        if (name === "confirmPassword") {
            if (
                doctorDetails.password !== value ||
                doctorDetails.confirmPassword === ""
            ) {
                setPasswordMatch(false);
            } else {
                setPasswordMatch(true);
            }
        }

        // Additional validation for phone and adhaar
        if (name === "phone") {
            setPhoneError(!validatePhoneNumber(value));
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await registerDoctor(doctorDetails);
            <Navigate to={"/login"} />;
        } catch (error: any) {
            console.error(error);
            toast(error?.message || "An error occured", { type: "error" });
        }
    };

    return (
        <div className="w-full py-4 px-8 flex flex-col gap-y-10">
            <form onSubmit={handleSubmit}>
                {/* Full Name and phone */}
                <div className="flex flex-col justify-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-[50%]">
                            <Input
                                crossOrigin={"origin"}
                                label="Full Name"
                                placeholder="Full Name"
                                value={doctorDetails.fullName}
                                name="fullName"
                                required
                                onChange={formHandler}
                            />
                        </div>
                        <div className="w-[50%]">
                            <Input
                                crossOrigin={"origin"}
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                name="phoneNo"
                                value={doctorDetails.phoneNo}
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
                                    ? "Phone Number should contain 10 digits"
                                    : "Valid phone number"}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            crossOrigin={"origin"}
                            type="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            name="email"
                            value={doctorDetails.email}
                            required
                            onChange={formHandler}
                        />
                        <Input
                            crossOrigin={"origin"}
                            type="text"
                            label="Identification No."
                            placeholder="Identification No."
                            name="doctorId"
                            value={doctorDetails.doctorId}
                            required
                            onChange={formHandler}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Input
                            crossOrigin={"origin"}
                            type="date"
                            label="Date of Birth"
                            placeholder="Enter your date of birth"
                            name="dateOfBirth"
                            value={doctorDetails.dateOfBirth}
                            onChange={(e) => {
                                setDoctorDetails({
                                    ...doctorDetails,
                                    dateOfBirth: e.target.value,
                                });
                            }}
                            required
                        />
                        <Select
                            label="Gender"
                            placeholder="Gender"
                            name="gender"
                            value={doctorDetails.gender}
                            onChange={(e) => {
                                setDoctorDetails({
                                    ...doctorDetails,
                                    gender: e as "male" | "female" | "others",
                                });
                            }}
                        >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-[50%]">
                            <Input
                                name="password"
                                crossOrigin={"origin"}
                                label="Password"
                                placeholder="Enter your password"
                                value={doctorDetails.password}
                                type={showPassword ? "text" : "password"}
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
                                className={`mt-2 flex items-center gap-1 font-normal ${passwordStrength === "Weak" ? "text-red-500" : "text-green-500"}`}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} />
                                {!doctorDetails.password
                                    ? "Password Cannot be empty"
                                    : passwordStrength === "Weak"
                                      ? "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
                                      : "Strong Password"}
                            </Typography>
                        </div>
                        <div className="w-[50%]">
                            <Input
                                crossOrigin={"origin"}
                                label="Confirm Password"
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={doctorDetails.confirmPassword}
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
                                    !passwordMatch ||
                                    !doctorDetails.confirmPassword
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
                                {passwordMatch && doctorDetails.confirmPassword
                                    ? "Password Matched"
                                    : "Password not matching"}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-evenly">
                        <Button
                            variant="gradient"
                            size="sm"
                            color="green"
                            placeholder={""}
                            type="submit"
                        >
                            Register
                        </Button>
                        <Button
                            variant="gradient"
                            size="sm"
                            color="red"
                            placeholder={""}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DoctorRegisterForm;
