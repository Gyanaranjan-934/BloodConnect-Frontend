import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import {
    AlertDetailsType,
    InitialAlertDetails,
    LocationType,
    NearByUserType,
} from "../utils";
import AlertForm from "./AlertForm";
import UsersListView from "./UsersListView";
import { toast } from "react-toastify";
import { createAlert, sendSelectedDonors } from "../services";

const CreateAlertForm = ({
    onClose,
}: {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const { geoLocation } = useContext(AuthContext);
    const [selectedLocation, setSelectedLocation] =
        useState<LocationType>(geoLocation);
    const [address, setAddress] = useState<string>("");
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(true);
    const [alertDetails, setAlertDetails] =
        useState<AlertDetailsType>(InitialAlertDetails);

    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<NearByUserType[]>([]);
    const [nearByUsers, setNearByUsers] = useState<NearByUserType[]>([]);

    const onChangeHandler = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ): void => {
        const { name, value } = e.target;
        setAlertDetails({
            ...alertDetails,
            [name]: value,
        });
    };

    const handleClose = (): void => {
        setIsAlertPopupOpen(false);
        setTimeout(() => {
            onClose(false);
        }, 100);
    };

    const submitAlertDetails = async (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        console.log(selectedLocation);
        console.log(address);

        setAlertDetails({
            ...alertDetails,
            address: address,
            coordinates: {
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
            },
        });
        setNearByUsers(
            await createAlert(alertDetails, selectedLocation, address)
        );
        setShowUsers(true);
    };

    const submitSelectedDonors = async (): Promise<void> => {
        console.log(selectedUsers);
        sendSelectedDonors(selectedUsers);
        handleClose();
        toast("Alert sent successfully", { type: "success" });
    };

    return (
        <>
            <div
                className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isAlertPopupOpen ? "opacity-100" : "opacity-0"}`}
            >
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
                        />
                    )}
                    {showUsers && (
                        <UsersListView
                            nearByUsers={nearByUsers}
                            selectedUsers={selectedUsers}
                            setSelectedUsers={setSelectedUsers}
                            submitSelectedDonors={submitSelectedDonors}
                            handleClose={handleClose}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateAlertForm;
