import { Typography } from "@material-tailwind/react";
import { OrganizationDashboardType } from "../types";

export default function OrganizationDetailsCard({
    userDetails,
}: {
    userDetails: OrganizationDashboardType;
}) {
    return (
        <div className="mx-auto p-4">
            <Typography className="m-2" placeholder={""} variant="h4">
                My Profile
            </Typography>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="w-full shadow-lg flex flex-col items-start p-4 aspect-w-1 aspect-h-1 rounded-xl ">
                    <Typography placeholder={""} variant="h5">
                        Name of Organization
                    </Typography>
                    <Typography
                        placeholder={""}
                        variant="paragraph"
                        className="text-center text-gray-700"
                    >
                        {userDetails.name}
                    </Typography>
                </div>
                <div className="w-full shadow-lg aspect-w-1 flex flex-col p-4 items-start aspect-h-1 rounded-xl ">
                    <Typography placeholder={""} variant="h5">
                        Type of Organization
                    </Typography>
                    <Typography
                        placeholder={""}
                        variant="paragraph"
                        className="text-center text-gray-700"
                    >
                        {userDetails.typeOfOrganization}
                    </Typography>
                </div>
                <div className="w-full shadow-lg aspect-w-1 flex flex-col p-4 items-start aspect-h-1 rounded-xl ">
                    <Typography placeholder={""} variant="h5">
                        Registration No.
                    </Typography>
                    <Typography
                        placeholder={""}
                        variant="paragraph"
                        className="text-center text-gray-700"
                    >
                        {userDetails.cinNo}
                    </Typography>
                </div>
                <div className="w-full shadow-lg aspect-w-1 flex flex-col items-start p-4 aspect-h-1 rounded-xl ">
                    <Typography placeholder={""} variant="h5">
                        Contact Information
                    </Typography>
                    <Typography
                        placeholder={""}
                        variant="paragraph"
                        className="text-center text-gray-700"
                    >
                        {"Phone Number: "}
                        {userDetails.phone}
                    </Typography>
                    <Typography
                        placeholder={""}
                        variant="paragraph"
                        className="text-center text-gray-700"
                    >
                        {"Email: "}
                        {userDetails.email}
                    </Typography>
                </div>
                <div className="w-full shadow-lg aspect-w-1 flex flex-col items-start p-4 aspect-h-1 rounded-xl ">
                    <Typography placeholder={""} variant="h5">
                        Address
                    </Typography>
                    <Typography
                        placeholder={""}
                        variant="paragraph"
                        className="text-center text-gray-700"
                    >
                        {`${userDetails.address.street}, ${userDetails.address.city}, ${userDetails.address.state}, ${userDetails.address.pincode}`}
                    </Typography>
                </div>
                <div className="w-full shadow-lg aspect-w-1 flex flex-col items-start p-4 aspect-h-1 rounded-xl ">
                    <Typography placeholder={""} variant="h5">
                        Verified Status
                    </Typography>
                    <Typography
                        placeholder={""}
                        variant="paragraph"
                        className={`text-center ${userDetails.isVerified ? "text-green-400" : "text-red-400"}`}
                    >
                        {userDetails.isVerified ? "Verified" : "Not Verified"}
                    </Typography>
                </div>
            </div>
        </div>
    );
}
