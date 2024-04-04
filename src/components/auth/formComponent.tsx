import React, { ReactElement, useState } from "react";
import { firebaseApp} from "../../services/firebase";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";

export const RegistrationFormComponent = (): ReactElement => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        phone: "",
        email: "",
        adhaar: "",
        password: "",
        confirmPassword: "",
    });
    const [userDOB, setUserDOB] = useState<string>();
    const [bloodGroupDropdownOpen, setBloodGroupDropdownOpen] =
        useState<boolean>(false);
    const [bloodGroup, setBloodGroup] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passwordStrength, setPasswordStrength] = useState<string>("weak");
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<File | null>(null);
    const [phoneError, setPhoneError] = useState<string>("");
    const [adhaarError, setAdhaarError] = useState<string>("");

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
                setPhoneError("Phone number should be 10 digits and contain only numeric values.");
            } else {
                setPhoneError("");
            }
        }

        if (name === "adhaar") {
            const isValidNumber = /^\d{12}$/g.test(value);
            if (!isValidNumber) {
                setAdhaarError("Adhaar number should be 12 digits and contain only numeric values.");
            } else {
                setAdhaarError("");
            }
        }
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const auth = getAuth(firebaseApp);
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userDetails.email,
                userDetails.password
            );
            const user = userCredential.user; // Accessing the User object from UserCredential
            console.log(user);
            if(user){
                const sendEmail = await sendEmailVerification(user);
            }


        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
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
                        <div className="mb-5">
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
                        <div className="-mx-3 flex flex-wrap">
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
                            <div className=" w-full px-3 sm:w-1/2">
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
                        </div>

                        <div className=" -mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
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
                                                setAvatar(
                                                    event.target.files[0]
                                                );
                                            }
                                        }}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
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
                                        value={
                                            bloodGroup || "Choose Blood Group"
                                        }
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
                            <div
                                className={`text-sm ${passwordStrength === "weak" ? "text-red-500" : passwordStrength === "Strong" ? "text-green-500" : "text-yellow-500"}`}
                            >
                                {passwordStrength}
                            </div>
                        </div>
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
                            <div
                                className={`text-sm ${!passwordMatch ? "text-red-500" : "text-green-500"}`}
                            >
                                {passwordMatch
                                    ? "Password Matched"
                                    : "Password not matching"}
                            </div>
                        </div>
                        <div>
                            <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
