export type OrganizationType = {
    _id: string;
    name: string;
    email:string;
    organizationHeadName: string;
    organizationHeadAdhaar:string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    cinNo: string;
    typeOfOrganization: "healthcare" | "educational" | "charity" | "other";
    phone: string;
    events: string[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export type DoctorType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    doctorId: string;
    gender: "Male" | "Female" | "Others"; 
    dateOfBirth: string;
    avatar: string;
    attendedCamps: string[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export type AdminDashboardType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    adminId: string;
    createdAt: string;
    updatedAt: string;
}