import { LocationType } from "../alerts/utils";
import { AppointmentDetailsType } from "../appointment/types";
import { EventType } from "../events/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type IndividualDashboardType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    adhaarNo: string;
    dateOfBirth: string;
    bloodGroup: string;
    permanentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    presentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    phone: string;
    receivedAlerts: any[];
    bloodReports: any[];
    eventsRegistered: any[];
    eventsAttended: {
        eventId: string;
        doctorId: string;
        donationDate: Date;
        bloodUnits: number;
    }[];
    appointments: AppointmentDetailsType[];
    createdAt?: string;
    updatedAt?: string;
    currentLocation?: LocationType
};

export type OrganizationDashboardType = {
    _id: string;
    email: string;
    name: string;
    organizationHeadName: string;
    organizationHeadAdhaar: string;
    cinNo: string;
    typeOfOrganization: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: number;
    };
    isVerified: boolean;
    photos: string[];
    createdAt: string;
    updatedAt: string;
    events: any[];
    upcomingEvents: EventType[];
    currentLocation?: LocationType
}

export type DoctorDashboardType = {
    _id: string;
    email: string;
    fullName: string;
    doctorId: string;
    gender: string;
    dateOfBirth: string;
    avatar: string;
    phoneNo: string;
    attendedCamps: any[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}