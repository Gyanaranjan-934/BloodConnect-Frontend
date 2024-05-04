import React from "react";
import { DashboardContext } from "../DashboardContext";
import {
    Avatar,
    Button,
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
import moment from "moment";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../../context/auth/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import DashboardHeader from "./DashboardHeader";
import BloodReport from "./BloodReport";
import { IndividualDashboardType } from "../types";

const TABLE_HEAD = ["Date", "Units"];

const TABLE_ROWS = [
    {
        date: "23/04/18",
        units: "120",
    },
    {
        date: "23/04/18",
        units: "100",
    },
    {
        date: "19/09/17",
        units: "80",
    },
    {
        date: "24/12/08",
        units: "150",
    },
];

const IndividualDashboard = () => {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(false);
    const { getUserDashboard } = React.useContext(DashboardContext);
    const [editEnabled, enableEdit] = React.useState(false);
    const { setLoadingValue } = React.useContext(AuthContext);
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getUserDashboard,
    });
    const mutation = useMutation({
        mutationFn: getUserDashboard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        },
        onError: (error) => {
            toast(error?.message || "Error fetching dashboard", {
                type: "error",
            });
            console.log("Error fetching dashboard:", error);
        },
    });

    React.useEffect(() => {
        setLoadingValue(100);
        if (!data) {
            mutation.mutate();
        }
    }, []);

    const individualDashboard: IndividualDashboardType = data;
    const [userDetails, setUserDetails] =
        React.useState<IndividualDashboardType>(individualDashboard);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <DashboardHeader setIsAlertPopupOpen={setIsAlertPopupOpen} />
            <div className="m-4 p-4 ">
                <div className="flex rounded-md gap-1 justify-around">
                    <div className="p-4 flex bg-gray-200 rounded shadow flex-col w-[70%] ">
                        {/* Header Container */}
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-between align-middle p-5">
                                <div className=" self-center">
                                    <Avatar
                                        placeholder={"Profile"}
                                        variant="circular"
                                        size="lg"
                                        alt={
                                            individualDashboard?.name ||
                                            "No Name"
                                        }
                                        className="border border-gray-900 p-0.5"
                                        src={individualDashboard?.avatar}
                                    />
                                </div>
                                {/* Full Name */}
                                <div className=" self-center">
                                    <Typography
                                        placeholder={""}
                                        className="text-xl font-semibold"
                                    >
                                        {individualDashboard.name ||
                                            individualDashboard?.fullName ||
                                            "No Name"}
                                    </Typography>
                                </div>
                                <div className="self-center flex flex-col gap-2">
                                    {!editEnabled && (
                                        <Button
                                            placeholder={""}
                                            onClick={() => enableEdit(true)}
                                            variant="gradient"
                                            size="sm"
                                            color="blue"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                    )}
                                    {editEnabled && (
                                        <Button
                                            placeholder={""}
                                            onClick={() => {}}
                                            variant="gradient"
                                            color="lime"
                                            size="sm"
                                        >
                                            Save
                                        </Button>
                                    )}
                                    {editEnabled && (
                                        <Button
                                            placeholder={""}
                                            onClick={() => enableEdit(false)}
                                            variant="gradient"
                                            size="sm"
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {/* User Details Container */}
                            <div className="flex mt-4 shadow-md p-5 flex-col bg-gray-300 rounded-md align-middle ">
                                <div className="flex m-3 gap-2 shadow-sm hover:shadow-md items-center justify-evenly bg-gray-100 rounded">
                                    <div className=" flex gap-1 ">
                                        <Typography
                                            placeholder={""}
                                            className="text-md m-2 font-semibold"
                                        >
                                            Email:
                                        </Typography>
                                        {editEnabled ? (
                                            <Input
                                                crossOrigin={"origin"}
                                                className=" self-center"
                                                variant="standard"
                                                color="red"
                                                value={userDetails.email}
                                                onChange={onChangeHandler}
                                            />
                                        ) : (
                                            <Typography
                                                placeholder={""}
                                                className=" self-center"
                                            >
                                                {individualDashboard?.email ||
                                                    "No Email"}
                                            </Typography>
                                        )}
                                    </div>
                                    <div className="flex gap-1 ">
                                        <Typography
                                            placeholder={""}
                                            className="text-md m-2 font-semibold"
                                        >
                                            Phone No. :
                                        </Typography>
                                        {editEnabled ? (
                                            <Input
                                                crossOrigin={"origin"}
                                                className=" self-center"
                                                variant="standard"
                                                color="red"
                                                value={userDetails.phoneNo}
                                                onChange={onChangeHandler}
                                            />
                                        ) : (
                                            <Typography
                                                placeholder={""}
                                                className=" self-center"
                                            >
                                                {individualDashboard?.phoneNo ||
                                                    "No Phone"}
                                            </Typography>
                                        )}
                                    </div>
                                </div>
                                <div className="flex shadow-sm hover:shadow-md gap-2 m-3 items-center justify-evenly bg-gray-100 rounded">
                                    <div className="flex gap-1 ">
                                        <Typography
                                            placeholder={""}
                                            className="text-md m-2 font-semibold"
                                        >
                                            Date of Birth:
                                        </Typography>
                                        {editEnabled ? (
                                            <Input
                                                crossOrigin={"origin"}
                                                className=" self-center"
                                                variant="standard"
                                                color="red"
                                                type="date"
                                                onChange={onChangeHandler}
                                            />
                                        ) : (
                                            <Typography
                                                placeholder={""}
                                                className=" self-center"
                                            >
                                                {moment(
                                                    individualDashboard?.dateOfBirth
                                                ).format("DD/MM/YYYY") ||
                                                    "No DOB"}
                                            </Typography>
                                        )}
                                    </div>
                                    <div className="flex gap-1 ">
                                        <Typography
                                            placeholder={""}
                                            className="text-md m-2 font-semibold"
                                        >
                                            Addhaar No. :
                                        </Typography>
                                        {editEnabled ? (
                                            <Input
                                                crossOrigin={"origin"}
                                                className=" self-center"
                                                variant="standard"
                                                color="red"
                                                value={userDetails.adhaarNo}
                                                onChange={onChangeHandler}
                                            />
                                        ) : (
                                            <Typography
                                                placeholder={""}
                                                className=" self-center"
                                            >
                                                {individualDashboard?.adhaarNo ||
                                                    "No Adhaar"}
                                            </Typography>
                                        )}
                                    </div>
                                </div>
                                <div className="flex shadow-sm hover:shadow-md m-3 items-center justify-around bg-gray-100 rounded">
                                    <div className="py-2 flex flex-col w-full border-r border-gray-300 items-center gap-4">
                                        <Typography
                                            placeholder={""}
                                            className=" border-b-2 p-1 border-gray-400 font-semibold text-lg"
                                        >
                                            Present Address
                                        </Typography>
                                        <div className="flex w-full px-8 flex-col gap-1">
                                            <div className="flex justify-normal border-b border-gray-300">
                                                <Typography
                                                    placeholder={""}
                                                    className="text-md m-2 font-semibold"
                                                >
                                                    Street:
                                                </Typography>
                                                {editEnabled ? (
                                                    <Input
                                                        crossOrigin={"origin"}
                                                        className=" self-center"
                                                        variant="standard"
                                                        color="red"
                                                        type="text"
                                                        value={
                                                            userDetails
                                                                .presentAddress
                                                                .street
                                                        }
                                                        onChange={(e) => {
                                                            setUserDetails({
                                                                ...userDetails,
                                                                presentAddress:
                                                                    {
                                                                        ...userDetails.presentAddress,
                                                                        street: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        placeholder={""}
                                                        className=" self-center"
                                                    >
                                                        {individualDashboard
                                                            ?.presentAddress
                                                            ?.street ||
                                                            "No Street"}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div className="flex gap-1 border-b border-gray-300">
                                                <Typography
                                                    placeholder={""}
                                                    className="text-md m-2 font-semibold"
                                                >
                                                    City:
                                                </Typography>
                                                {editEnabled ? (
                                                    <Input
                                                        crossOrigin={"origin"}
                                                        className=" self-center"
                                                        variant="standard"
                                                        color="red"
                                                        type="text"
                                                        value={
                                                            userDetails
                                                                .presentAddress
                                                                .city
                                                        }
                                                        onChange={(e) => {
                                                            setUserDetails({
                                                                ...userDetails,
                                                                presentAddress:
                                                                    {
                                                                        ...userDetails.presentAddress,
                                                                        city: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        placeholder={""}
                                                        className=" self-center"
                                                    >
                                                        {individualDashboard
                                                            ?.presentAddress
                                                            ?.city || "No City"}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div className="flex gap-1 border-b border-gray-300">
                                                <Typography
                                                    placeholder={""}
                                                    className="text-md m-2 font-semibold"
                                                >
                                                    State:
                                                </Typography>
                                                {editEnabled ? (
                                                    <Input
                                                        crossOrigin={"origin"}
                                                        className=" self-center"
                                                        variant="standard"
                                                        color="red"
                                                        type="text"
                                                        value={
                                                            userDetails
                                                                .presentAddress
                                                                .state
                                                        }
                                                        onChange={(e) => {
                                                            setUserDetails({
                                                                ...userDetails,
                                                                presentAddress:
                                                                    {
                                                                        ...userDetails.presentAddress,
                                                                        state: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        placeholder={""}
                                                        className=" self-center"
                                                    >
                                                        {individualDashboard
                                                            ?.presentAddress
                                                            ?.state ||
                                                            "No State"}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div className="flex gap-1 border-b border-gray-300">
                                                <Typography
                                                    placeholder={""}
                                                    className="text-md m-2 font-semibold"
                                                >
                                                    PIN Code:
                                                </Typography>
                                                {editEnabled ? (
                                                    <Input
                                                        crossOrigin={"origin"}
                                                        className=" self-center"
                                                        variant="standard"
                                                        color="red"
                                                        type="text"
                                                        value={
                                                            userDetails
                                                                .presentAddress
                                                                .pincode
                                                        }
                                                        onChange={(e) => {
                                                            setUserDetails({
                                                                ...userDetails,
                                                                presentAddress:
                                                                    {
                                                                        ...userDetails.presentAddress,
                                                                        pincode:
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ) ||
                                                                            0,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        placeholder={""}
                                                        className=" self-center"
                                                    >
                                                        {individualDashboard
                                                            ?.presentAddress
                                                            ?.pincode ||
                                                            "No Pin Code"}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" py-2 flex flex-col w-full border-l border-gray-300 items-center gap-4">
                                        <Typography
                                            placeholder={""}
                                            className="border-b-2 p-1 border-gray-400 font-semibold text-lg"
                                        >
                                            Permanent Address
                                        </Typography>
                                        <div className="flex w-full px-8 flex-col gap-1">
                                            <div className="flex gap-1 border-b border-gray-300">
                                                <Typography
                                                    placeholder={""}
                                                    className="text-md m-2 font-semibold"
                                                >
                                                    Street:
                                                </Typography>
                                                {editEnabled ? (
                                                    <Input
                                                        crossOrigin={"origin"}
                                                        className=" self-center"
                                                        variant="standard"
                                                        color="red"
                                                        type="text"
                                                        value={
                                                            userDetails
                                                                .permanentAddress
                                                                .street
                                                        }
                                                        onChange={(e) => {
                                                            setUserDetails({
                                                                ...userDetails,
                                                                permanentAddress:
                                                                    {
                                                                        ...userDetails.permanentAddress,
                                                                        street: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        placeholder={""}
                                                        className=" self-center"
                                                    >
                                                        {individualDashboard
                                                            ?.permanentAddress
                                                            ?.street ||
                                                            "No Street"}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div className="flex gap-1 border-b border-gray-300">
                                                <Typography
                                                    placeholder={""}
                                                    className="text-md m-2 font-semibold"
                                                >
                                                    City:
                                                </Typography>
                                                {editEnabled ? (
                                                    <Input
                                                        crossOrigin={"origin"}
                                                        className=" self-center"
                                                        variant="standard"
                                                        color="red"
                                                        type="text"
                                                        value={
                                                            userDetails
                                                                .permanentAddress
                                                                .city
                                                        }
                                                        onChange={(e) => {
                                                            setUserDetails({
                                                                ...userDetails,
                                                                permanentAddress:
                                                                    {
                                                                        ...userDetails.permanentAddress,
                                                                        city: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        placeholder={""}
                                                        className=" self-center"
                                                    >
                                                        {individualDashboard
                                                            ?.permanentAddress
                                                            ?.city || "No City"}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div className="flex gap-1 border-b border-gray-300">
                                                <Typography
                                                    placeholder={""}
                                                    className="text-md m-2 font-semibold"
                                                >
                                                    State:
                                                </Typography>
                                                {editEnabled ? (
                                                    <Input
                                                        crossOrigin={"origin"}
                                                        className=" self-center"
                                                        variant="standard"
                                                        color="red"
                                                        type="text"
                                                        value={
                                                            userDetails
                                                                .permanentAddress
                                                                .state
                                                        }
                                                        onChange={(e) => {
                                                            setUserDetails({
                                                                ...userDetails,
                                                                permanentAddress:
                                                                    {
                                                                        ...userDetails.permanentAddress,
                                                                        state: e
                                                                            .target
                                                                            .value,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        placeholder={""}
                                                        className=" self-center"
                                                    >
                                                        {individualDashboard
                                                            ?.permanentAddress
                                                            ?.state ||
                                                            "No State"}
                                                    </Typography>
                                                )}
                                            </div>
                                            <div className="flex gap-1 border-b border-gray-300">
                                                <Typography
                                                    placeholder={""}
                                                    className="text-md m-2 font-semibold"
                                                >
                                                    PIN Code:
                                                </Typography>
                                                {editEnabled ? (
                                                    <Input
                                                        crossOrigin={"origin"}
                                                        className=" self-center"
                                                        variant="standard"
                                                        color="red"
                                                        type="text"
                                                        value={
                                                            userDetails
                                                                .permanentAddress
                                                                .pincode
                                                        }
                                                        onChange={(e) => {
                                                            setUserDetails({
                                                                ...userDetails,
                                                                permanentAddress:
                                                                    {
                                                                        ...userDetails.permanentAddress,
                                                                        pincode:
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ) ||
                                                                            0,
                                                                    },
                                                            });
                                                        }}
                                                    />
                                                ) : (
                                                    <Typography
                                                        placeholder={""}
                                                        className=" self-center"
                                                    >
                                                        {individualDashboard
                                                            ?.permanentAddress
                                                            ?.pincode ||
                                                            "No Pin Code"}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex px-2 mx-2  w-[30%] flex-col">
                        <div className="h-[50%] px-2 mx-2 border border-gray-300 rounded">
                            <Typography
                                placeholder={""}
                                className="text-center font-semibold"
                            >
                                {"Donation History"}
                            </Typography>
                            <Card
                                placeholder={""}
                                className="w-full overflow-auto"
                            >
                                <table className="w-full min-w-max table-auto text-left">
                                    <thead>
                                        <tr>
                                            {TABLE_HEAD.map((head) => (
                                                <th
                                                    key={head}
                                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                                >
                                                    <Typography
                                                        placeholder={""}
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal leading-none opacity-70"
                                                    >
                                                        {head}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TABLE_ROWS.map((item, ind) => (
                                            <tr
                                                key={ind}
                                                className="even:bg-blue-gray-50/50"
                                            >
                                                <td className="p-4">
                                                    <Typography
                                                        placeholder={""}
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item.date}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        placeholder={""}
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item.units}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                        <div className="h-[50%]">
                            <Typography
                                placeholder={""}
                                className="text-center font-semibold"
                            >
                                {"Appointments"}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {isAlertPopupOpen && <BloodReport onClose={setIsAlertPopupOpen} />}
        </>
    );
};

export default IndividualDashboard;
