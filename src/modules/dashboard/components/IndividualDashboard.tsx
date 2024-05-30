/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { faEdit, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BloodReport from "../../auth/components/BloodReport";
import { IndividualDashboardType } from "../types";
import { getUserDashboard, uploadIndividualAvatar } from "../services";
import ProgressBar from "../../../components/utils/ProgressBar";
import ErrorPage from "../../../components/utils/ErrorPage";
import { AuthContext } from "../../auth/AuthContext";
import UpdateIndividualPopup from "./UpdateIndividualPopup";
import { toast } from "react-toastify";
import IndividualDashboardComponent from "./IndividualDashboardComponent";
import SearchDonors from "../../appointment/components/SearchDonors";
import DonationHistory from "./DonationHistory";
import AppointmentTable from "./AppointmentTable";
import userIcon from "../../../assets/user.png";
import { ErrorBoundary } from "react-error-boundary";

const IndividualDashboard = () => {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(false);

    const [isUpdatePopupOpen, setIsUpdatePopupOpen] = React.useState(false);

    const [isAppointmentPopupOpen, setIsAppointmentPopupOpen] =
        React.useState(false);

    const [isHovered, setIsHovered] = React.useState(false);

    const [userAvatar, setUserAvatar] = React.useState<File | undefined>(
        undefined
    );

    const { loggedInUserType } = React.useContext(AuthContext);

    const accessToken = localStorage.getItem("accessToken");

    const [editSuccess, setEditSuccess] = React.useState<boolean>(false);

    const getUserDashboardFromServer = async () => {
        const response = await getUserDashboard(loggedInUserType);
        return response;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getUserDashboardFromServer,
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: getUserDashboardFromServer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
            setEditSuccess(false);
        },
        onError: (error) => {
            toast(error?.message || "Error updating dashboard", {
                type: "error",
            });
            console.log("Error updating dashboard:", error);
        },
    });

    const individualDashboard = data as IndividualDashboardType;

    const [userDetails, setUserDetails] =
        React.useState<IndividualDashboardType>(individualDashboard);

    React.useEffect(() => {
        setUserDetails(individualDashboard);
    }, [individualDashboard]);

    const uploadNewAvatar = async () => {
        setUserAvatar(undefined);
        setIsHovered(false);
        const response = await uploadIndividualAvatar(userAvatar, accessToken);
        if (response) {
            setEditSuccess(true);
        }
    };

    React.useEffect(() => {
        if (editSuccess) {
            mutation.mutate();
        }
    }, [editSuccess]);

    if (isLoading) {
        return <ProgressBar />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    return (
        <>
            <div className="m-4 p-4 ">
                <div className="flex rounded-md gap-1 justify-around">
                    <div className="p-4 flex bg-gray-200 rounded shadow flex-col w-[70%] ">
                        <div className="flex justify-between align-middle p-5">
                            <div className="relative">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer inline-block"
                                >
                                    <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300">
                                        <Avatar
                                            placeholder={"Profile"}
                                            src={individualDashboard?.avatar || userIcon}
                                            alt="Image"
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 flex items-center justify-center rounded-full">
                                        <svg
                                            className="w-10 h-10 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                                            />
                                        </svg>
                                    </div>
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        const target =
                                            e.target as HTMLInputElement;
                                        setIsHovered(true);
                                        setUserAvatar(target.files?.[0]);
                                    }}
                                />
                                {isHovered && (
                                    <div className="flex justify-center items-center">
                                        <Button
                                            variant="gradient"
                                            size="sm"
                                            color="blue"
                                            placeholder={""}
                                            onClick={uploadNewAvatar}
                                        >
                                            <FontAwesomeIcon icon={faUpload} />{" "}
                                            Upload
                                        </Button>
                                        <Button
                                            variant="gradient"
                                            size="sm"
                                            color="red"
                                            placeholder={""}
                                            onClick={() => {
                                                setUserAvatar(undefined);
                                                setIsHovered(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                            {/* Full Name */}
                            <div className=" self-center">
                                <Typography
                                    placeholder={""}
                                    className="text-xl font-semibold"
                                >
                                    {individualDashboard.name || "No Name"}
                                </Typography>
                            </div>
                            <div className="self-center flex flex-col gap-2">
                                <Button
                                    placeholder={""}
                                    onClick={() => setIsUpdatePopupOpen(true)}
                                    variant="gradient"
                                    size="sm"
                                    color="blue"
                                >
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                    Profile
                                </Button>
                                <Button
                                    placeholder={""}
                                    title="Create Event"
                                    color="blue-gray"
                                    size="sm"
                                    onClick={() => setIsAlertPopupOpen(true)}
                                >
                                    Blood Report
                                </Button>
                            </div>
                        </div>
                        {/* User Details Container */}
                        <IndividualDashboardComponent
                            userDetails={individualDashboard}
                        />
                    </div>
                    <div className="flex px-2 mx-2  w-[30%] flex-col gap-2">
                        <DonationHistory
                            individualDashboard={individualDashboard}
                        />
                        <AppointmentTable
                            individualDashboard={individualDashboard}
                            setIsAppointmentPopupOpen={
                                setIsAppointmentPopupOpen
                            }
                        />
                    </div>
                </div>
            </div>
            {isAlertPopupOpen && (
                <BloodReport
                    open={isAlertPopupOpen}
                    userId={individualDashboard._id}
                    setOpen={setIsAlertPopupOpen}
                />
            )}
            {isUpdatePopupOpen && (
                <UpdateIndividualPopup
                    open={isUpdatePopupOpen}
                    setOpen={setIsUpdatePopupOpen}
                    userDetails={userDetails}
                    setEditSuccess={setEditSuccess}
                />
            )}
            {isAppointmentPopupOpen && (
                <ErrorBoundary fallback={<div>Something went wrong</div>}>
                    <SearchDonors
                        onClose={setIsAppointmentPopupOpen}
                        editSuccess={editSuccess}
                        setEditSuccess={setEditSuccess}
                    />
                </ErrorBoundary>
            )}
        </>
    );
};

export default IndividualDashboard;
