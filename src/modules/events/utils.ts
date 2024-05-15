import { DoctorType } from "../admin/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type EventInputType = {
    eventName: string;
    eventHeadName: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    isPaid: boolean;
    paymentType?: "cash" | "giftCard" | "coupon";
    paymentAmount?: number;
    targetTotalBlood: number;
    maxDonorCapacity: number;
    availableStaffCount: number;
    availableBedCount: number;
    doctorsList: string[];
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
};

export const InitialEventInputDetails: EventInputType = {
    eventName: "",
    eventHeadName: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    isPaid: false,
    targetTotalBlood: 0,
    maxDonorCapacity: 0,
    availableStaffCount: 0,
    availableBedCount: 0,
    doctorsList: [],
    address: "",
    location: {
        latitude: 0,
        longitude: 0,
    },
};

const accessToken = localStorage.getItem("accessToken");
const loginType = localStorage.getItem("loginType");

export const EventConfig = {
    headers: {
        Authorization: `Bearer ${accessToken}`,
        userType: loginType,
    },
};

export type EventType = {
    donorsRegisteredBySelf: any;
    _id: string;
    eventName: string;
    eventHeadName: string;
    organizationId: any;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    isPaid: boolean;
    paymentType?: "cash" | "giftCard" | "coupon";
    paymentAmount?: number;
    targetTotalBlood: number;
    maxDonorCapacity: number;
    availableStaffCount: number;
    availableBedCount: number;
    doctors: DoctorType[];
    address: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
    donorsRegistered: string[];
    donorsAttended: string[];
    createdAt: string;
    updatedAt: string;
    isVerified: boolean;
    isAttended: boolean;
    __v: number;
};
