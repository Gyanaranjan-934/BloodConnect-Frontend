/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IndividualRegisterFormType } from "../types";
import { DefaultIndividualRegisterForm, checkPasswordStrength } from "../utils";
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
import { bloodGroups } from "../constants";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { firebaseApp } from "../../../services/firebase";
import { toast } from "react-toastify";
import { registerIndividual } from "../services";
import { AuthContext } from "../AuthContext";

export default function IndividualRegisterForm({
    openLoginForm,
    openRegisterForm,
    openAuthPopup,
}: {
    openLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    openRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
    openAuthPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [individualDetails, setIndividualDetails] =
        React.useState<IndividualRegisterFormType>(
            DefaultIndividualRegisterForm
        );

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const [isLoading, setLoading] = React.useState<boolean>(false);

    const [passwordStrength, setPasswordStrength] = React.useState<
        "Strong" | "Weak"
    >("Weak");

    const [passwordMatch, setPasswordMatch] = React.useState<boolean>(false);

    const { geoLocation } = React.useContext(AuthContext);
    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
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
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const auth = getAuth(firebaseApp);
        try {
            setLoading(true);
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
                const response = await registerIndividual(
                    individualDetails,
                    geoLocation
                );
                if (response) {
                    openLoginForm(false);
                    openRegisterForm(false);
                    openAuthPopup(false);
                } else {
                    toast("An error occured", { type: "error" });
                }
            }
            // const response = await registerIndividual(
            //     individualDetails,
            //     geoLocation
            // );
            // if (response) {
            //     openLoginForm(false);
            //     openRegisterForm(false);
            //     openAuthPopup(false);
            // } else {
            //     toast("An error occured", { type: "error" });
            // }
        } catch (error: any) {
            console.error(error);
            toast(error?.message || "An error occured", { type: "error" });
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className="w-full py-4 px-8 flex flex-col gap-10">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-4">
                    <Input
                        crossOrigin={"origin"}
                        label="Full Name"
                        placeholder="Full Name"
                        value={individualDetails.name}
                        name="name"
                        required
                        onChange={onChangeHandler}
                    />
                    <Input
                        crossOrigin={"origin"}
                        label="Email Address"
                        placeholder="Enter your email"
                        name="email"
                        value={individualDetails.email}
                        required
                        onChange={onChangeHandler}
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
                            onChange={onChangeHandler}
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
                            onChange={onChangeHandler}
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
                    <Select
                        label="Choose Blood Group"
                        placeholder="Blood Group"
                        aria-required
                        value={individualDetails.bloodGroup}
                        onChange={(value) =>
                            setIndividualDetails({
                                ...individualDetails,
                                bloodGroup: value ? value : "",
                            })
                        }
                    >
                        {bloodGroups.map((group) => (
                            <Option key={group} value={group}>
                                {group}
                            </Option>
                        ))}
                    </Select>
                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="gradient"
                            size="sm"
                            color="blue"
                            placeholder={""}
                            onClick={() => {
                                openLoginForm(false);
                                openRegisterForm(false);
                                openAuthPopup(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button placeholder={""} color="green" type="submit" loading={isLoading}>
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
