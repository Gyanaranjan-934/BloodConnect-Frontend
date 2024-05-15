/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDoctorsBasedOnPage } from "../utils";
import {
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import ErrorPage from "../../../components/utils/ErrorPage";
import ProgressBar from "../../../components/utils/ProgressBar";
import { deleteDoctor, verifyDoctor } from "../services";
import { toast } from "react-toastify";
import DoctorsTable from "../components/DoctorsTable";
import PaginationComponent from "../components/PaginationComponent";

export default function AllDoctors() {
    const [pageNo, setPageNo] = React.useState(0);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["doctors", pageNo],
        queryFn: () => fetchDoctorsBasedOnPage(pageNo),
    });

    const queryClient = useQueryClient();

    const doctorDetails = data ? data : null;

    const [editSuccess, setEditSuccess] = React.useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: () => fetchDoctorsBasedOnPage(pageNo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctors"] });
        },
        onError: (error) => {
            console.log("Error fetching doctors:", error);
        },
    });

    const handleVerify = async (eventId: string) => {
        const response = await verifyDoctor(eventId);
        if (response) {
            toast("Doctor verified successfully", { type: "success" });
            setEditSuccess(true);
        } else {
            toast("Doctor not verified", { type: "error" });
        }
    };

    const handleDelete = async (eventId: string) => {
        const response = await deleteDoctor(eventId);
        if (response) {
            toast("Doctor deleted successfully", { type: "success" });
            setEditSuccess(true);
        } else {
            toast("Doctor not deleted", { type: "error" });
        }
    };

    React.useEffect(() => {
        if (!data) {
            refetch();
        } else {
            if (editSuccess || pageNo) {
                mutation.mutate();
                setEditSuccess(false);
            }
        }
    }, [data, editSuccess, refetch, pageNo]);

    if (isLoading) {
        return <ProgressBar />;
    }

    if (isError) {
        return <ErrorPage />;
    }

    return (
        <>
            <Card
                placeholder={""}
                className="flex flex-col flex-grow-0 w-full p-2"
            >
                {doctorDetails && (
                    <CardBody placeholder={""} className=" overflow-x-auto">
                        <DoctorsTable
                            handleDelete={handleDelete}
                            handleVerify={handleVerify}
                            doctorDetails={doctorDetails}
                        />
                    </CardBody>
                )}
                <CardFooter
                    className="flex items-center w-full justify-between border shadow border-blue-gray-50 p-4"
                    placeholder={""}
                >
                    {doctorDetails && (
                        <PaginationComponent
                            pageNo={pageNo}
                            setPageNo={setPageNo}
                            totalLength={doctorDetails?.doctors?.length || 0}
                            totalCount={doctorDetails?.totalCount || 0}
                        />
                    )}
                </CardFooter>
            </Card>
        </>
    );
}
