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

export type IndividualRegisterFormType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    bloodGroup: string;
    currentLocation?: LocationType;
}

export type DoctorType = {
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female" | "others";
    dateOfBirth: string;
    doctorId: string;
    password: string;
    confirmPassword: string;
};

export type OrganizationType = {
    name: string;
    email: string;
    phone: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
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
    name: string;
    doctorId: string;
    gender: string;
    dateOfBirth: string;
    avatar: string;
    phone: string;
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
    bloodUnits: string,
    bloodPressure: string;
    weight: string;
    height: string;
    bloodSugar: string;
    hemoglobin: string;
    heartRate: string;
    updatedBy?: string;
    lastCamp?: string;
}