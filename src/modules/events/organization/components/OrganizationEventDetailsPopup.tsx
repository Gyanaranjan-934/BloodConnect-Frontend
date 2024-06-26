import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import { EventType } from "../../utils";
export default function OrganizationEventDetailsPopup({
    open,
    setOpen,
    event,
    setEditEnabled,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    event: EventType;
    setEditEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const handleOpen = () => setOpen(!open);

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
                <DialogHeader placeholder={""}>{event.eventName}</DialogHeader>
                <DialogBody placeholder={""}>
                    The key to more success is to have a lot of pillows. Put it
                    this way, it took me twenty five years to get these plants,
                    twenty five years of blood sweat and tears, and I&apos;m
                    never giving up, I&apos;m just getting started. I&apos;m up
                    to something. Fan luv.
                </DialogBody>
                <DialogFooter placeholder={""}>
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
                        onClick={() => {
                            setEditEnabled(true);
                            setOpen(false);
                        }}
                    >
                        <span>Update</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            
        </>
    );
}
