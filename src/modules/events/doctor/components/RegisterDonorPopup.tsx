/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Option,
    Select,
} from "@material-tailwind/react";
import React from "react";
import { bloodGroups } from "../../../auth/constants";
import { DonorFormDetailsByDoctorType } from "../../types";
import { registerForEventByDoctor } from "../../services";
import { toast } from "react-toastify";

export default function RegisterDonorPopup({
    open,
    setOpen,
    eventId,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    eventId: string;
}) {
    const [userDetails, setUserDetails] =
        React.useState<DonorFormDetailsByDoctorType>({
            bloodGroup: "",
            phone: "",
            email: "",
            name: "",
        });
    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await registerForEventByDoctor(eventId, userDetails);
        if (response) {
            setOpen(false);
            toast("Donor registered successfully", { type: "success" });
        } else {
            toast("Donor not registered", { type: "error" });
        }
    };
    return (
        <Dialog
            placeholder={""}
            open={open}
            handler={setOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            <DialogHeader placeholder={""}>Register New Donor</DialogHeader>
            <form onSubmit={handleSubmit}>
                <DialogBody placeholder={""}>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2">
                            <div className="w-[50%]">
                                <Input
                                    crossOrigin={"origin"}
                                    label="Full Name"
                                    placeholder="Full Name"
                                    value={userDetails.name}
                                    name="name"
                                    required
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="w-[50%]">
                                <Input
                                    crossOrigin={"origin"}
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={userDetails.email}
                                    required
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Input
                                crossOrigin={"origin"}
                                type="text"
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                name="phone"
                                value={userDetails.phone}
                                required
                                onChange={onChangeHandler}
                            />
                            <Select
                                label="Choose Blood Group"
                                placeholder="Blood Group"
                                value={userDetails.bloodGroup}
                                onChange={(group) =>
                                    setUserDetails({
                                        ...userDetails,
                                        bloodGroup: group ? group : "",
                                    })
                                }
                            >
                                {bloodGroups.map((group) => (
                                    <Option key={group} value={group}>
                                        {group}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter placeholder={""}>
                    <Button
                        placeholder={""}
                        variant="text"
                        color="red"
                        onClick={() => setOpen(false)}
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
                </DialogFooter>
            </form>
        </Dialog>
    );
}
