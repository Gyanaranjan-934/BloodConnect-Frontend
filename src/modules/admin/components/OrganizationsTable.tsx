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
import React from "react";
import { OrganizationType } from "../types";
import OrganizationDetailsPopup from "./OrganizationDetailsPopup";
const TABLEHEAD = [
    "Id",
    "Name",
    "Email",
    "CIN Number",
    "Phone",
    "Address",
    "Verified Status",
    "Actions",
];

export default function OrganizationsTable({
    orgDetails,
    handleVerify,
    handleDelete,
}: {
    orgDetails: {
        organizations: OrganizationType[];
        pageNo: number;
        totalCount: number;
    };
    handleVerify: (organizationId: string) => void;
    handleDelete: (organizationId: string) => void;
}) {
    const [organizationDetailsPopupOpen, setOrganizationDetailsPopupOpen] =
        React.useState(false);
    const [selectedOrganization, setSelectedOrganization] =
        React.useState<OrganizationType | null>(null);
    return (
        <>
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
                    {orgDetails.organizations.map((organization, index) => {
                        const isLast = index === orgDetails.organizations.length - 1;
                        const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={organization._id}>
                                <td className={classes}>
                                    <div className="flex items-center gap-3">
                                        <Typography
                                            placeholder={""}
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold"
                                        >
                                            {organization._id}
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
                                        {organization.name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {organization.email}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {organization.cinNo}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {organization.phone}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        placeholder={""}
                                        variant="small"
                                        color="blue-gray"
                                        title={Object.keys(organization.address)
                                            .map(
                                                (value) =>
                                                    organization.address[
                                                        value as keyof typeof organization.address
                                                    ]
                                            )
                                            .join(", ")}
                                        className="font-normal line-clamp-2 text-ellipsis max-w-36 "
                                    >
                                        {Object.keys(organization.address)
                                            .map(
                                                (value) =>
                                                    organization.address[
                                                        value as keyof typeof organization.address
                                                    ]
                                            )
                                            .join(", ")}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <div className="w-max">
                                        <Chip
                                            size="sm"
                                            variant="ghost"
                                            value={
                                                organization.isVerified
                                                    ? "Verified"
                                                    : "Not Verified"
                                            }
                                            color={
                                                organization.isVerified
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
                                                <Button
                                                    placeholder={""}
                                                    size="sm"
                                                    variant="outlined"
                                                    onClick={() => {
                                                        setSelectedOrganization(
                                                            organization
                                                        );
                                                        setOrganizationDetailsPopupOpen(
                                                            true
                                                        );
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                                {!organization.isVerified && (
                                                    <Button
                                                        size="sm"
                                                        placeholder={""}
                                                        variant="outlined"
                                                        onClick={() => {
                                                            handleVerify(
                                                                organization._id
                                                            );
                                                            organization.isVerified =
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
                                                        handleDelete(
                                                            organization._id
                                                        );
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
            {selectedOrganization && organizationDetailsPopupOpen && (
                <OrganizationDetailsPopup
                    open={organizationDetailsPopupOpen}
                    setOpen={setOrganizationDetailsPopupOpen}
                    organization={selectedOrganization}
                />
            )}
        </>
    );
}
