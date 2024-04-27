/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import MapWithAutocomplete from "../../../components/utils/Map";
import { AlertContext } from "../../../context/AlertContext";
import {
    Avatar,
    Button,
    Checkbox,
    Input,
    Option,
    Select,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import { AlertDetails, InitialAlertDetails } from "../Utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Others"];

const CreateAlertForm = ({
    onClose,
}: {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { geoLocation } = useContext(AuthContext);
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    }>(geoLocation);
    const [address, setAddress] = useState<string>("");
    const [patientPhoto, setPatientPhoto] = useState<any>(null);
    useState<boolean>(false);
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(true);
    const [alertDetails, setAlertDetails] =
        useState<AlertDetails>(InitialAlertDetails);

    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<any>([]);

    const { createAlert, sendSelectedDonors } = React.useContext(AlertContext);

    const onChangeHandler = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setAlertDetails({
            ...alertDetails,
            [name]: value,
        });
    };

    const handleClose = () => {
        setIsAlertPopupOpen(false);

        // Delay the closing of the popup to allow the animation to complete
        setTimeout(() => {
            onClose(false);
        }, 100); // Adjust the delay time to match your transition duration
    };
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: () => createAlert(alertDetails, patientPhoto),
        onSuccess: (data) => {
            queryClient.setQueryData(["nearbyUsers"], data);
            queryClient.invalidateQueries({ queryKey: ["nearbyUsers"] });
        },
        onError: (error) => {
            toast(error?.message || "Error fetching dashboard", {
                type: "error",
            });
            console.log("Error fetching dashboard:", error);
        },
    });
    const { data: nearByUsers } = useQuery({ queryKey: ["nearbyUsers"] });
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAlertDetails({
            ...alertDetails,
            address: address,
            coordinates: {
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
            },
        });
        mutation.mutateAsync();
        setShowUsers(true);
        console.log(nearByUsers);
    };

    const handleClick = async () => {
        console.log(selectedUsers);
        sendSelectedDonors(selectedUsers);
    };

    return (
        <>
            <div
                className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isAlertPopupOpen ? "opacity-100" : "opacity-0"}`}
            >
                {/* Create a centered square popup */}
                <div
                    className={`bg-white rounded-lg shadow-md w-[90%] h-min max-h-[90%]  overflow-y-auto p-4 text-center z-10 transform transition-transform ease-in duration-500 ${isAlertPopupOpen ? "scale-100" : "scale-90"}`}
                >
                    {!showUsers && (
                        <div>
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={handleSubmit}
                            >
                                <div className="flex flex-col gap-4">
                                    <Typography
                                        placeholder={"Create Alert"}
                                        className="text-lg font-bold"
                                    >
                                        Create Emergency Alert
                                    </Typography>

                                    <div className="flex gap-2 mt-2">
                                        <Input
                                            label="Patient Name"
                                            crossOrigin={"origin"}
                                            name="patientName"
                                            value={alertDetails.patientName}
                                            onChange={onChangeHandler}
                                            type="text"
                                            placeholder="Enter Patient Name"
                                        />
                                        <Input
                                            label="Patient Age"
                                            crossOrigin={"origin"}
                                            name="patientAge"
                                            value={alertDetails.patientAge}
                                            onChange={onChangeHandler}
                                            type="text"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                                            placeholder="Enter Patient Age"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-4 mt-2">
                                        <Textarea
                                            label="Problem Description"
                                            value={
                                                alertDetails.problemDescription
                                            }
                                            name="problemDescription"
                                            onChange={onChangeHandler}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                                        />
                                    </div>
                                    <div className="flex justify-around mt-2">
                                        <div className="w-[25%]">
                                            <Input
                                                label="Patient Photo"
                                                crossOrigin={"origin"}
                                                name="patientPhoto"
                                                type="file"
                                                onChange={(e) =>
                                                    setPatientPhoto(
                                                        e.target.files?.[0]
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="w-[25%]">
                                            <Select
                                                label="Choose Gender"
                                                placeholder="Gender"
                                                name="gender"
                                                value={alertDetails.gender}
                                                onChange={(e: any) => {
                                                    onChangeHandler(e);
                                                }}
                                            >
                                                {genders.map((group) => (
                                                    <Option
                                                        key={group}
                                                        value={group}
                                                        onClick={(e) => {
                                                            setAlertDetails({
                                                                ...alertDetails,
                                                                gender: group,
                                                            });
                                                        }}
                                                    >
                                                        {group}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                        <div className="w-[25%]">
                                            <Input
                                                label="No. of Donors to Send"
                                                crossOrigin={"origin"}
                                                name="noOfDonorsToSend"
                                                value={
                                                    alertDetails.noOfDonorsToSend
                                                }
                                                onChange={onChangeHandler}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                                                type="number"
                                            />
                                        </div>
                                        <div className="w-[25%]">
                                            <Select
                                                label="Choose Blood Group"
                                                placeholder="Blood Group"
                                                value={alertDetails.bloodGroup}
                                                name="bloodGroup"
                                                onChange={(e: any) => {
                                                    onChangeHandler(e);
                                                }}
                                            >
                                                {bloodGroups.map((group) => (
                                                    <Option
                                                        key={group}
                                                        value={group}
                                                        onClick={(e) => {
                                                            setAlertDetails({
                                                                ...alertDetails,
                                                                bloodGroup:
                                                                    group,
                                                            });
                                                        }}
                                                    >
                                                        {group}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex justify-around gap-2 mt-2">
                                        <Input
                                            label="Date of Requirement"
                                            crossOrigin={"origin"}
                                            name="dateOfRequirement"
                                            value={
                                                alertDetails.dateOfRequirement
                                            }
                                            onChange={onChangeHandler}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                                            type="date"
                                            placeholder="Enter Alert Date"
                                        />
                                        <Input
                                            label="Time of Requirement"
                                            crossOrigin={"origin"}
                                            name="timeOfRequirement"
                                            value={
                                                alertDetails.timeOfRequirement
                                            }
                                            onChange={onChangeHandler}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                                            type="time"
                                            placeholder="Enter Alert Time"
                                        />
                                    </div>
                                    <MapWithAutocomplete
                                        setSelectedLocation={
                                            setSelectedLocation
                                        }
                                        setAddress={setAddress}
                                        address={address}
                                    />
                                </div>
                                <div className=" flex gap-2 justify-evenly">
                                    <Button
                                        placeholder={""}
                                        title="Create Alert"
                                        type="submit"
                                        color="green"
                                    >
                                        Create Alert
                                    </Button>
                                    <Button
                                        placeholder={""}
                                        title="Cancel"
                                        color="blue-gray"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                    {showUsers && (
                        <div>
                            <div className="flex flex-col gap-4 mt-2">
                                <Typography
                                    placeholder={"Create Alert"}
                                    className="text-lg font-bold"
                                >
                                    Nearby Users
                                </Typography>
                                <div className="flex flex-col gap-4 mt-2">
                                    <Checkbox
                                        ripple={false}
                                        onClick={() => {
                                            if (selectedUsers.length === 0) {
                                                setSelectedUsers(nearByUsers);
                                            } else {
                                                setSelectedUsers([]);
                                            }
                                        }}
                                        placeholder={""}
                                        crossOrigin={"origin"}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 mt-2">
                                    {(nearByUsers as any)?.map((user) => (
                                        <div className="flex gap-2 mt-2">
                                            <Checkbox
                                                checked={selectedUsers.includes(
                                                    user
                                                )}
                                                ripple={false}
                                                onClick={() => {
                                                    if (
                                                        selectedUsers.includes(
                                                            user
                                                        )
                                                    ) {
                                                        setSelectedUsers(
                                                            selectedUsers.filter(
                                                                (user) =>
                                                                    user !==
                                                                    user
                                                            )
                                                        );
                                                    } else {
                                                        setSelectedUsers([
                                                            ...selectedUsers,
                                                            user,
                                                        ]);
                                                    }
                                                }}
                                                placeholder={""}
                                                crossOrigin={"origin"}
                                            />
                                            <Avatar
                                                placeholder={"Avatar"}
                                                src={user.avatar}
                                                alt={user.fullName}
                                                className="w-[50px] h-[50px]"
                                            />
                                            <div className="flex flex-col gap-2">
                                                <Typography
                                                    placeholder={"Name"}
                                                    className="text-sm font-normal"
                                                >
                                                    {user.fullName}
                                                </Typography>
                                                <Typography
                                                    placeholder={"Email"}
                                                    className="text-sm font-normal"
                                                >
                                                    {user.email}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                    <div className=" flex gap-2 justify-evenly">
                                        <Button
                                            title="Create Alert"
                                            type="submit"
                                            color="green"
                                            onClick={handleClick}
                                        >
                                            Create Alert
                                        </Button>
                                        <Button
                                            title="Cancel"
                                            color="blue-gray"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateAlertForm;
