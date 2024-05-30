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
import { fillBloodReport } from "../../events/services";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { getBloodReports } from "../../dashboard/services";

function BloodReport({
    open,
    setOpen,
    userId,
    eventId,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
    eventId?: string;
}) {
    const handleOpen = () => setOpen(!open);

    const { data, refetch } = useQuery({
        queryKey: ["bloodReport"],
        queryFn: getUserType !== "doctor" ? getBloodReports : () => [] as [],
    });

    React.useEffect(() => {
        if (!data) {
            refetch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const bloodReportData =
        data && data.length > 0
            ? data[0]
            : {
                  bloodPressure: "",
                  weight: "",
                  height: "",
                  sugarLevel: "",
                  hemoglobinCount: "",
                  heartRateCount: "",
                  createdAt: new Date(),
              };

    const [bloodReportDetails, setBloodReportDetails] =
        React.useState<BloodReportType>(DefaultBloodReportDetails);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBloodReportDetails({ ...bloodReportDetails, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(bloodReportDetails);
        const response = await fillBloodReport(
            eventId,
            userId,
            bloodReportDetails
        );
        if (response) {
            toast("Blood report filled successfully", { type: "success" });
            handleOpen();
        } else {
            toast("Blood report not filled", { type: "error" });
        }
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
                                {getUserType !== "doctor"
                                    ? new Date(
                                          bloodReportData.createdAt
                                      ).toLocaleString()
                                    : new Date().toLocaleString()}
                            </span>
                        </Typography>
                    </div>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody placeholder={""}>
                        <div className="flex flex-col gap-4">
                            {getUserType === "doctor" && (
                                <Input
                                    crossOrigin={"origin"}
                                    type="text"
                                    placeholder=""
                                    label="Blood Units donated"
                                    title="Blood Units donated"
                                    value={bloodReportDetails.bloodUnits}
                                    name="bloodUnits"
                                    onChange={(e) =>
                                        setBloodReportDetails({
                                            ...bloodReportDetails,
                                            bloodUnits: e.target.value,
                                        })
                                    }
                                    disabled={getUserType !== "doctor"}
                                />
                            )}
                            <Input
                                label="Blood Pressure"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                title="Blood Pressure"
                                value={
                                    getUserType !== "doctor"
                                        ? `Blood Pressure: ${bloodReportData.bloodPressure}`
                                        : bloodReportDetails.bloodPressure
                                }
                                name="bloodPressure"
                                onChange={handleChange}
                                disabled={getUserType !== "doctor"}
                            />
                            <Input
                                label="Weight"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={
                                    getUserType !== "doctor"
                                        ? `Weight: ${bloodReportData.weight}`
                                        : bloodReportDetails.weight
                                }
                                name="weight"
                                onChange={handleChange}
                                disabled={getUserType !== "doctor"}
                            />
                            <Input
                                label="Height"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={
                                    getUserType !== "doctor"
                                        ? `Height: ${bloodReportData.height}`
                                        : bloodReportDetails.height
                                }
                                name="height"
                                onChange={handleChange}
                                disabled={getUserType !== "doctor"}
                            />
                            <Input
                                label="Blood Sugar"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={
                                    getUserType !== "doctor"
                                        ? `Blood Sugar: ${bloodReportData.sugarLevel}`
                                        : bloodReportDetails.bloodSugar
                                }
                                name="bloodSugar"
                                onChange={handleChange}
                                disabled={getUserType !== "doctor"}
                            />
                            <Input
                                label="Hemoglobin"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={
                                    getUserType !== "doctor"
                                        ? `Hemoglobin: ${bloodReportData.hemoglobinCount}`
                                        : bloodReportDetails.hemoglobin
                                }
                                name="hemoglobin"
                                onChange={handleChange}
                                disabled={getUserType !== "doctor"}
                            />
                            <Input
                                label="Heart Rate"
                                type="text"
                                placeholder=""
                                crossOrigin={"origin"}
                                value={
                                    getUserType !== "doctor"
                                        ? `Heart Rate: ${bloodReportData.heartRateCount}`
                                        : bloodReportDetails.heartRate
                                }
                                name="heartRate"
                                onChange={handleChange}
                                disabled={getUserType !== "doctor"}
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
