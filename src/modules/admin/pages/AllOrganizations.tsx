/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrganizationsBasedOnPage } from "../utils";
import {
    Card,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import ErrorPage from "../../../components/utils/ErrorPage";
import ProgressBar from "../../../components/utils/ProgressBar";
import { deleteOrganization, verifyOrganization } from "../services";
import { toast } from "react-toastify";
import OrganizationsTable from "../components/OrganizationsTable";
import PaginationComponent from "../components/PaginationComponent";

export default function AllOrganizations() {
    const [pageNo, setPageNo] = React.useState(0);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["organizations", pageNo],
        queryFn: () => fetchOrganizationsBasedOnPage(pageNo),
    });

    const queryClient = useQueryClient();

    const orgDetails = data ? data : null;

    const [editSuccess, setEditSuccess] = React.useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: () => fetchOrganizationsBasedOnPage(pageNo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organizations"] });
        },
        onError: (error) => {
            console.log("Error fetching organizations:", error);
        },
    });

    const handleVerify = async (organizationId: string) => {
        const response = await verifyOrganization(organizationId);
        if (response) {
            toast("Organization verified successfully", { type: "success" });
            setEditSuccess(true);
        } else {
            toast("Organization not verified", { type: "error" });
        }
    };

    const handleDelete = async (organizationId: string) => {
        const response = await deleteOrganization(organizationId);
        if (response) {
            toast("Organization deleted successfully", { type: "success" });
            setEditSuccess(true);
        } else {
            toast("Organization not deleted", { type: "error" });
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
                {orgDetails && (
                    <CardBody placeholder={""} className=" overflow-x-auto">
                        <OrganizationsTable
                            orgDetails={orgDetails}
                            handleDelete={handleDelete}
                            handleVerify={handleVerify}
                        />
                    </CardBody>
                )}
                <CardFooter
                    className="flex items-center w-full justify-between border shadow border-blue-gray-50 p-4"
                    placeholder={""}
                >
                    {orgDetails && (
                        // <>
                        //     <Button
                        //         variant="outlined"
                        //         size="sm"
                        //         placeholder={""}
                        //         onClick={handlePrevClick}
                        //     >
                        //         Previous
                        //     </Button>
                        //     <div className="flex items-center gap-2">
                        //         {Array.from(
                        //             {
                        //                 length: Math.ceil(
                        //                     orgDetails?.totalCount / 5
                        //                 ),
                        //             },
                        //             (_, i) => i + 1
                        //         ).map((page) => (
                        //             <IconButton
                        //                 key={page}
                        //                 variant={
                        //                     pageNo === page - 1
                        //                         ? "outlined"
                        //                         : "text"
                        //                 }
                        //                 size="sm"
                        //                 placeholder={""}
                        //                 onClick={() => {
                        //                     setPageNo(page - 1);
                        //                 }}
                        //             >
                        //                 {page}
                        //             </IconButton>
                        //         ))}
                        //     </div>
                        //     <Button
                        //         variant="outlined"
                        //         size="sm"
                        //         placeholder={""}
                        //         onClick={handleNextClick}
                        //     >
                        //         Next
                        //     </Button>
                        // </>
                        <PaginationComponent
                            pageNo={pageNo}
                            setPageNo={setPageNo}
                            totalLength={orgDetails?.organizations?.length || 0}
                            totalCount={orgDetails?.totalCount || 0}
                        />
                    )}
                </CardFooter>
            </Card>
        </>
    );
}
