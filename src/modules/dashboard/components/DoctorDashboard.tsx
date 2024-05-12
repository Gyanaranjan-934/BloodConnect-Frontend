import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserDashboard } from "../services";
import { DoctorDashboardType } from "../types";
import React from "react";
import { toast } from "react-toastify";
import ErrorPage from "../../../components/utils/ErrorPage";
import ProgressBar from "../../../components/utils/ProgressBar";
import { AuthContext } from "../../auth/AuthContext";

const DoctorDashboard = () => {
    const { loggedInUserType } = React.useContext(AuthContext);
    const [editSuccess, setEditSuccess] = React.useState<boolean>(false);

    const getUserDashboardFromServer = async () => {
        return await getUserDashboard(loggedInUserType);
    };

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getUserDashboardFromServer,
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: getUserDashboardFromServer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
            setEditSuccess(true);
        },
        onError: (error) => {
            toast(error?.message || "Error updating dashboard", {
                type: "error",
            });
            console.log("Error updating dashboard:", error);
        },
    });

    console.log(data);

    const organizationDashboard = data as DoctorDashboardType;

    React.useEffect(() => {
        if (!data) {
            refetch();
        } else {
            if (editSuccess) {
                mutation.mutate();
                setEditSuccess(false);
            }
        }
    }, [editSuccess, mutation, data, refetch]);

    if (isLoading) {
        return <ProgressBar />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    return <div>{JSON.stringify(organizationDashboard)}</div>;
};

export default DoctorDashboard;
