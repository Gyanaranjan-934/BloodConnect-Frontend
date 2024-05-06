/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocationType } from "../alerts/utils";

export type IndividualFormType = {
    name: string;
    phone: string;
    email: string;
    adhaarNo: string;
    dateOfBirth: string;
    bloodGroup: string;
    presentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: number;
    };
    permanentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: number;
    };
    password: string;
    confirmPassword: string;
    currentLocation?: {
        latitude: number;
        longitude: number;
    };
};

export type DoctorType = {
    fullName: string;
    email: string;
    phoneNo: string;
    gender: "male" | "female" | "others";
    dateOfBirth: string;
    doctorId: string;
    password: string;
    confirmPassword: string;
};

export type OrganizationType = {
    name: string;
    email: string;
    phoneNo: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: number;
    };
    organizationHeadName: string;
    organizationHeadAdhaar: string;
    cinNo: string;
    typeOfOrganization: "healthcare" | "educational" | "charity" | "other";
    password: string;
    confirmPassword: string;
    currentLocation?: {
        latitude: number;
        longitude: number;
    };
};

export type DoctorDetailsType = {
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
    __v: number;
};

export type LoginFormType = {
    email: string;
    password: string;
    userType: "individual" | "organization" | "doctor" | "admin";
    location?: LocationType;
};

export type LoginResposneType = {
    success: boolean;
    userData?: any;
    accessToken?: string;
    refreshToken?: string;
};

export type BloodReportType = {
    bloodPressure: string;
    weight: string;
    height: string;
    bloodSugar: string;
    hemoglobin: string;
    heartRate: string;
    updatedBy?: string;
    lastCamp?: string;
}