export type AppointmentType = {
    _id: string;
    userId: IndividualUserInAppointmentType;
    organizationId: string;
    appointmentDate: Date;
    appointmentTime: string;
    status: string;
}

export type IndividualUserInAppointmentType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    bloodGroup: string;
    dateOfBirth: string;
    presentAddress: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
}

export type OrganizationUserInAppointmentType = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    typeOfOrganization: string;
    cinNo: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
}

export type AppointmentDetailsType = {
    _id: string;
    userId: IndividualUserInAppointmentType;
    organizationId: OrganizationUserInAppointmentType;
    appointmentDate: Date;
    appointmentTime: string;
    status: string;
}

export type AppointmentFormType = {
    organizationId?: string | null;
    appointmentDate: string;
    appointmentTime: string;
}