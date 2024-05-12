/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getAttendedDonors, getEventDetails } from "../services";
import { AttendDonorsByDoctorType, EventDetailsDonorType, EventDetailsType } from "../types";
import {
    Avatar,
    Button,
    Card,
    Input,
    List,
    ListItem,
    ListItemPrefix,
    Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import DonorDetailsPopup from "./components/DonorDetailsPopup";
import moment from "moment";
import RegisterDonorPopup from "./components/RegisterDonorPopup";

function DonorEventDetailsPage() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsSearchFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { eventId } = useParams();

    const [isAlertPopupOpen, setIsAlertPopupOpen] = useState(false);
    const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
    const [donor, setDonor] = useState<EventDetailsDonorType | null>(null);
    const [donorSearchQuery, setDonorSearchQuery] = useState("");

    const { data: eventData } = useQuery({
        queryKey: ["eventDetails", eventId],
        queryFn: () => getEventDetails(eventId),
    });
    const eventDetails = eventData ? (eventData as EventDetailsType) : null;

    const [registeredDonorsList, setRegisteredDonorsList] = useState<
        EventDetailsDonorType[]
    >(eventDetails?.donorsRegisteredBySelf || []);

    const { data: attendedDonorsData } = useQuery({
        queryKey: ["attendedDonors", eventId],
        queryFn: () => getAttendedDonors(eventId),
    });

    const handleFocus = (e: any) => {
        if (e.target.name === "donorSearch") {
            setIsSearchFocused(true);
        } else {
            setIsSearchFocused(false);
        }
    };

    const donorsAttended = attendedDonorsData
        ? (attendedDonorsData as AttendDonorsByDoctorType[])
        : [];

    const handleSearch = async (e: any) => {
        setDonorSearchQuery(e.target.value);
        const name = e.target.value;
        const donors = eventDetails?.donorsRegisteredBySelf.filter((donor) => {
            console.log(donor);
            return (
                (donor.name.toLowerCase().includes(name.toLowerCase()) ||
                    donor.email.toLowerCase().includes(name.toLowerCase()) ||
                    donor.phone.toLowerCase().includes(name.toLowerCase()) ||
                    donor.adhaarNo
                        .toLowerCase()
                        .includes(name.toLowerCase())) &&
                !attendedDonorsData?.some(
                    (attendedDonor) => attendedDonor.donorId._id === donor._id
                )
            );
        });
        setRegisteredDonorsList(
            e.target.value.length > 0 ? (donors ? donors : []) : []
        );
    };

    if (!eventId) {
        return <Navigate to={"/events"} />;
    }

    return (
        <>
            {eventDetails && (
                // Main Container
                <div className="flex flex-col gap-4 m-2 rounded-md p-2">
                    {/* Header */}
                    <div className="flex gap-2 p-2 rounded shadow justify-around items-stretch">
                        <Card
                            placeholder={""}
                            className="w-full p-2 shadow-none border border-gray-200 text-center"
                        >
                            <div className="flex flex-col gap-1">
                                <Typography variant="h3" placeholder={""}>
                                    {eventDetails.eventName}
                                </Typography>
                                <Typography variant="h6" placeholder={""}>
                                    By: {eventDetails.organizationId.name}
                                </Typography>
                                <div className="flex flex-col gap-1 p-4">
                                    <div className="flex gap-2 items-center justify-between">
                                        <Typography placeholder={""}>
                                            Start Date:{" "}
                                            {moment(
                                                eventDetails.startDate
                                            ).format("DD/MM/YYYY")}
                                        </Typography>
                                        <Typography placeholder={""}>
                                            End Date:{" "}
                                            {moment(
                                                eventDetails.endDate
                                            ).format("DD/MM/YYYY")}
                                        </Typography>
                                    </div>
                                    <div className="flex gap-2 items-center justify-between">
                                        <Typography placeholder={""}>
                                            Start Time: {eventDetails.startTime}
                                        </Typography>
                                        <Typography placeholder={""}>
                                            End Time: {eventDetails.endTime}
                                        </Typography>
                                    </div>
                                </div>
                                <div
                                    title={eventDetails.address}
                                    className=" line-clamp-2 text-ellipsis overflow-hidden"
                                >
                                    {eventDetails.address}
                                </div>
                            </div>
                        </Card>
                        <div className="flex flex-col gap-2 w-3/4 justify-evenly">
                            <div className="relative w-full" ref={containerRef}>
                                <Input
                                    crossOrigin={"origin"}
                                    className="w-full"
                                    placeholder={"Search Donors"}
                                    type="text"
                                    name="donorSearch"
                                    title="Search Donors"
                                    label="Search Donors"
                                    onFocus={handleFocus}
                                    value={donorSearchQuery}
                                    onChange={handleSearch}
                                />
                                {isSearchFocused &&
                                    eventDetails.donorsRegisteredBySelf.length >
                                        0 &&
                                    registeredDonorsList.length > 0 && (
                                        <div className="absolute max-h-md mt-2 w-full overflow-y-auto top-full border border-gray-300 rounded-md p-2 bg-white">
                                            <List
                                                placeholder={""}
                                                className="w-full flex justify-center "
                                            >
                                                {registeredDonorsList.map(
                                                    (donor, ind) => (
                                                        <ListItem
                                                            placeholder={""}
                                                            key={ind}
                                                            onClick={() => {
                                                                setDonor(donor);
                                                                setIsAlertPopupOpen(
                                                                    true
                                                                );
                                                            }}
                                                        >
                                                            <ListItemPrefix
                                                                placeholder={""}
                                                            >
                                                                <Avatar
                                                                    placeholder={
                                                                        ""
                                                                    }
                                                                    variant="circular"
                                                                    alt="candice"
                                                                    src={
                                                                        donor.avatar
                                                                    }
                                                                />
                                                            </ListItemPrefix>
                                                            <div>
                                                                <Typography
                                                                    placeholder={
                                                                        ""
                                                                    }
                                                                    variant="h6"
                                                                    color="blue-gray"
                                                                >
                                                                    {donor.name}
                                                                </Typography>
                                                                <Typography
                                                                    placeholder={
                                                                        ""
                                                                    }
                                                                    variant="small"
                                                                    color="gray"
                                                                    className="font-normal"
                                                                >
                                                                    {
                                                                        donor.email
                                                                    }{" "}
                                                                    |{" "}
                                                                    {
                                                                        donor.phone
                                                                    }
                                                                </Typography>
                                                            </div>
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        </div>
                                    )}
                            </div>
                            <Button
                                placeholder={""}
                                color="blue"
                                onClick={() => setIsRegisterPopupOpen(true)}
                            >
                                Register New Donor
                            </Button>
                        </div>
                        <Card
                            placeholder={""}
                            className="w-full p-2 shadow-none border border-gray-200 text-center"
                        >
                            <div className="flex flex-col gap-1">
                                <Typography variant="h3" placeholder={""}>
                                    {eventDetails.organizationId.name}
                                </Typography>
                                <Typography variant="small" placeholder={""}>
                                    Organization Head:{" "}
                                    {
                                        eventDetails.organizationId
                                            .organizationHeadName
                                    }
                                </Typography>
                                <div className="flex flex-col gap-1 p-4">
                                    <Typography placeholder={""}>
                                        Email:{" "}
                                        <span className="text-red-500">
                                            {eventDetails.organizationId.email}
                                        </span>
                                    </Typography>
                                    <Typography placeholder={""}>
                                        Phone Number:{" "}
                                        <span className="text-red-500">
                                            {eventDetails.organizationId.phone}
                                        </span>
                                    </Typography>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="flex w-full h-full justify-between gap-2 rounded-md p-2 border border-gray-200 bg-gray-100">
                        <Card
                            placeholder={""}
                            className="h-full w-full shadow rounded"
                        >
                            <List placeholder={""}>
                                {eventDetails.donorsRegisteredByDoctor.map(
                                    (donor) => (
                                        <ListItem
                                            key={donor._id}
                                            className="flex items-center gap-2"
                                            placeholder={""}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <Typography
                                                    variant="h6"
                                                    placeholder={""}
                                                >
                                                    {donor.name}
                                                </Typography>
                                                <div className="flex gap-2">
                                                    <Typography
                                                        variant="small"
                                                        placeholder={""}
                                                    >
                                                        {donor.email}
                                                    </Typography>
                                                    |
                                                    <Typography
                                                        variant="small"
                                                        placeholder={""}
                                                    >
                                                        {donor.phone}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Card>
                        <Card
                            placeholder={""}
                            className="h-full w-full shadow rounded"
                        >
                            <List placeholder={""}>
                                {donorsAttended.map((donor) => (
                                    <ListItem
                                        key={donor.donorId._id}
                                        className="flex items-center gap-2"
                                        placeholder={""}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <Typography
                                                variant="h6"
                                                placeholder={""}
                                            >
                                                {donor.donorId.name}
                                            </Typography>
                                            <div className="flex gap-2">
                                                <Typography
                                                    variant="small"
                                                    placeholder={""}
                                                >
                                                    {donor.donorId.email}
                                                </Typography>
                                                |
                                                <Typography
                                                    variant="small"
                                                    placeholder={""}
                                                >
                                                    {donor.donorId.phone || "No Phone number"}
                                                </Typography>
                                            </div>
                                        </div>
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </div>
                </div>
            )}

            {isAlertPopupOpen && (
                <DonorDetailsPopup
                    open={isAlertPopupOpen}
                    setOpen={setIsAlertPopupOpen}
                    donor={donor}
                    eventId={eventDetails?._id || ""}
                />
            )}

            {isRegisterPopupOpen && (
                <RegisterDonorPopup
                    open={isRegisterPopupOpen}
                    setOpen={setIsRegisterPopupOpen}
                    eventId={eventId}
                />
            )}
        </>
    );
}

export default DonorEventDetailsPage;
