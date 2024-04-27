import {
    IndividualDetailsType,
} from "../../context/DashboardContext";
export type AlertDetails = {
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
    nearByUsers?: IndividualDetailsType[],
}

export const InitialAlertDetails: AlertDetails = {
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
    nearByUsers: [],
};

