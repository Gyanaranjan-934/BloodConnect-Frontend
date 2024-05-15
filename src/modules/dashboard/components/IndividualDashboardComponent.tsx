import { Typography } from "@material-tailwind/react";
import moment from "moment";
import { IndividualDashboardType } from "../types";
import React from "react";

export default function IndividualDashboardComponent({
    userDetails,
}: {
    userDetails: IndividualDashboardType;
}) {
    const [individualDashboard, setIndividualDashboard] =
        React.useState<IndividualDashboardType>(userDetails);

    React.useEffect(() => {
        setIndividualDashboard(userDetails);
    }, [userDetails]);
    return (
        <div className="flex mt-4 shadow-md p-5 flex-col bg-gray-300 rounded-md align-middle ">
            <div className="flex m-3 gap-2 shadow-sm hover:shadow-md items-center justify-evenly bg-gray-100 rounded">
                <div className=" flex gap-1 ">
                    <Typography
                        placeholder={""}
                        className="text-md m-2 font-semibold"
                    >
                        Email:
                    </Typography>

                    <Typography placeholder={""} className=" self-center">
                        {individualDashboard?.email || "No Email"}
                    </Typography>
                </div>
                <div className="flex gap-1 ">
                    <Typography
                        placeholder={""}
                        className="text-md m-2 font-semibold"
                    >
                        Phone No. :
                    </Typography>
                    <Typography placeholder={""} className=" self-center">
                        {individualDashboard?.phone || "No Phone"}
                    </Typography>
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
                    <Typography placeholder={""} className=" self-center">
                        {individualDashboard?.dateOfBirth
                            ? moment(individualDashboard?.dateOfBirth).format(
                                  "DD/MM/YYYY"
                              )
                            : "No DOB"}
                    </Typography>
                </div>
                <div className="flex gap-1 ">
                    <Typography
                        placeholder={""}
                        className="text-md m-2 font-semibold"
                    >
                        Addhaar No. :
                    </Typography>
                    <Typography placeholder={""} className=" self-center">
                        {individualDashboard?.adhaarNo || "No Adhaar"}
                    </Typography>
                </div>
                <div className="flex gap-1 ">
                    <Typography
                        placeholder={""}
                        className="text-md m-2 font-semibold"
                    >
                        Blood Group:
                    </Typography>
                    <Typography placeholder={""} className=" self-center">
                        {individualDashboard?.bloodGroup || "No Blood Group"}
                    </Typography>
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
                            <Typography
                                placeholder={""}
                                className=" self-center"
                            >
                                {individualDashboard?.presentAddress?.street ||
                                    "No Street"}
                            </Typography>
                        </div>
                        <div className="flex gap-1 border-b border-gray-300">
                            <Typography
                                placeholder={""}
                                className="text-md m-2 font-semibold"
                            >
                                City:
                            </Typography>
                            <Typography
                                placeholder={""}
                                className=" self-center"
                            >
                                {individualDashboard?.presentAddress?.city ||
                                    "No City"}
                            </Typography>
                        </div>
                        <div className="flex gap-1 border-b border-gray-300">
                            <Typography
                                placeholder={""}
                                className="text-md m-2 font-semibold"
                            >
                                State:
                            </Typography>
                            <Typography
                                placeholder={""}
                                className=" self-center"
                            >
                                {individualDashboard?.presentAddress?.state ||
                                    "No State"}
                            </Typography>
                        </div>
                        <div className="flex gap-1 border-b border-gray-300">
                            <Typography
                                placeholder={""}
                                className="text-md m-2 font-semibold"
                            >
                                PIN Code:
                            </Typography>
                            <Typography
                                placeholder={""}
                                className=" self-center"
                            >
                                {individualDashboard?.presentAddress?.pincode ||
                                    "No Pin Code"}
                            </Typography>
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
                            <Typography
                                placeholder={""}
                                className=" self-center"
                            >
                                {individualDashboard?.permanentAddress
                                    ?.street || "No Street"}
                            </Typography>
                        </div>
                        <div className="flex gap-1 border-b border-gray-300">
                            <Typography
                                placeholder={""}
                                className="text-md m-2 font-semibold"
                            >
                                City:
                            </Typography>
                            <Typography
                                placeholder={""}
                                className=" self-center"
                            >
                                {individualDashboard?.permanentAddress?.city ||
                                    "No City"}
                            </Typography>
                        </div>
                        <div className="flex gap-1 border-b border-gray-300">
                            <Typography
                                placeholder={""}
                                className="text-md m-2 font-semibold"
                            >
                                State:
                            </Typography>
                            <Typography
                                placeholder={""}
                                className=" self-center"
                            >
                                {individualDashboard?.permanentAddress?.state ||
                                    "No State"}
                            </Typography>
                        </div>
                        <div className="flex gap-1 border-b border-gray-300">
                            <Typography
                                placeholder={""}
                                className="text-md m-2 font-semibold"
                            >
                                PIN Code:
                            </Typography>
                            <Typography
                                placeholder={""}
                                className=" self-center"
                            >
                                {individualDashboard?.permanentAddress
                                    ?.pincode || "No Pin Code"}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
