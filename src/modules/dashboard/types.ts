/* eslint-disable @typescript-eslint/no-explicit-any */
export type IndividualDashboardType = {
    _id: string;
    email: string;
    name?: string;
    fullName?: string;
    avatar: string;
    adhaarNo: string;
    dateOfBirth: string;
    permanentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: number;
    };
    presentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: number;
    };
    phoneNo: string;
    receivedAlerts?: any[];
    bloodReports?: any[];
    eventsRegistered?: any[];
    eventsAttended?: any[];
    createdAt: string;
    updatedAt: string;
};

export type OrganizationDashboardType = {
    _id: string;
    email: string;
    organizationName: string;
    organizationHeadName: string;
    organizationHeadAdhaar: string;
    cinNo: string;
    typeOfOrganization: string;
    phoneNo: string;
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