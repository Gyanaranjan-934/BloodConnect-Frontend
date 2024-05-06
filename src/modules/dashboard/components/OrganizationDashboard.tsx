import { getUserDashboard } from "../services";
import { OrganizationDashboardType } from "../types";
import { useQuery } from "@tanstack/react-query";
const OrganizationDashboard = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getUserDashboard,
    });
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    const organizationDashboard = data as OrganizationDashboardType;
    return (
        <div>OrganizationDashboard{JSON.stringify(organizationDashboard)}</div>
    );
};

export default OrganizationDashboard;
