import { useQuery } from "@tanstack/react-query";
import { Card, List } from "@material-tailwind/react";
import AlertDetails from "./AlertDetails";
import { getAlerts } from "../services";
import ProgressBar from "../../../components/utils/ProgressBar";
import ErrorPage from "../../../components/utils/ErrorPage";
import { AlertType } from "../utils";
import React from "react";

const CreatedAlerts = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["createdAlerts"],
        queryFn: getAlerts,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editSuccess, data]);
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
                            setEditSuccess={setEditSuccess}
                        />
                    ))}
                </List>
            </Card>
        </div>
    );
};

export default CreatedAlerts;
