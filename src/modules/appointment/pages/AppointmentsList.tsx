/* eslint-disable react-hooks/exhaustive-deps */

import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardBody,
    Typography,
    Chip,
    Popover,
    PopoverHandler,
    IconButton,
    PopoverContent,
    Button,
    CardFooter,
} from "@material-tailwind/react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import ErrorPage from "../../../components/utils/ErrorPage";
import ProgressBar from "../../../components/utils/ProgressBar";
import { fetchAppointmentsBasedOnPage } from "../utils";
import moment from "moment";
import { respondAppointment } from "../services";
import { toast } from "react-toastify";

const TABLEHEAD = [
    "Name",
    "Email",
    "Phone",
    "Date of Appointment",
    "Time of Appointment",
    "Status",
    "Actions",
];

export default function AppointmentsList() {
    const [pageNo, setPageNo] = React.useState(0);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["appointments", pageNo],
        queryFn: () => fetchAppointmentsBasedOnPage(pageNo),
    });

    const queryClient = useQueryClient();

    const appointments = data ? data : null;

    const [editSuccess, setEditSuccess] = React.useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: () => fetchAppointmentsBasedOnPage(pageNo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
        onError: (error) => {
            console.log("Error fetching appointments:", error);
        },
    });

    const handleAcceptAppointment = async (
        appId: string,
        response: boolean
    ) => {
        const serverRes = await respondAppointment(appId, response);
        if (serverRes) {
            toast("Appointment accepted successfully", { type: "success" });
            setEditSuccess(true);
        } else {
            toast("Appointment not accepted", { type: "error" });
        }
    };

    const handlePrevClick = () => {
        setPageNo((pageNo) => (pageNo <= 0 ? pageNo : pageNo - 1));
    };

    const handleNextClick = () => {
        setPageNo((pageNo) =>
            appointments
                ? appointments.appointments.length < 5
                    ? pageNo
                    : pageNo + 1
                : pageNo
        );
    };

    React.useEffect(() => {
        if (!data) {
            refetch();
        } else {
            if (editSuccess || pageNo) {
                mutation.mutate();
                setEditSuccess(false);
            }
        }
    }, [data, editSuccess, refetch, pageNo]);

    if (isLoading) {
        return <ProgressBar />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    return (
        <>
            <Card
                placeholder={""}
                className="flex flex-col flex-grow-0 w-full p-2"
            >
                {appointments?.appointments && (
                    <CardBody placeholder={""} className=" overflow-x-auto">
                        <table className="w-full min-w-max table-auto text-left border border-gray-500">
                            <thead>
                                <tr>
                                    {TABLEHEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                                placeholder={""}
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="">
                                {appointments.appointments.map(
                                    (appointment, index) => {
                                        const isLast =
                                            index ===
                                            appointments.appointments.length -
                                                1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={appointment._id}>
                                                <td className={classes}>
                                                    <Typography
                                                        placeholder={""}
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {
                                                            appointment.userId
                                                                .name
                                                        }
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        placeholder={""}
                                                        variant="small"
                                                        color="blue-gray"
                                                        title={
                                                            appointment.userId
                                                                .email
                                                        }
                                                        className="font-normal line-clamp-1 text-ellipsis max-w-36"
                                                    >
                                                        {
                                                            appointment.userId
                                                                .email
                                                        }
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        placeholder={""}
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {
                                                            appointment.userId
                                                                .phone
                                                        }
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        placeholder={""}
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {moment(
                                                            appointment.appointmentDate
                                                        ).format("DD/MM/YYYY")}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        placeholder={""}
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {
                                                            appointment.appointmentTime
                                                        }
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Chip
                                                            size="sm"
                                                            variant="ghost"
                                                            value={
                                                                appointment.status ===
                                                                "pending"
                                                                    ? "Pending"
                                                                    : appointment.status ===
                                                                        "accepted"
                                                                      ? "Accepted"
                                                                      : "Rejected"
                                                            }
                                                            color={
                                                                appointment.status ===
                                                                "pending"
                                                                    ? "yellow"
                                                                    : appointment.status ===
                                                                        "accepted"
                                                                      ? "green"
                                                                      : "red"
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Popover placement="bottom-end">
                                                        <PopoverHandler>
                                                            <IconButton
                                                                variant="text"
                                                                placeholder={""}
                                                            >
                                                                <PencilIcon className="h-4 w-4" />
                                                            </IconButton>
                                                        </PopoverHandler>
                                                        <PopoverContent
                                                            placeholder={""}
                                                            className="w-40"
                                                        >
                                                            <div className="flex flex-col gap-2">
                                                                {appointment.status !==
                                                                    "accepted" && (
                                                                    <Button
                                                                        size="sm"
                                                                        placeholder={
                                                                            ""
                                                                        }
                                                                        color="green"
                                                                        variant="outlined"
                                                                        onClick={() => {
                                                                            handleAcceptAppointment(
                                                                                appointment._id,
                                                                                true
                                                                            );
                                                                            appointment.status =
                                                                                "accepted";
                                                                        }}
                                                                    >
                                                                        Accept
                                                                    </Button>
                                                                )}

                                                                {appointment.status !==
                                                                    "rejected" && (
                                                                    <Button
                                                                        placeholder={
                                                                            ""
                                                                        }
                                                                        size="sm"
                                                                        variant="outlined"
                                                                        color="red"
                                                                        onClick={() => {
                                                                            handleAcceptAppointment(
                                                                                appointment._id,
                                                                                false
                                                                            );
                                                                            appointment.status =
                                                                                "rejected";
                                                                        }}
                                                                    >
                                                                        Reject
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                )}
                <CardFooter
                    className="flex items-center w-full justify-between border shadow border-blue-gray-50 p-4"
                    placeholder={""}
                >
                    <Button
                        variant="outlined"
                        size="sm"
                        placeholder={""}
                        onClick={handlePrevClick}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {appointments &&
                            Array.from(
                                {
                                    length: Math.ceil(
                                        appointments.totalCount / 5
                                    ),
                                },
                                (_, i) => i + 1
                            ).map((page) => (
                                <IconButton
                                    key={page}
                                    variant={
                                        pageNo === page - 1
                                            ? "outlined"
                                            : "text"
                                    }
                                    size="sm"
                                    placeholder={""}
                                    onClick={() => {
                                        setPageNo(page - 1);
                                    }}
                                >
                                    {page}
                                </IconButton>
                            ))}
                    </div>
                    <Button
                        variant="outlined"
                        size="sm"
                        placeholder={""}
                        onClick={handleNextClick}
                    >
                        Next
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}
