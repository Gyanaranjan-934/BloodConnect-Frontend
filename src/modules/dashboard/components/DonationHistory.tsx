import { Typography } from "@material-tailwind/react";
import moment from "moment";
import { IndividualDashboardType } from "../types";
const TABLE_HEAD = ["Date", "Units"];
export default function DonationHistory({
    individualDashboard,
}: {
    individualDashboard: IndividualDashboardType;
}) {
    return (
        <div className="h-[50%] p-2 mx-2 border border-gray-300 rounded">
            <Typography placeholder={""} className="text-center font-semibold">
                {"Donation History"}
            </Typography>
            <div className="w-full h-[calc(100%-30px)] overflow-auto">
                {individualDashboard.eventsAttended.length > 0 ? (
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
                            {individualDashboard.eventsAttended.length > 0 &&
                                individualDashboard.eventsAttended.map(
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
                                                        item.donationDate
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
                                                    {item.bloodUnits}
                                                </Typography>
                                            </td>
                                        </tr>
                                    )
                                )}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        No Donation Record Found
                    </div>
                )}
            </div>
        </div>
    );
}
