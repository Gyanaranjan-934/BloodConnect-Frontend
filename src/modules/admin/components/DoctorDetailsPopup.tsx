import React from "react";
import { DoctorType } from "../types";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react";
import { verifyDoctor } from "../services";
import { toast } from "react-toastify";

export default function DoctorDetailsPopup({
    open,
    setOpen,
    doctor,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    doctor: DoctorType;
}) {
    const [isLoading, setLoading] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(!open);
    const handleVerify = async () => {
        try {
            setLoading(true);
            const response = await verifyDoctor(doctor._id);
            if (response) {
                toast("Doctor verified successfully", { type: "success" });
                setOpen(false);
            } else {
                toast("Doctor not verified", { type: "error" });
            }
        } catch (error) {
            console.log("Error verifying doctor:", error);
            toast("Error in verifying doctor", { type: "error" });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
        <Dialog
            placeholder={""}
            open={open}
            handler={handleOpen}
        >
            <DialogHeader placeholder={""}>{doctor.name}</DialogHeader>
            <DialogBody
                placeholder={""}
                className=" w-full text-wrap overflow-auto"
            >
                {JSON.stringify(doctor)}
            </DialogBody>
            <DialogFooter placeholder={""}>
                <Button
                    placeholder={""}
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Close</span>
                </Button>
                <Button
                    placeholder={""}
                    variant="gradient"
                    color="green"
                    onClick={handleVerify}
                    disabled={doctor.isVerified}
                >
                    <span>{doctor.isVerified ? "Verified" : isLoading ? "Verifying..." : "Verify"}</span>
                </Button>
            </DialogFooter>
        </Dialog>
        </>
    );
}
