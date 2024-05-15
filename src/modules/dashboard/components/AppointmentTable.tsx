import { Typography, Button, Chip } from "@material-tailwind/react";
import moment from "moment";
import React from "react";
import { IndividualDashboardType } from "../types";

const TABLE_HEAD_APPOINTMENTS = ["Date", "Time", "Status"];

export default function AppointmentTable({
    individualDashboard,
    setIsAppointmentPopupOpen,
}:{
    individualDashboard: IndividualDashboardType;
    setIsAppointmentPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className="h-[50%] p-2 mx-2 border border-gray-300 rounded flex flex-col gap-2">
            <div className="flex justify-evenly">
                <Typography
                    placeholder={""}
                    className="text-center font-semibold"
                >
                    {"Appointments"}
                </Typography>
                <Button
                    placeholder={""}
                    color="blue"
                    variant="outlined"
                    size="sm"
                    onClick={() => setIsAppointmentPopupOpen(true)}
                >
                    Book Appointment
                </Button>
            </div>
            <div className="w-full h-[calc(100%-30px)] overflow-auto">
                {individualDashboard.appointments.length > 0 ? (
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD_APPOINTMENTS.map((head) => (
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
                            {individualDashboard.appointments.length > 0 &&
                                individualDashboard.appointments.map(
                                    (item, ind) => (
                                        <tr
                                            key={ind}
                                            className="even:bg-blue-gray-50/50 overflow-y-auto"
                                        >
                                            <td className="p-4">
                                                <Typography
                                                    placeholder={""}
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {moment(
                                                        item.appointmentDate
                                                    ).format("DD/MM/YYYY")}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    placeholder={""}
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item.appointmentTime}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Chip
                                                    variant="ghost"
                                                    icon={
                                                        <span
                                                            className={`mx-auto mt-1 block h-2 w-2 rounded-full bg-${item.status === "accepted" ? "green" : item.status === "rejected" ? "red" : "yellow"}-900 content-['']`}
                                                        />
                                                    }
                                                    value={
                                                        item.status ===
                                                        "pending"
                                                            ? "Pending"
                                                            : item.status ===
                                                                "accepted"
                                                              ? "Accepted"
                                                              : "Rejected"
                                                    }
                                                    color={
                                                        item.status ===
                                                        "pending"
                                                            ? "yellow"
                                                            : item.status ===
                                                                "accepted"
                                                              ? "green"
                                                              : "red"
                                                    }
                                                    className="font-normal"
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <div>No Appointments Found</div>
                    </div>
                )}
            </div>
        </div>
    );
}
