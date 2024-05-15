import { getAppointments } from "./services";

export const fetchAppointmentsBasedOnPage = async (pageNo: number = 1) => await getAppointments(pageNo);
    