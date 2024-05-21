/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Avatar,
    Button,
    Checkbox,
    Chip,
    Input,
    List,
    ListItem,
    ListItemPrefix,
    Option,
    Radio,
    Select,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import MapWithAutocomplete from "../../../components/utils/Map";
import { AuthContext } from "../../auth/AuthContext";
import { EventInputType } from "../utils";
import { DoctorDetailsType } from "../../auth/types";
import { getDoctors, createEvent } from "../services";

const EventForm = ({
    onClose,
    eventDetails,
    setEventDetails,
    isEdit,
}: {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    eventDetails: EventInputType;
    setEventDetails: React.Dispatch<React.SetStateAction<EventInputType>>;
    isEdit: boolean;
}) => {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedDoctors, setSelectedDoctors] = React.useState<
        DoctorDetailsType[]
    >([]);
    const [doctorsFullList, setDoctorsFullList] = React.useState<
        DoctorDetailsType[]
    >([]);
    const { geoLocation } = React.useContext(AuthContext);

    const [selectedLocation, setSelectedLocation] = React.useState<{
        latitude: number;
        longitude: number;
    }>(geoLocation);
    const [address, setAddress] = React.useState<string>("");
    const [doctorsList, setDoctorsList] = React.useState<DoctorDetailsType[]>(
        []
    );
    const [isSearchFocused, setIsSearchFocused] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isPaid, setIsPaid] = React.useState(false);
    const [isCashPayment, setIsCashPayment] = React.useState(false);
    const [eventStartDate, setEventStartDate] = React.useState<string>("");
    const [eventEndDate, setEventEndDate] = React.useState<string>("");
    const [doctorSearchQuery, setDoctorSearchQuery] = React.useState("");
    const handleClose = () => {
        setIsAlertPopupOpen(false);
        setTimeout(() => {
            onClose(false);
        }, 80);
    };
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
    React.useEffect(() => {
        const fetchDoctors = async () => {
            const doctors = await getDoctors();
            setDoctorsFullList(doctors);
        };
        fetchDoctors();
    }, []);

    const handleFocus = (e: any) => {
        if (e.target.name === "doctors") {
            setIsSearchFocused(true);
        } else {
            setIsSearchFocused(false);
        }
    };
    const handleChange = (e: any) => {
        setEventDetails({
            ...eventDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isEdit) {
            console.log(isEdit);
        } else {
            try {
                setIsLoading(true);
                const createdEvent = await createEvent(
                    eventDetails,
                    selectedLocation,
                    selectedDoctors,
                    address,
                    eventStartDate,
                    eventEndDate
                );
                console.log(createdEvent);
                if (createdEvent) {
                    console.log("Event created successfully");
                }
                handleClose();
            } catch (error) {
                console.log("Error creating event:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };
    return (
        <div
            className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-40 transition-opacity ease-in duration-500 ${isAlertPopupOpen ? "opacity-100" : "opacity-0"}`}
        >
            <div
                className={`bg-white rounded-lg shadow-md w-[75%] h-min max-h-[90%]  overflow-y-auto p-4 text-center z-50 transform transition-transform ease-in duration-500 ${isAlertPopupOpen ? "scale-100" : "scale-90"}`}
            >
                <div className="flex flex-col gap-6">
                    <div className="flex justify-center items-center">
                        <Typography
                            placeholder={""}
                            variant="h4"
                            color="blue-gray"
                            className="text-3xl"
                        >
                            Create Event
                        </Typography>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex relative flex-col gap-4">
                            <div className="flex gap-2">
                                <Input
                                    crossOrigin={"origin"}
                                    label="Event Name"
                                    placeholder="Enter Event Name"
                                    onFocus={handleFocus}
                                    name="eventName"
                                    value={eventDetails.eventName}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    crossOrigin={"origin"}
                                    label="Event Head Name"
                                    placeholder="Enter Event Head Name"
                                    onFocus={handleFocus}
                                    name="eventHeadName"
                                    onChange={handleChange}
                                    value={eventDetails.eventHeadName}
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    crossOrigin={"origin"}
                                    type="date"
                                    label="Start Date"
                                    placeholder="Enter Start Date"
                                    onFocus={handleFocus}
                                    name="startDate"
                                    value={eventStartDate}
                                    onChange={(e) => {
                                        setEventStartDate(e.target.value);
                                    }}
                                    required
                                />
                                <Input
                                    crossOrigin={"origin"}
                                    type="date"
                                    label="End Date"
                                    placeholder="Enter End Date"
                                    onFocus={handleFocus}
                                    name="endDate"
                                    value={eventEndDate}
                                    onChange={(e) => {
                                        setEventEndDate(e.target.value);
                                    }}
                                    required
                                />
                                <Input
                                    crossOrigin={"origin"}
                                    type="time"
                                    label="Start Time"
                                    placeholder="Enter Start Time"
                                    onFocus={handleFocus}
                                    name="startTime"
                                    value={eventDetails.startTime}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    crossOrigin={"origin"}
                                    type="time"
                                    label="End Time"
                                    placeholder="Enter End Time"
                                    onFocus={handleFocus}
                                    value={eventDetails.endTime}
                                    onChange={handleChange}
                                    name="endTime"
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="flex gap-2 border px-2 rounded-md border-gray-400 h-10">
                                    <Radio
                                        crossOrigin={"origin"}
                                        name="type"
                                        label="Unpaid"
                                        onFocus={handleFocus}
                                        onClick={() => {
                                            setIsPaid(false);
                                            setIsCashPayment(false);
                                            setEventDetails({
                                                ...eventDetails,
                                                isPaid: false,
                                                paymentType: undefined,
                                                paymentAmount: undefined,
                                            });
                                        }}
                                        defaultChecked
                                    />
                                    <Radio
                                        crossOrigin={"origin"}
                                        name="type"
                                        label="Paid"
                                        onClick={() => {
                                            setIsPaid(true);
                                            setEventDetails({
                                                ...eventDetails,
                                                isPaid: true,
                                            });
                                        }}
                                        onFocus={handleFocus}
                                    />
                                </div>
                                {isPaid && (
                                    <Select
                                        label="Choose Payment type"
                                        placeholder={""}
                                        onFocus={handleFocus}
                                        name="paymentType"
                                        onChange={(e) => {
                                            setIsCashPayment(e === "cash");
                                            setEventDetails({
                                                ...eventDetails,
                                                paymentType: e as
                                                    | "cash"
                                                    | "giftCard"
                                                    | "coupon",
                                            });
                                        }}
                                    >
                                        <Option value="cash">Cash</Option>
                                        <Option value="giftCard">
                                            Gift Cards
                                        </Option>
                                        <Option value="coupon">Coupons</Option>
                                    </Select>
                                )}
                                {isPaid && isCashPayment && (
                                    <Input
                                        crossOrigin={"origin"}
                                        type="number"
                                        label="Amount"
                                        min={1}
                                        placeholder="Enter Amount"
                                        onFocus={handleFocus}
                                        value={eventDetails?.paymentAmount || 0}
                                        onChange={handleChange}
                                        required={isPaid && isCashPayment}
                                        name="paymentAmount"
                                    />
                                )}
                                <Input
                                    crossOrigin={"origin"}
                                    type="number"
                                    min={100}
                                    max={10000}
                                    label="Total Blood units"
                                    onFocus={handleFocus}
                                    placeholder="Enter target blood units"
                                    name="targetTotalBlood"
                                    value={eventDetails.targetTotalBlood}
                                    onChange={handleChange}
                                    required
                                />
                                <Input
                                    crossOrigin={"origin"}
                                    type="number"
                                    min={50}
                                    max={500}
                                    label="Max No. of Donors"
                                    onFocus={handleFocus}
                                    placeholder="Enter maximum no. of donors"
                                    name="maxDonorCapacity"
                                    value={eventDetails.maxDonorCapacity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <div className="w-[50%] flex gap-2">
                                    <Input
                                        crossOrigin={"origin"}
                                        label="Available Staffs"
                                        type="number"
                                        min={5}
                                        onFocus={handleFocus}
                                        placeholder="Enter available staffs"
                                        name="availableStaffCount"
                                        value={eventDetails.availableStaffCount}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Input
                                        crossOrigin={"origin"}
                                        type="number"
                                        min={5}
                                        max={100}
                                        label="Number of Beds"
                                        onFocus={handleFocus}
                                        placeholder="Enter number of beds"
                                        name="availableBedCount"
                                        value={eventDetails.availableBedCount}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div
                                    ref={containerRef}
                                    className="flex w-[60%] flex-col gap-2 relative"
                                >
                                    {isSearchFocused &&
                                        selectedDoctors.length > 0 && (
                                            <div className="absolute bottom-full mb-1 flex flex-wrap w-full border border-gray-300 rounded-md p-2 bg-white">
                                                {selectedDoctors.map(
                                                    (doctor) => (
                                                        <Chip
                                                            className="m-1"
                                                            value={doctor.name}
                                                            onClose={() => {
                                                                setSelectedDoctors(
                                                                    (
                                                                        doctors
                                                                    ) => {
                                                                        return doctors.filter(
                                                                            (
                                                                                doc
                                                                            ) =>
                                                                                doc !==
                                                                                doctor
                                                                        );
                                                                    }
                                                                );
                                                                setIsSearchFocused(
                                                                    true
                                                                );
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        )}
                                    <div className="relative">
                                        <Input
                                            crossOrigin={"origin"}
                                            label="Add names of doctors"
                                            placeholder="Add names of doctors"
                                            name="doctors"
                                            onFocus={handleFocus}
                                            value={doctorSearchQuery}
                                            onChange={(e) => {
                                                setDoctorSearchQuery(
                                                    e.target.value
                                                );
                                                // searchDoctors(e.target.value);
                                                // search doctors and show in the dropdown
                                                const name = e.target.value;
                                                const doctors =
                                                    doctorsFullList.filter(
                                                        (doctor) =>
                                                            doctor.name
                                                                .toLowerCase()
                                                                .includes(
                                                                    name.toLowerCase()
                                                                ) ||
                                                            doctor.email
                                                                .toLowerCase()
                                                                .includes(
                                                                    name.toLowerCase()
                                                                ) ||
                                                            doctor.phone
                                                                .toLowerCase()
                                                                .includes(
                                                                    name.toLowerCase()
                                                                ) ||
                                                            doctor.doctorId
                                                                .toLowerCase()
                                                                .includes(
                                                                    name.toLowerCase()
                                                                )
                                                    );
                                                setDoctorsList(
                                                    e.target.value.length > 0
                                                        ? doctors
                                                        : []
                                                );
                                            }}
                                        />
                                        {isSearchFocused &&
                                            doctorsList.length > 0 && (
                                                <div className="absolute max-h-md mt-2 w-full overflow-y-auto top-full border border-gray-300 rounded-md p-2 bg-white">
                                                    <List
                                                        placeholder={""}
                                                        className="w-full flex justify-center "
                                                    >
                                                        {doctorsList
                                                            .filter(
                                                                (doctor) => {
                                                                    return !selectedDoctors.includes(
                                                                        doctor
                                                                    );
                                                                }
                                                            )
                                                            .map(
                                                                (
                                                                    doctor,
                                                                    ind
                                                                ) => (
                                                                    <ListItem
                                                                        placeholder={
                                                                            ""
                                                                        }
                                                                        key={
                                                                            ind
                                                                        }
                                                                        onClick={() => {
                                                                            setSelectedDoctors(
                                                                                (
                                                                                    doctors
                                                                                ) => {
                                                                                    return Array.from(
                                                                                        new Set(
                                                                                            doctors
                                                                                        ).add(
                                                                                            doctor
                                                                                        )
                                                                                    );
                                                                                }
                                                                            );
                                                                            setIsSearchFocused(
                                                                                true
                                                                            );
                                                                        }}
                                                                    >
                                                                        <ListItemPrefix
                                                                            placeholder={
                                                                                ""
                                                                            }
                                                                        >
                                                                            <Avatar
                                                                                placeholder={
                                                                                    ""
                                                                                }
                                                                                variant="circular"
                                                                                alt="candice"
                                                                                src={
                                                                                    doctor.avatar
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
                                                                                {
                                                                                    doctor.name
                                                                                }
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
                                                                                    doctor.email
                                                                                }{" "}
                                                                                |{" "}
                                                                                {
                                                                                    doctor.phone
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
                                </div>
                            </div>
                            <MapWithAutocomplete
                                setSelectedLocation={setSelectedLocation}
                                setAddress={setAddress}
                                address={address}
                            />
                            <Checkbox
                                crossOrigin={"origin"}
                                defaultChecked
                                label={
                                    <span>
                                        I agree to the{" "}
                                        <Link
                                            to="/terms-and-conditions"
                                            className="text-blue-500 hover:underline"
                                        >
                                            terms and conditions
                                        </Link>
                                    </span>
                                }
                            />
                            <div className="mt-6 flex justify-evenly">
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    color="green"
                                    placeholder={""}
                                    type="submit"
                                    loading={isLoading}
                                >
                                    {isEdit
                                        ? isLoading
                                            ? "Updating Event..."
                                            : "Update Event"
                                        : isLoading
                                          ? "Creating Event..."
                                          : "Create Event"}
                                </Button>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    color="red"
                                    placeholder={""}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EventForm;
