/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchEventsBasedOnPage } from "../utils";
import {
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import ErrorPage from "../../../components/utils/ErrorPage";
import ProgressBar from "../../../components/utils/ProgressBar";
import { deleteEvent, verifyEvent } from "../services";
import { toast } from "react-toastify";
import EventsTable from "../components/EventsTable";
import PaginationComponent from "../components/PaginationComponent";

export default function AllEvents() {
    const [pageNo, setPageNo] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["events", pageNo],
        queryFn: () => fetchEventsBasedOnPage(pageNo),
    });

    const queryClient = useQueryClient();

    const eventDetails = data ? data : null;

    const [editSuccess, setEditSuccess] = React.useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: () => fetchEventsBasedOnPage(pageNo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error) => {
            console.log("Error fetching events:", error);
        },
    });

    const handleVerify = async (eventId: string) => {
        try {
            setLoading(true);
            const response = await verifyEvent(eventId);
            if (response) {
                toast("Event verified successfully", { type: "success" });
                setEditSuccess(true);
            } else {
                toast("Event not verified", { type: "error" });
            }
        } catch (error) {
            console.log("Error verifying event:", error);
            toast("Error in verifying event", { type: "error" });
        } finally{
            setLoading(false);
        }
    };

    const handleDelete = async (eventId: string) => {
        try {
            setLoading(true);
            const response = await deleteEvent(eventId);
            if (response) {
                toast("Event deleted successfully", { type: "success" });
                setEditSuccess(true);
            } else {
                toast("Event not deleted", { type: "error" });
            }
        } catch (error) {
            console.log("Error deleting event:", error);
            toast("Error in deleting event", { type: "error" });
        } finally{
            setLoading(false);
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
                {eventDetails && (
                    <CardBody placeholder={""} className=" overflow-x-auto">
                        <EventsTable
                            isLoading={loading}
                            eventDetails={eventDetails}
                            handleVerify={handleVerify}
                            handleDelete={handleDelete}
                        />
                    </CardBody>
                )}
                <CardFooter
                    className="flex items-center w-full justify-between border shadow border-blue-gray-50 p-4"
                    placeholder={""}
                >
                    {eventDetails && (
                        <PaginationComponent
                            pageNo={pageNo}
                            setPageNo={setPageNo}
                            totalLength={eventDetails?.events?.length || 0}
                            totalCount={eventDetails?.totalCount || 0}
                        />
                    )}
                </CardFooter>
            </Card>
        </>
    );
}
