/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AuthContext } from "../../auth/AuthContext";
import { getUserDashboard } from "../services";
import { OrganizationDashboardType } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProgressBar from "../../../components/utils/ProgressBar";
import ErrorPage from "../../../components/utils/ErrorPage";
import { toast } from "react-toastify";
import OrganizationDetailsCard from "./OrganizationDetailsCard";
import FutureEventsOrg from "../../events/organization/components/FutureEventsOrg";
import { Typography } from "@material-tailwind/react";
const OrganizationDashboard = () => {
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
            setEditSuccess(false);
        },
        onError: (error) => {
            toast(error?.message || "Error updating dashboard", {
                type: "error",
            });
            console.log("Error updating dashboard:", error);
        },
    });

    const organizationDashboard = data as OrganizationDashboardType;

    const [userDetails, setUserDetails] =
        React.useState<OrganizationDashboardType>(organizationDashboard);

    React.useEffect(() => {
        setUserDetails(organizationDashboard);
    }, [organizationDashboard]);
    React.useEffect(() => {
        if (!data) {
            refetch();
        } else {
            if (editSuccess) {
                mutation.mutate();
            }
        }
    }, [editSuccess, data, refetch]);
    if (isLoading) {
        return <ProgressBar />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    console.log(userDetails?.upcomingEvents);

    return (
        <>
            {userDetails && (
                <div className="flex flex-col h-screen bg-gray-100 max-w-full w-full">
                    <div className="w-full">
                        <OrganizationDetailsCard userDetails={userDetails} />
                    </div>
                    <div className="mt-4 p-4 w-full">
                        <Typography
                            placeholder={""}
                            className="py-4"
                            variant="h4"
                        >
                            Upcoming Events
                        </Typography>
                        <FutureEventsOrg
                            eventList={userDetails.upcomingEvents}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default OrganizationDashboard;
