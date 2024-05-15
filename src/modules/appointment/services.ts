import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { getConfig } from "../alerts/services";
import { AppointmentFormType, AppointmentType } from "./types";

export const createAppointment = async (
    appointmentDetails: AppointmentFormType
): Promise<boolean> => {
    try {
        if(!appointmentDetails.organizationId){
            return false;
        }
        const config = await getConfig();
        const createdAppointment = await axiosInstance.post(
            createEndPoint.createAppointment(),
            { ...appointmentDetails },
            {
                headers: config.headers,
            }
        );
        console.log(createdAppointment);
        
        if (createdAppointment.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error creating appointment:", error);
        return false;
    }
};

export const getAppointments = async (
    pageNo: number
): Promise<{
    appointments: AppointmentType[];
    pageNo: number;
    totalCount: number;
} | null> => {
    try {
        const config = await getConfig();
        const appointments = await axiosInstance.get(
            createEndPoint.getAppointments(),
            {
                headers: config.headers,
                params: {
                    pageNo,
                },
            }
        );
        console.log(appointments);
        return appointments.data.data;
    } catch (error) {
        console.log("Error getting appointments:", error);
        return null;
    }
};

export const respondAppointment = async (
    appointmentId: string,
    isAccepted: boolean
): Promise<boolean> => {
    try {
        const config = await getConfig();
        const response = await axiosInstance.patch(
            createEndPoint.respondAppointment(appointmentId),
            { invitationStatus: isAccepted ? "accepted" : "declined" },
            {
                headers: config.headers,
            }
        );
        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log("Error responding to appointment:", error);
        return false;
    }
};
