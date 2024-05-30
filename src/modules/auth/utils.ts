import {
    DoctorType,
    IndividualFormType,
    OrganizationType,
    BloodReportType,
    IndividualRegisterFormType,
} from "./types";

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
    name: "",
    email: "",
    phone: "",
    gender: "male",
    dateOfBirth: "",
    doctorId: "",
    password: "",
    confirmPassword: "",
};

export const DefaultOrganization: OrganizationType = {
    name: "",
    email: "",
    phone: "",
    address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
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
    bloodUnits: "",
};

export const DefaultIndividualRegisterForm: IndividualRegisterFormType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
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
    const adhaarRegex = /^\d{12}$/;
    return adhaarRegex.test(adhaarNo);
};

export const getUserType = localStorage.getItem("loginType");
