import React from "react";
import LoginFormComponent from "./LoginForm";
import { RegistrationPage } from "../RegistrationPage";
import { Dialog } from "@material-tailwind/react";

export default function AuthPopup({
    isRegisterForm,
    isLoginForm,
    open,
    setOpen,
    openRegisterForm,
    openLoginForm,
}: {
    isRegisterForm: boolean;
    isLoginForm: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    openRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
    openLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <>
            <Dialog
                placeholder={""}
                open={open}
                handler={setOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                aria-modal={true}
            >
                {isLoginForm && !isRegisterForm && (
                    <LoginFormComponent
                        openLoginForm={openLoginForm}
                        openRegisterForm={openRegisterForm}
                        openAuthPopup={setOpen}
                    />
                )}
                {isRegisterForm && !isLoginForm && (
                    <RegistrationPage
                        openRegisterForm={openRegisterForm}
                        openLoginForm={openLoginForm}
                        openAuthPopup={setOpen}
                    />
                )}
            </Dialog>
        </>
    );
}
