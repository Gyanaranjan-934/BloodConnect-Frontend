import React from "react";
import { AlertContext } from "../../../context/AlertContext";
import { useQuery } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import AlertDetails from "./AlertDetails";
import { AlertType } from "../utils";

const ReceivedAlerts = () => {
    const { getReceivedAlerts } = React.useContext(AlertContext);
    const { data } = useQuery({
        queryKey: ["receivedAlerts"],
        queryFn: getReceivedAlerts,
    });
    const receivedAlerts: AlertType[] = data as AlertType[];
    return (
        <div>
            <Card className="w-full h-screen max-h-screen overflow-y-auto" placeholder={""}>
                {receivedAlerts?.length > 0 && (
                    <List
                        placeholder={""}
                        className="max-h-screen overflow-y-auto no-scrollbar"
                    >
                        {receivedAlerts?.map((alert: AlertType) => (
                            <AlertDetails
                                key={alert._id}
                                alert={alert}
                                type="received"
                            />
                        ))}
                    </List>
                )}
            </Card>
        </div>
    );
};

export default ReceivedAlerts;
