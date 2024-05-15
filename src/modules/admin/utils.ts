import { getAllDoctors, getAllEvents, getAllOrganizations } from "./services";

export const fetchOrganizationsBasedOnPage = async (pageNo: number = 1) =>
    await getAllOrganizations(pageNo);

export const fetchEventsBasedOnPage = async (pageNo: number = 1) =>
    await getAllEvents(pageNo);

export const fetchDoctorsBasedOnPage = async (pageNo: number = 1) =>
    await getAllDoctors(pageNo);