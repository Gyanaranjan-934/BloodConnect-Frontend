import { ReactElement, useEffect, useState } from "react";
import { RegistrationFormComponent } from "./components/IndividualRegisterForm";
import { Radio, Typography } from "@material-tailwind/react";
import { OrganizationRegisterForm } from "./components/OrganizationRegisterForm";
import DoctorRegisterForm from "./components/DoctorRegisterForm";
import ErrorBoundary from "../../ErrorBoundary";

export const RegistrationPage = (): ReactElement => {
    // get the current geolocation

    const [user, setUser] = useState<"individual" | "organization" | "doctor">(
        "individual"
    );

    return (
        <>
            <div className="w-full flex h-full">
                <div className="m-4 w-[50%] p-4 bg-white"></div>
                <div className="w-[50%]">
                    <div className="flex justify-center">
                        <Typography className=" self-center">
                            {" "}
                            Register As:{" "}
                        </Typography>
                        <div className="flex gap-10">
                            <Radio
                                name="type"
                                onClick={() => setUser("individual")}
                                label="Individual"
                                defaultChecked
                            />
                            <Radio
                                name="type"
                                onClick={() => setUser("organization")}
                                label="Organization"
                            />
                            <Radio
                                name="type"
                                onClick={() => setUser("doctor")}
                                label="Doctor"
                            />
                        </div>
                    </div>
                    <br />
                    {user === "individual" && (
                        <ErrorBoundary>
                            <RegistrationFormComponent />
                        </ErrorBoundary>
                    )}
                    {user === "organization" && (
                        <ErrorBoundary>
                            <OrganizationRegisterForm />
                        </ErrorBoundary>
                    )}
                    {user === "doctor" && (
                        <ErrorBoundary>
                            <DoctorRegisterForm />
                        </ErrorBoundary>
                    )}
                </div>
            </div>
        </>
    );
};
