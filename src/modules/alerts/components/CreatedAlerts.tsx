/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import AlertDetails from "./AlertDetails";
import { getAlerts } from "../services";
import ProgressBar from "../../../components/utils/ProgressBar";
import ErrorPage from "../../../components/utils/ErrorPage";
import { AlertType } from "../utils";

const CreatedAlerts = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["createdAlerts"],
        queryFn: getAlerts,
    });
    console.log(data);
    if (isLoading) {
        return <ProgressBar/>;
    }

    if (isError) {
        return <ErrorPage/>;
    }

    return (
        <div>
            <Card className="w-full" placeholder={""}>
                <List
                    placeholder={""}
                    className="max-h-screen overflow-y-auto no-scrollbar"
                >
                    {(data)?.map((alert: AlertType) => (
                        <AlertDetails
                            key={alert._id}
                            alertData={alert}
                            type="created"
                        />
                    ))}
                </List>
            </Card>
        </div>
    );
};

export default CreatedAlerts;
