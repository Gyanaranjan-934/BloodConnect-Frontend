import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Typography,
    Chip,
    Popover,
    PopoverHandler,
    IconButton,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
import { DoctorType } from "../types";
const TABLEHEAD = ["Id", "Name", "Email", "Phone", "Verified", "Actions"];

export default function DoctorsTable({
    doctorDetails,
    handleVerify,
    handleDelete,
}: {
    doctorDetails: {
        doctors: DoctorType[];
        pageNo: number;
        totalCount: number;
    };
    handleVerify: (eventId: string) => void;
    handleDelete: (eventId: string) => void;
}) {
    return (
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
                {doctorDetails.doctors.map((doctor, index) => {
                    const isLast = index === doctorDetails.doctors.length - 1;
                    const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                    return (
                        <tr key={doctor._id}>
                            <td className={classes}>
                                <div className="flex items-center gap-3">
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                    >
                                        {doctor._id}
                                    </Typography>
                                </div>
                            </td>
                            <td className={classes}>
                                <Typography
                                    placeholder={""}
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {doctor.name}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    placeholder={""}
                                    variant="small"
                                    color="blue-gray"
                                    title={doctor.email}
                                    className="font-normal line-clamp-1 text-ellipsis max-w-36"
                                >
                                    {doctor.email}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    placeholder={""}
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                >
                                    {doctor.phone}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <div className="w-max">
                                    <Chip
                                        size="sm"
                                        variant="ghost"
                                        value={
                                            doctor.isVerified
                                                ? "Verified"
                                                : "Not Verified"
                                        }
                                        color={
                                            doctor.isVerified ? "green" : "red"
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
                                            {!doctor.isVerified && (
                                                <Button
                                                    size="sm"
                                                    placeholder={""}
                                                    variant="outlined"
                                                    onClick={() => {
                                                        handleVerify(
                                                            doctor._id
                                                        );
                                                        doctor.isVerified =
                                                            true;
                                                    }}
                                                >
                                                    Verify
                                                </Button>
                                            )}
                                            <Button
                                                placeholder={""}
                                                size="sm"
                                                variant="outlined"
                                                color="red"
                                                onClick={() => {
                                                    handleDelete(doctor._id);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
