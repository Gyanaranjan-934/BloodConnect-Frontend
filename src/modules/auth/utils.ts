/* eslint-disable @typescript-eslint/no-explicit-any */
import { DoctorType, IndividualFormType, OrganizationType, BloodReportType } from "./types";


export const DefaultIndividualForm: IndividualFormType = {
    name: "",
    phone: "",
    email: "",
    adhaarNo: "",
    dateOfBirth: "",
    bloodGroup: "",
    presentAddress: {
        street: "",
        city: "",
        state: "",
        pincode: 0,
    },
    permanentAddress: {
        street: "",
        city: "",
        state: "",
        pincode: 0,
    },
    password: "",
    confirmPassword: "",
};


export const DefaultDoctor: DoctorType = {
    fullName: "",
    email: "",
    phoneNo: "",
    gender: "male",
    dateOfBirth: "",
    doctorId: "",
    password: "",
    confirmPassword: "",
};


export const DefaultOrganization: OrganizationType = {
    name: "",
    email: "",
    phoneNo: "",
    address: {
        street: "",
        city: "",
        state: "",
        pincode: 0,
    },
    organizationHeadName: "",
    organizationHeadAdhaar: "",
    cinNo: "",
    typeOfOrganization: "healthcare",
    password: "",
    confirmPassword: "",
};

export const DefaultBloodReportDetails: BloodReportType = {
    bloodPressure: "",
    weight: "",
    height: "",
    bloodSugar: "",
    hemoglobin: "",
    heartRate: "",
};

export const checkPasswordStrength = (
    password: string,
    setPasswordStrength: React.Dispatch<React.SetStateAction<"Strong" | "Weak">>
) => {
    const isStrongPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password);
    if (!password || !isStrongPassword) {
        setPasswordStrength("Weak");
    } else {
        setPasswordStrength("Strong");
    }
};

export const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
};

export const validateAdhaarNo = (adhaarNo: string) => {
    const adhaarRegex = /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/;
    return adhaarRegex.test(adhaarNo);
};

export const getUserType = localStorage.getItem("loginType");