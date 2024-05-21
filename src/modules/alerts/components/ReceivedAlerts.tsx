import { useQuery } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import AlertDetails from "./AlertDetails";
import { ReceivedAlertType } from "../utils";
import { getReceivedAlerts } from "../services";
import ProgressBar from "../../../components/utils/ProgressBar";
import ErrorPage from "../../../components/utils/ErrorPage";
import React from "react";

const ReceivedAlerts = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["receivedAlerts"],
        queryFn: getReceivedAlerts,
    });
    const [editSuccess, setEditSuccess] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!data) {
            refetch();
        } else {
            if (editSuccess) {
                refetch();
                setEditSuccess(false);
            }
        }
    }, [editSuccess, data]);

    if (isLoading) {
        return <ProgressBar/>;
    }

    if (isError) {
        return <ErrorPage/>;
    }
    const receivedAlerts = data as ReceivedAlertType[];
    return (
        <div>
            <Card className="w-full h-screen max-h-screen overflow-y-auto" placeholder={""}>
                {receivedAlerts?.length > 0 && (
                    <List
                        placeholder={""}
                        className="max-h-screen overflow-y-auto no-scrollbar"
                    >
                        {receivedAlerts?.map((alert: ReceivedAlertType) => (
                            <AlertDetails
                                key={alert._id}
                                alertData={alert}
                                setEditSuccess={setEditSuccess}
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
