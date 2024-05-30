import React from "react";
import { EventDetailsDonorType } from "../../types";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography,
} from "@material-tailwind/react";
import BloodReport from "../../../auth/components/BloodReport";

export default function DonorDetailsPopup({
    open,
    setOpen,
    donor,
    eventId,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    donor: EventDetailsDonorType | null;
    eventId: string;
}) {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    return (
        <>
            {!isAlertPopupOpen && donor && (
                <Dialog
                    placeholder={""}
                    open={open}
                    handler={setOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader placeholder={""}>
                        {donor.name}
                    </DialogHeader>
                    <DialogBody placeholder={""}>
                        <Typography
                            placeholder={""}
                            variant="small"
                            color="red"
                        >
                            {donor.email}
                        </Typography>
                    </DialogBody>
                    <DialogFooter placeholder={undefined}>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                            placeholder={undefined}
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            onClick={() => {
                                setIsAlertPopupOpen(true);
                            }}
                            placeholder={undefined}
                        >
                            <span>Fill Blood Report</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            )}
            {isAlertPopupOpen && donor && (
                <BloodReport
                    open={isAlertPopupOpen}
                    setOpen={setIsAlertPopupOpen}
                    userId={donor._id}
                    eventId={eventId}
                />
            )}
        </>
    );
}
