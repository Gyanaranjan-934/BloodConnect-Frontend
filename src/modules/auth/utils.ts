/* eslint-disable @typescript-eslint/no-explicit-any */
export type IndividualUserType = {
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

export const DefaultIndividual: IndividualUserType = {
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
}

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

export const DefaultDoctor: DoctorType = {
    fullName: "",
    email: "",
    phoneNo: "",
    gender: "male",
    dateOfBirth: "",
    doctorId: "",
    password: "",
    confirmPassword: "",
}

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

export const checkPasswordStrength = (password: string, setPasswordStrength: React.Dispatch<React.SetStateAction<"Strong"|"Weak">>) => {
    const isStrongPassword =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(
            password
        );
    if (!password || !isStrongPassword) {
        setPasswordStrength("Weak");
    } else {
        setPasswordStrength("Strong");
    }
};

export const statesOfIndia = [ 
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
];
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
}