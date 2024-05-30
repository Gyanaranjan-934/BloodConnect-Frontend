import { getAppointments } from "./services";

export const fetchAppointmentsBasedOnPage = async (pageNo: number = 1) => await getAppointments(pageNo);

export const TIME_SLOTS = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
];
