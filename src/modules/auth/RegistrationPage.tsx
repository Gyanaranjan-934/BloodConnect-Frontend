import React, { ReactElement, useState } from "react";
import { Radio, Typography } from "@material-tailwind/react";
import { OrganizationRegisterForm } from "./components/OrganizationRegisterForm";
import DoctorRegisterForm from "./components/DoctorRegisterForm";
import IndividualRegisterForm from "./components/IndividualRegisterForm1";
import { ErrorBoundary } from "react-error-boundary";

export const RegistrationPage = ({
    openLoginForm,
    openRegisterForm,
    openAuthPopup,
}: {
    openLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
    openRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
    openAuthPopup: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
    // get the current geolocation

    const [user, setUser] = useState<"individual" | "organization" | "doctor">(
        "individual"
    );

    return (
        <>
            <div className="w-full flex h-full justify-center items-center">
                <div className="w-full m-4 p-4 shadow-md rounded-md">
                    <Typography className="self-center" placeholder={""}>
                        Already have an account ?{" "}
                        <span
                            className=" text-blue-300 font-semibold hover:underline cursor-pointer"
                            onClick={() => {
                                openLoginForm(true);
                                openRegisterForm(false);
                            }}
                        >
                            Login
                        </span>{" "}
                        here.
                    </Typography>
                    <div className="flex justify-center">
                        <Typography className=" self-center" placeholder={""}>
                            {" "}
                            Register As:{" "}
                        </Typography>
                        <div className="flex gap-10">
                            <Radio
                                name="type"
                                onClick={() => setUser("individual")}
                                label="Individual"
                                defaultChecked
                                crossOrigin={"origin"}
                            />
                            <Radio
                                name="type"
                                onClick={() => setUser("organization")}
                                label="Organization"
                                crossOrigin={"origin"}
                            />
                            <Radio
                                name="type"
                                onClick={() => setUser("doctor")}
                                label="Doctor"
                                crossOrigin={"origin"}
                            />
                        </div>
                    </div>
                    <br />
                    {user === "individual" && (
                        <ErrorBoundary fallback={<div>Something went wrong</div>}>
                            <IndividualRegisterForm 
                                openLoginForm={openLoginForm}
                                openRegisterForm={openRegisterForm}
                                openAuthPopup={openAuthPopup}
                            />
                        </ErrorBoundary>
                    )}
                    {user === "organization" && (
                        <ErrorBoundary fallback={<div>Something went wrong</div>}>
                            <OrganizationRegisterForm />
                        </ErrorBoundary>
                    )}
                    {user === "doctor" && (
                        <ErrorBoundary fallback={<div>Something went wrong</div>}>
                            <DoctorRegisterForm />
                        </ErrorBoundary>
                    )}
                </div>
            </div>
        </>
    );
};
