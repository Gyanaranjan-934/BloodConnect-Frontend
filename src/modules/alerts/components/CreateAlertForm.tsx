/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../../context/auth/AuthContext";
import { AlertContext } from "../../../context/AlertContext";
import {
    Avatar,
    Button,
    Checkbox,
    Typography,
} from "@material-tailwind/react";
import {
    AlertDetailsType,
    InitialAlertDetails,
    NearByUserType,
} from "../utils";
import AlertForm from "./AlertForm";

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
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(true);
    const [alertDetails, setAlertDetails] =
        useState<AlertDetailsType>(InitialAlertDetails);

    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<NearByUserType[]>([]);
    const [nearByUsers, setNearByUsers] = useState<NearByUserType[]>([]);

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
        setTimeout(() => {
            onClose(false);
        }, 100);
    };

    const submitAlertDetails = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAlertDetails({
            ...alertDetails,
            address: address,
            coordinates: {
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
            },
        });
        setNearByUsers(await createAlert(alertDetails));
        setShowUsers(true);
    };

    const submitSelectedDonors = async () => {
        console.log(selectedUsers);
        sendSelectedDonors(selectedUsers);
        setIsAlertPopupOpen(false);
        setTimeout(() => {
            onClose(false);
        }, 80);
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
                        <AlertForm
                            alertDetails={alertDetails}
                            setAlertDetails={setAlertDetails}
                            handleClose={handleClose}
                            onChangeHandler={onChangeHandler}
                            address={address}
                            setAddress={setAddress}
                            submitAlertDetails={submitAlertDetails}
                            setSelectedLocation={setSelectedLocation}
                            selectedLocation={selectedLocation}
                        />  
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
                                    {(nearByUsers as any)?.map((user:NearByUserType) => (
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
                                            placeholder={""}
                                            title="Create Alert"
                                            type="submit"
                                            color="green"
                                            onClick={submitSelectedDonors}
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
