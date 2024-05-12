export type EventDetailsDonorType = {
    _id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    bloodGroup: string;
    bloodReports: string[];
    dateOfBirth: string;
    adhaarNo: string;
};

export type AttendDonorsByDoctorType = {
    donorId: EventDetailsDonorType,
    doctorId: EventDetailsDoctorType,
}

export type DonorRegisteredByDoctor = {
    _id: string;
    email: string;
    name: string;
    phone: string;
    bloodGroup: string;
};

export type EventDetailsDoctorType = {
    _id: string;
    email: string;
    name: string;
    phone: string;
    avatar: string;
    gender: string;
    doctorId: string;
};

export type EventDetailsOrganizationType = {
    cinNo: string;
    email: string;
    typeOfOrganization: string;
    phone: string;
    organizationHeadName: string;
    organizationHeadAdhaar: string;
    name: string;
    _id: string;
};

export type EventDetailsType = {
    _id: string;
    address: string;
    availableStaffCount: number;
    availableBedCount: number;
    createdAt: string;
    updatedAt: string;
    doctors: EventDetailsDoctorType[];
    donorsRegisteredBySelf: EventDetailsDonorType[];
    donorsRegisteredByDoctor: DonorRegisteredByDoctor[];
    donorsAttended: {
        donorId: EventDetailsDonorType;
        doctorId: EventDetailsDoctorType;
    }[];
    eventName: string;
    eventHeadName: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    isPaid: boolean;
    paymentType?: string;
    paymentAmount?: number;
    targetTotalBlood: number;
    maxDonorCapacity: number;
    organizationId: EventDetailsOrganizationType;
    __v: number;
};

export type DonorFormDetailsByDoctorType = {
    name: string;
    phone: string;
    email: string;
    bloodGroup: string;
};
