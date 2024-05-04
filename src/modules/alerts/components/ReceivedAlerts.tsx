import React from "react";
import { AlertContext } from "../../../context/AlertContext";
import { useQuery } from "@tanstack/react-query";
import {
    Card,
    List,
} from "@material-tailwind/react";
import AlertDetails from "./AlertDetails";

const ReceivedAlerts = () => {
    const { getReceivedAlerts } = React.useContext(AlertContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["receivedAlerts"],
        queryFn: getReceivedAlerts,
    });
    return (
        <div>
            <Card className="w-full" placeholder={""}>
                {(data as any)?.length>0 && <List placeholder={""} className="max-h-screen overflow-y-auto no-scrollbar">
                    {(data as any)?.map((alert: any) => (
                        <AlertDetails key={alert._id} alert={alert} type="received" />
                    ))}
                </List>}
            </Card>
        </div>
    );
};

export default ReceivedAlerts;
