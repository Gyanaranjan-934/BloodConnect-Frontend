import React from "react";
import { AdminDashboardType } from "./types";
import { getAdminDashboard } from "./services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorPage from "../../components/utils/ErrorPage";
import ProgressBar from "../../components/utils/ProgressBar";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["adminDashboard"],
        queryFn: getAdminDashboard,
    });
    const [editSuccess, setEditSuccess] = React.useState<boolean>(false);
    

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: getAdminDashboard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["adminDashboard"] });
            setEditSuccess(true);
        },
        onError: (error) => {
            toast(error?.message || "Error updating dashboard", {
                type: "error",
            });
            console.log("Error updating dashboard:", error);
        },
    });

    const adminDashboard = data as AdminDashboardType;

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

    return (
        <>
            <div className="w-full h-screen">
                <div className="flex flex-col">
                    <div className="w-full flex justify-evenly m-4 p-4 shadow-md rounded-md">
                        <h1 className="text-3xl font-semibold">
                            Admin Dashboard
                        </h1>
                        <Link to={"/dashboard/organizations"}>
                            <Button placeholder={""}>View Organizations</Button>
                        </Link>
                        <Link to={"/dashboard/events"}>
                            <Button placeholder={""}>View Events</Button>
                        </Link>
                        <Link to={"/dashboard/doctors"}>
                            <Button placeholder={""}>View Doctors</Button>
                        </Link>
                    </div>
                    <div className="w-full m-4 p-4 shadow-md rounded-md">
                        <div>
                            <h5 className=" font-semibold">
                                Name:{" "}
                                <span className="text-red-500">
                                    {adminDashboard?.name}
                                </span>
                            </h5>
                            <h5 className="font-semibold">
                                Email:{" "}
                                <span className="text-red-500">
                                    {adminDashboard?.email}
                                </span>
                            </h5>
                            <h5 className="font-semibold">
                                Phone:{" "}
                                <span className="text-red-500">
                                    {adminDashboard?.phone}
                                </span>
                            </h5>
                            <h5 className="font-semibold">
                                AdminID:{" "}
                                <span className="text-red-500">
                                    {adminDashboard.adminId}
                                </span>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
