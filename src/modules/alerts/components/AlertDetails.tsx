import {
    faClock,
    faDroplet,
    faLocationPin,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ListItem,
    ListItemPrefix,
    Avatar,
    Typography,
    Chip,
    Button,
    ListItemSuffix,
} from "@material-tailwind/react";
import moment from "moment";
import React from "react";
import { AlertContext } from "../../../context/AlertContext";
/* eslint-disable @typescript-eslint/no-explicit-any */
const AlertDetails = ({
    alert,
    type,
}: {
    alert: any;
    type: "created" | "received";
}) => {
    const { deleteAlertSent, deleteAlertReceived } =
        React.useContext(AlertContext);
    const handleDelete = () => {
        console.log("delete");

        if (type === "created") {
            deleteAlertSent(alert._id);
        } else {
            deleteAlertReceived(alert._id);
        }
    };

    return (
        <ListItem
            className="flex border-2 shadow-sm items-center justify-between gap-4"
            placeholder={""}
        >
            <div className="flex">
                <ListItemPrefix placeholder={""}>
                    <Avatar
                        variant="circular"
                        alt="candice"
                        src={alert.patientPhoto}
                        placeholder={undefined}
                    />
                </ListItemPrefix>
                <div className="">
                    <div className="flex items-center gap-4">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            placeholder={""}
                        >
                            {alert.patientName}
                        </Typography>
                        {new Date() > new Date(alert.expiryTime) ? (
                            <Chip
                                variant="ghost"
                                color="red"
                                size="sm"
                                value="Expired"
                                icon={
                                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
                                }
                            />
                        ) : (
                            <Chip
                                variant="ghost"
                                color="green"
                                size="sm"
                                value="Active"
                                icon={
                                    <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                }
                            />
                        )}
                        <Chip
                            icon={<FontAwesomeIcon icon={faClock} />}
                            variant="ghost"
                            value={moment(alert.expiryTime).format(
                                "DD/MM/YYYY hh:mm A"
                            )}
                        />
                        <Chip
                            className="flex items-center"
                            variant="ghost"
                            value={alert.bloodGroup}
                            icon={
                                <FontAwesomeIcon
                                    title={alert.bloodGroup}
                                    size="lg"
                                    color="red"
                                    icon={faDroplet}
                                />
                            }
                        />

                        <Chip
                            variant="ghost"
                            className="max-w-md text-wrap"
                            value={alert.address}
                            icon={
                                <FontAwesomeIcon
                                    icon={faLocationPin}
                                    color="green"
                                />
                            }
                        />
                    </div>
                    <Typography
                        title={alert.problemDescription}
                        variant="small"
                        color="gray"
                        className="font-normal max-w-md overflow-hidden whitespace-nowrap text-ellipsis"
                        placeholder={""}
                    >
                        {alert.problemDescription}
                    </Typography>
                </div>
            </div>
            {type === "created" ? (
                <ListItemSuffix className="flex flex-col gap-2">
                    {new Date() <= new Date(alert.expiryTime) ? (
                        <Button
                            variant="gradient"
                            size="sm"
                            color="light-blue"
                            onClick={() => {}}
                            placeholder={""}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                    ) : (
                        <></>
                    )}
                    <Button
                        variant="gradient"
                        size="sm"
                        color="red"
                        onClick={handleDelete}
                        placeholder={""}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </ListItemSuffix>
            ) : (
                <ListItemSuffix className="flex flex-col gap-2">
                    {new Date() <= new Date(alert.expiryTime) ? (
                        <>
                            <Button
                                variant="gradient"
                                size="sm"
                                color="light-blue"
                                onClick={() => {}}
                                placeholder={""}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="gradient"
                            size="sm"
                            color="red"
                            onClick={handleDelete}
                            placeholder={""}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    )}
                </ListItemSuffix>
            )}
        </ListItem>
    );
};

export default AlertDetails;
