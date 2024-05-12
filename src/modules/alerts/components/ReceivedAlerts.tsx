import { useQuery } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import AlertDetails from "./AlertDetails";
import { ReceivedAlertType } from "../utils";
import { getReceivedAlerts } from "../services";
import ProgressBar from "../../../components/utils/ProgressBar";
import ErrorPage from "../../../components/utils/ErrorPage";

const ReceivedAlerts = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["receivedAlerts"],
        queryFn: getReceivedAlerts,
    });
    console.log(data);
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
