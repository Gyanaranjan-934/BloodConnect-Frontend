import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Typography,
} from "@material-tailwind/react";
import { OrganizationType } from "../types";

export default function OrganizationDetailsPopup({
    open,
    setOpen,
    organization,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    organization: OrganizationType | null;
}) {
    const handleOpen = () => setOpen(!open);
    return (
        <>
            {organization && (
                <Dialog
                    placeholder={""}
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogBody placeholder={""}>
                        <div className="flex flex-col gap-4">
                            <div className="rounded shadow p-2 bg-gray-200">
                                <Typography
                                    placeholder={""}
                                    variant="paragraph"
                                    color="black"
                                    className="font-bold"
                                >
                                    Email:{" "}
                                    <span className=" text-sm font-normal">
                                        {organization.email}
                                    </span>
                                </Typography>
                                <Typography
                                    placeholder={""}
                                    variant="paragraph"
                                    color="black"
                                    className="font-bold"
                                >
                                    Phone:{" "}
                                    <span className=" text-sm font-normal">
                                        {organization.phone}
                                    </span>
                                </Typography>
                                <Typography
                                    placeholder={""}
                                    variant="paragraph"
                                    color="black"
                                    className="font-bold"
                                >
                                    Address:{" "}
                                    <span className=" text-sm font-normal">
                                        {Object.values(
                                            organization.address
                                        ).join(", ")}
                                    </span>
                                </Typography>
                            </div>
                        </div>
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
                    </DialogFooter>
                </Dialog>
            )}
        </>
    );
}
