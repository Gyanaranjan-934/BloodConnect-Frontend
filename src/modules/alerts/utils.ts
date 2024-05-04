export type NearByUserType = {
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
    timeOfRequirement: string;
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
    timeOfRequirement: "",
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

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const genders = ["Male", "Female", "Others"];