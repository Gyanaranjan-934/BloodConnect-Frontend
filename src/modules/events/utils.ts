export type EventType = {
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

export const InitialEventDetails: EventType = {
    eventName: "",
    eventHeadName: "",
    startDate: new Date(),
    endDate: new Date(),
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
}