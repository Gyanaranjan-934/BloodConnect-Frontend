import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import { BloodReportType } from "../types";
import { DefaultBloodReportDetails, getUserType } from "../utils";

function BloodReport({
    open,
    setOpen,
    userId,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
}) {
    const handleOpen = () => setOpen(!open);

    const [bloodReportDetails, setBloodReportDetails] =
        React.useState<BloodReportType>(DefaultBloodReportDetails);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBloodReportDetails({ ...bloodReportDetails, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <Dialog
                placeholder={""}
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader placeholder={""}>
                    <div className="flex justify-between items-center gap-4 w-full">
                        <Typography placeholder={""} variant="h4">
                            Blood Report Details
                        </Typography>
                        <Typography
                            placeholder={""}
                            variant="small"
                            color="red"
                        >
                            Last Updated:{" "}
                            <span className="text-gray-500">
                                {new Date().toLocaleString()}
                            </span>
                        </Typography>
                    </div>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody placeholder={""}>
                        <div className="flex flex-col gap-4">
                            <Input
                                label="Blood Pressure"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={bloodReportDetails.bloodPressure}
                                name="bloodPressure"
                                onChange={handleChange}
                                disabled={getUserType === "individual"}
                            />
                            <Input
                                label="Weight"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={bloodReportDetails.weight}
                                name="weight"
                                onChange={handleChange}
                                disabled={getUserType === "individual"}
                            />
                            <Input
                                label="Height"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={bloodReportDetails.height}
                                name="height"
                                onChange={handleChange}
                                disabled={getUserType === "individual"}
                            />
                            <Input
                                label="Blood Sugar"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={bloodReportDetails.bloodSugar}
                                name="bloodSugar"
                                onChange={handleChange}
                                disabled={getUserType === "individual"}
                            />
                            <Input
                                label="Hemoglobin"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={bloodReportDetails.hemoglobin}
                                name="hemoglobin"
                                onChange={handleChange}
                                disabled={getUserType === "individual"}
                            />
                            <Input
                                label="Heart Rate"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={bloodReportDetails.heartRate}
                                name="heartRate"
                                onChange={handleChange}
                                disabled={getUserType === "individual"}
                            />
                        </div>
                    </DialogBody>
                    <DialogFooter placeholder={""}>
                        {getUserType === "doctor" ? (
                            <>
                                <Button
                                    placeholder={""}
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    placeholder={""}
                                    variant="gradient"
                                    color="green"
                                    type="submit"
                                >
                                    <span>Confirm</span>
                                </Button>
                            </>
                        ) : (
                            <Button
                                placeholder={""}
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Close</span>
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}

export default BloodReport;
