import { ReactElement, useState } from "react";
import { RegistrationFormComponent } from "./components/IndividualRegisterForm";
import { Radio, Typography } from "@material-tailwind/react";
import { OrganizationRegisterForm } from "./components/OrganizationRegisterForm";
import DoctorRegisterForm from "./components/DoctorRegisterForm";
import ErrorBoundary from "../../ErrorBoundary";
import { AuthPageCarousel } from "./components/PageCarosoul";

export const RegistrationPage = (): ReactElement => {
    // get the current geolocation

    const [user, setUser] = useState<"individual" | "organization" | "doctor">(
        "individual"
    );

    return (
        <>
            <div className="w-full flex h-full justify-center items-center">
                <div className="m-4 w-[50%] h-full p-4 bg-white">
                    <AuthPageCarousel />
                </div>
                <div className="w-[50%] m-4 p-4 shadow-md rounded-md">
                    <div className="flex justify-center">
                        <Typography
                            className=" self-center"
                            placeholder={""}
                        >
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
