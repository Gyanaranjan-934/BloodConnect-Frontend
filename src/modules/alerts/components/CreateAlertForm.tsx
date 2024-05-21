import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import {
    AlertDetailsType,
    InitialAlertDetails,
    LocationType,
    NearbyDonorType,
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
    const { geoLocation, loggedInUserType } = useContext(AuthContext);
    const [selectedLocation, setSelectedLocation] =
        useState<LocationType>(geoLocation);
    const [address, setAddress] = useState<string>("");
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [alertDetails, setAlertDetails] =
        useState<AlertDetailsType>(InitialAlertDetails);
    const [localAccessToken, setAccessToken] = React.useState<string>("");

    const accessToken = localStorage.getItem("accessToken");
    React.useEffect(() => {
        if (accessToken) {
            setAccessToken(accessToken);
        }
    }, [accessToken]);

    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [selectedUsers, setSelectedUsers] = useState<NearbyDonorType[]>([]);
    const [nearByUsers, setNearByUsers] = useState<NearbyDonorType[]>([]);

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
        try {
            setIsLoading(true);
            event.preventDefault();
            setAlertDetails({
                ...alertDetails,
                address: address,
                coordinates: {
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                },
            });
            setNearByUsers(
                await createAlert(
                    alertDetails,
                    selectedLocation,
                    address,
                    localAccessToken,
                    loggedInUserType as "individual" | "organization"
                )
            );
            setShowUsers(true);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    const submitSelectedDonors = async (): Promise<void> => {
        try {
            setIsLoading(true);
            sendSelectedDonors(selectedUsers);
            handleClose();
            toast("Alert sent successfully", { type: "success" });
        } catch (error) {
            console.log(error);
            toast("Error in sending alert", { type: "error" });
        } finally {
            setIsLoading(false);
        }
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
                            isLoading={isLoading}
                        />
                    )}
                    {showUsers && (
                        <UsersListView
                            nearByUsers={nearByUsers}
                            selectedUsers={selectedUsers}
                            setSelectedUsers={setSelectedUsers}
                            submitSelectedDonors={submitSelectedDonors}
                            handleClose={handleClose}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default CreateAlertForm;
