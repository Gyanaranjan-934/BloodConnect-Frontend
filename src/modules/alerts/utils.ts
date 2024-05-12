export type NearbyDonorType = {
    _id: string;
    email: string;
    fullName?: string;
    name?: string;
    avatar: string;
    dateOfBirth: string;
    presentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: number;
        _id: string;
    };
    phoneNo: string;
}

export type LocationType = {
    latitude: number;
    longitude: number;
}

export type AlertDetailsType = {
    patientName: string;
    problemDescription: string;
    patientAge: string;
    gender: string;
    dateOfRequirement: string;
    expiryTime: string;
    address: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    noOfDonorsToSend: number;
    bloodGroup: string;
    patientPhoto: Blob | undefined;
}

export const InitialAlertDetails: AlertDetailsType = {
    patientName: "",
    problemDescription: "",
    patientAge: "",
    gender: "",
    dateOfRequirement: "",
    expiryTime: "",
    address: "",
    coordinates: {
        latitude: 0,
        longitude: 0,
    },
    noOfDonorsToSend: 10,
    bloodGroup: "",
    patientPhoto: undefined,
};

export type AlertType  = {
    _id: string;
    senderId: string;
    recipients: string[];
    patientName: string;
    problemDescription: string;
    age: number;
    gender: string;
    bloodGroup: string;
    dateOfRequirement: string;
    expiryTime: string;
    address: string;
    patientPhoto: string;
    isSendToRecipients: boolean;
    createdAt: string;
    updatedAt: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    __v: number;
}

export type ReceivedAlertType = {
    _id: string;
    senderId: string;
    status: {
        invitationAccepted: boolean;
        isResponded: boolean;
    };
    patientName: string;
    problemDescription: string;
    age: number;
    gender: string;
    bloodGroup: string;
    dateOfRequirement: string;
    expiryTime: string;
    address: string;
    patientPhoto: string;
    isSendToRecipients: boolean;
    createdAt: string;
    updatedAt: string;
    coordinates: {
        type: "Point";
        coordinates: [number, number];
    };
    __v: number;
}

export type NearbyOrganizationType = {
    _id: string;
    email: string;
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    phone: string;
    currentLocation: {
        type: "Point";
        coordinates: [number, number];
    }
}

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const genders = ["Male", "Female", "Others"];