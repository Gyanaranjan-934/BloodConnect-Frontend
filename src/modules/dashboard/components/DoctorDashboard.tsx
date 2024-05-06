import { useQuery } from "@tanstack/react-query";
import { getUserDashboard } from "../services";
import { DoctorDashboardType } from "../types";

const DoctorDashboard = () => {
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

const doctorDashboard = data as DoctorDashboardType;
  return (
    <div>{JSON.stringify(doctorDashboard)}</div>
  )
}

export default DoctorDashboard