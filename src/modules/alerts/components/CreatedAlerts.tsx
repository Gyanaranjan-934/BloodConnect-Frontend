/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AlertContext } from "../../../context/AlertContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import AlertDetails from "./AlertDetails";

const CreatedAlerts = () => {
    const { getAlerts } = React.useContext(AlertContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["createdAlerts"],
        queryFn: getAlerts,
    });
    console.log(data);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <Card className="w-full" placeholder={""}>
                <List
                    placeholder={""}
                    className="max-h-screen overflow-y-auto no-scrollbar"
                >
                    {(data as any)?.map((alert: any) => (
                        <AlertDetails
                            key={alert._id}
                            alert={alert}
                            type="created"
                        />
                    ))}
                </List>
            </Card>
        </div>
    );
};

export default CreatedAlerts;
