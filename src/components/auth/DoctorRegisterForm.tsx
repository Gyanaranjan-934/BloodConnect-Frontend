import React, { useState } from "react";
import eyeClosed from "../../assets/eye-close-svgrepo-com.svg";
import eyeOpended from "../../assets/eye-open-svgrepo-com.svg";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
const DoctorRegisterForm = () => {
    const [userDetails, setUserDetails] = useState({
        fullName: "",
        phoneNo: "",
        email: "",
        doctorId: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        gender: "",
    });
    const [userDOB, setUserDOB] = useState<string>();
    const [genderDropdownOpen, setGenderDropdownOpen] =
        useState<boolean>(false);
    const [gender, setGender] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<string>("weak");
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [phoneError, setPhoneError] = useState<string>("");
    const { registerDoctor, setLoadingValue } =
        React.useContext(AuthContext);

    const genderOptions = ["Male", "Female", "Others"];

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
                setPhoneError("");
            }
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoadingValue(10);
            await registerDoctor({...userDetails,avatar})
            setLoadingValue(100);
            <Navigate to={"/login"} />;
        } catch (error: any) {
            console.error(error);
            toast(error?.message || "An error occured", { type: "error" });
        }
    };

    return (
        <div className="mx-auto w-full bg-white">
            <form onSubmit={handleSubmit}>
                {/* Full Name and phone */}
                <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                        <label
                            htmlFor="fullName"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Full Name"
                            value={userDetails.fullName}
                            onChange={formHandler}
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
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
                            <div className="text-red-500 text-sm">
                                {phoneError}
                            </div>
                        )}
                    </div>
                </div>
                {/* Email and DOB */}
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
                                htmlFor="dateOfBirth"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                value={userDOB}
                                onChange={(e) => {
                                    setUserDOB(e.target.value);
                                    formHandler(e);
                                }}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                </div>
                {/* ID, profile pic and gender */}
                <div className=" -mx-3 flex flex-wrap">
                    <div className=" w-full px-3 sm:w-1/3">
                        <div className=" mb-5">
                            <label
                                htmlFor="doctorId"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Identification Number
                            </label>
                            <input
                                type="text"
                                name="doctorId"
                                id="doctorId"
                                placeholder="Identification No."
                                value={userDetails.doctorId}
                                onChange={formHandler}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
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
                                htmlFor="gender"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Gender
                            </label>
                            <input
                                type="button"
                                name="gender"
                                id="gender"
                                value={gender || "Choose Gender"}
                                onClick={() =>
                                    setGenderDropdownOpen(!genderDropdownOpen)
                                }
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md cursor-pointer"
                            />
                            {/* Dropdown */}
                            {genderDropdownOpen && (
                                <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                    {genderOptions.map((group) => (
                                        <div
                                            key={group}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setGender(group);
                                                setGenderDropdownOpen(false);
                                                setUserDetails({
                                                    ...userDetails,
                                                    gender: group,
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
                {/* password and confirm password */}
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
                                onClick={() => setShowPassword(!showPassword)}
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
                                onClick={() => setShowPassword(!showPassword)}
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
                <div className="flex justify-center">
                    <button className="hover:shadow-form w-auto self-center rounded-md bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorRegisterForm;
