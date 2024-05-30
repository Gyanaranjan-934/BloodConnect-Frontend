/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    Checkbox,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Option,
    Select,
    Step,
    Stepper,
    Typography,
} from "@material-tailwind/react";
import { IndividualDashboardType } from "../types";
import {
    faAddressCard,
    faCheckCircle,
    faPerson,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bloodGroups } from "../../alerts/utils";
import { statesOfIndia } from "../../auth/constants";
import React from "react";
import { validatePhoneNumber, validateAdhaarNo } from "../../auth/utils";
import { editProfile } from "../../auth/services";
import { AuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";

export default function UpdateIndividualPopup({
    open,
    setOpen,
    userDetails,
    setEditSuccess,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    userDetails: IndividualDashboardType;
    setEditSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const handleOpen = () => setOpen(!open);
    const [individualDetails, setIndividualDetails] =
        React.useState<IndividualDashboardType>(userDetails);
    const [phoneError, setPhoneError] = React.useState<boolean>(true);
    const [adhaarError, setAdhaarError] = React.useState<boolean>(true);
    const [isAddressSame, setSameAddress] = React.useState<boolean>(false);
    const { geoLocation } = React.useContext(AuthContext);
    const onChangeHandler = (event: any) => {
        const { name, value } = event.target;

        setIndividualDetails({ ...individualDetails, [name]: value });

        // Additional validation for phone and adhaar
        if (name === "phone") {
            setPhoneError(!validatePhoneNumber(value));
        }

        if (name === "adhaarNo") {
            setAdhaarError(!validateAdhaarNo(value));
        }
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(individualDetails);
        const response = await editProfile(
            individualDetails,
            "individual",
            geoLocation,
            isAddressSame
                ? individualDetails.presentAddress
                : individualDetails.permanentAddress
        );
        if (response) {
            setOpen(false);
            toast("Profile updated successfully", { type: "success" });
            setEditSuccess(true);
        } else {
            toast("Error updating profile", { type: "error" });
            setEditSuccess(false);
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
                className="w-full"
            >
                <DialogHeader placeholder={""}>Update Profile</DialogHeader>
                <form onSubmit={handleSubmit}>
                    <DialogBody placeholder={""}>
                        <div className="w-full flex flex-col gap-y-10 p-4">
                            {/* First Page includes Full Name, Email, Phone Number, Password, Confirm Password */}
                            {activeStep === 0 || isFirstStep && (
                                <div className="flex flex-col justify-center gap-4">
                                    <div className="flex gap-2">
                                        <Input
                                            crossOrigin={"origin"}
                                            label="Full Name"
                                            placeholder="Full Name"
                                            value={individualDetails.name}
                                            name="fullName"
                                            type="text"
                                            onChange={(e) =>
                                                setIndividualDetails({
                                                    ...individualDetails,
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                        <Input
                                            crossOrigin={"origin"}
                                            label="Email Address"
                                            name="email"
                                            value={individualDetails.email}
                                            disabled
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-full">
                                            <Input
                                                crossOrigin={"origin"}
                                                label="Phone Number"
                                                placeholder="Enter your phone number"
                                                name="phone"
                                                value={individualDetails.phone}
                                                onChange={onChangeHandler}
                                            />
                                            {!individualDetails.phone && (
                                                <Typography
                                                    placeholder={""}
                                                    variant="small"
                                                    className={`mt-2 flex items-center gap-1 font-normal ${
                                                        phoneError
                                                            ? "text-red-500"
                                                            : "text-green-500"
                                                    }`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            !phoneError
                                                                ? faCheckCircle
                                                                : faTimesCircle
                                                        }
                                                    />
                                                    {phoneError
                                                        ? "Invalid phone number"
                                                        : "Valid phone number"}
                                                </Typography>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <Input
                                                crossOrigin={"origin"}
                                                label="Adhaar No."
                                                placeholder="Adhaar No."
                                                name="adhaarNo"
                                                type="text"
                                                value={
                                                    individualDetails.adhaarNo
                                                }
                                                onChange={onChangeHandler}
                                            />
                                            {!individualDetails.adhaarNo && (
                                                <Typography
                                                    placeholder={""}
                                                    variant="small"
                                                    className={`mt-2 flex items-center gap-1 font-normal ${
                                                        adhaarError
                                                            ? "text-red-500"
                                                            : "text-green-500"
                                                    }`}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={
                                                            !adhaarError
                                                                ? faCheckCircle
                                                                : faTimesCircle
                                                        }
                                                    />
                                                    {adhaarError
                                                        ? "Invalid Adhaar No."
                                                        : "Valid Adhaar No."}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            crossOrigin={"origin"}
                                            label="Date of Birth"
                                            type="date"
                                            required
                                            placeholder="Enter your date of birth"
                                            value={
                                                individualDetails.dateOfBirth
                                            }
                                            onChange={(e) => {
                                                setIndividualDetails({
                                                    ...individualDetails,
                                                    dateOfBirth: e.target.value,
                                                });
                                            }}
                                        />
                                        <Select
                                            label="Choose Blood Group"
                                            placeholder="Blood Group"
                                            value={individualDetails.bloodGroup}
                                            onChange={(group) => {
                                                setIndividualDetails({
                                                    ...individualDetails,
                                                    bloodGroup: group
                                                        ? group
                                                        : "",
                                                });
                                            }}
                                        >
                                            {bloodGroups.map((group) => (
                                                <Option
                                                    key={group}
                                                    value={group}
                                                >
                                                    {group}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            )}
                            {/* Second Page includes Adhaar No., Date of Birth, Blood Group, Phone number*/}
                            {activeStep === 1 || isLastStep && (
                                <div className="flex flex-col justify-center gap-4 p-4">
                                    {/* Address */}
                                    <div className="">
                                        <Typography
                                            type="h2"
                                            className="font-semibold text-lg"
                                            placeholder={""}
                                        >
                                            Present Address
                                        </Typography>
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-2">
                                                <Input
                                                    crossOrigin={"origin"}
                                                    label="Street No."
                                                    placeholder="Street No."
                                                    value={
                                                        individualDetails
                                                            .presentAddress
                                                            .street
                                                    }
                                                    onChange={(event) => {
                                                        setIndividualDetails({
                                                            ...individualDetails,
                                                            presentAddress: {
                                                                ...individualDetails.presentAddress,
                                                                street: event
                                                                    .target
                                                                    .value,
                                                            },
                                                        });
                                                    }}
                                                />
                                                <Input
                                                    crossOrigin={"origin"}
                                                    label="City"
                                                    placeholder="City"
                                                    value={
                                                        individualDetails
                                                            .presentAddress.city
                                                    }
                                                    onChange={(event) => {
                                                        setIndividualDetails({
                                                            ...individualDetails,
                                                            presentAddress: {
                                                                ...individualDetails.presentAddress,
                                                                city: event
                                                                    .target
                                                                    .value,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <Select
                                                    label="Choose State"
                                                    placeholder="State"
                                                    value={
                                                        individualDetails
                                                            .presentAddress
                                                            .state
                                                    }
                                                    onChange={(group) => {
                                                        setIndividualDetails({
                                                            ...individualDetails,
                                                            presentAddress: {
                                                                ...individualDetails.presentAddress,
                                                                state: group
                                                                    ? group
                                                                    : "",
                                                            },
                                                        });
                                                    }}
                                                >
                                                    {statesOfIndia.map(
                                                        (group) => (
                                                            <Option
                                                                key={group}
                                                                value={group}
                                                            >
                                                                {group}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select>
                                                <Input
                                                    crossOrigin={"origin"}
                                                    label="PIN Code"
                                                    placeholder="PIN Code"
                                                    value={
                                                        individualDetails
                                                            .presentAddress
                                                            .pincode
                                                    }
                                                    onChange={(event) => {
                                                        setIndividualDetails({
                                                            ...individualDetails,
                                                            presentAddress: {
                                                                ...individualDetails.presentAddress,
                                                                pincode:
                                                                    event.target
                                                                        .value,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Typography
                                            type="h2"
                                            className="font-semibold text-lg"
                                            placeholder={""}
                                        >
                                            Permanent Address
                                        </Typography>
                                        <Checkbox
                                            className="text-sm font-thin"
                                            label="Is permanent address is same as present"
                                            readOnly
                                            checked={isAddressSame}
                                            crossOrigin={"origin"}
                                            onChange={() => {
                                                setSameAddress(!isAddressSame);
                                            }}
                                        />
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-2">
                                                <Input
                                                    crossOrigin={"origin"}
                                                    label="Street No."
                                                    placeholder="Street No."
                                                    value={
                                                        isAddressSame
                                                            ? individualDetails
                                                                  .presentAddress
                                                                  .street
                                                            : individualDetails
                                                                  .permanentAddress
                                                                  .street
                                                    }
                                                    disabled={isAddressSame}
                                                    onChange={(event) => {
                                                        setIndividualDetails({
                                                            ...individualDetails,
                                                            permanentAddress: {
                                                                ...individualDetails.permanentAddress,
                                                                street: event
                                                                    .target
                                                                    .value,
                                                            },
                                                        });
                                                    }}
                                                />
                                                <Input
                                                    crossOrigin={"origin"}
                                                    label="City"
                                                    placeholder="City"
                                                    value={
                                                        isAddressSame
                                                            ? individualDetails
                                                                  .presentAddress
                                                                  .city
                                                            : individualDetails
                                                                  .permanentAddress
                                                                  .city
                                                    }
                                                    disabled={isAddressSame}
                                                    onChange={(event) => {
                                                        setIndividualDetails({
                                                            ...individualDetails,
                                                            permanentAddress: {
                                                                ...individualDetails.permanentAddress,
                                                                city: event
                                                                    .target
                                                                    .value,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <Select
                                                    disabled={isAddressSame}
                                                    label="Choose State"
                                                    placeholder="State"
                                                    value={
                                                        isAddressSame
                                                            ? individualDetails
                                                                  .presentAddress
                                                                  .state
                                                            : individualDetails
                                                                  .permanentAddress
                                                                  .state
                                                    }
                                                    onChange={(group) => {
                                                        setIndividualDetails({
                                                            ...individualDetails,
                                                            permanentAddress: {
                                                                ...individualDetails.permanentAddress,
                                                                state: group
                                                                    ? group
                                                                    : "",
                                                            },
                                                        });
                                                    }}
                                                >
                                                    {statesOfIndia.map(
                                                        (group) => (
                                                            <Option
                                                                key={group}
                                                                value={group}
                                                            >
                                                                {group}
                                                            </Option>
                                                        )
                                                    )}
                                                </Select>
                                                <Input
                                                    crossOrigin={"origin"}
                                                    label="PIN Code"
                                                    placeholder="PIN Code"
                                                    value={
                                                        isAddressSame
                                                            ? individualDetails
                                                                  .presentAddress
                                                                  .pincode
                                                            : individualDetails
                                                                  .permanentAddress
                                                                  .pincode
                                                    }
                                                    disabled={isAddressSame}
                                                    onChange={(event) => {
                                                        setIndividualDetails({
                                                            ...individualDetails,
                                                            permanentAddress: {
                                                                ...individualDetails.permanentAddress,
                                                                pincode:
                                                                    event.target
                                                                        .value,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <Stepper
                                activeStep={activeStep}
                                isLastStep={(value) => setIsLastStep(value)}
                                isFirstStep={(value) => setIsFirstStep(value)}
                                placeholder={""}
                            >
                                <Step
                                    onClick={() => setActiveStep(0)}
                                    placeholder={""}
                                    className="cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faPerson} />
                                </Step>
                                <Step
                                    onClick={() => setActiveStep(1)}
                                    placeholder={""}
                                    className="cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faAddressCard} />
                                </Step>
                            </Stepper>
                        </div>
                    </DialogBody>
                    <DialogFooter placeholder={""}>
                        <Button
                            placeholder={""}
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                        >
                            Cancel
                        </Button>
                        <Button
                            placeholder={""}
                            variant="gradient"
                            color="green"
                            type="submit"
                        >
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}
