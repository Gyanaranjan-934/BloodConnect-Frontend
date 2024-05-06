import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { LocationType } from "../alerts/utils";
import {
    IndividualFormType,
    OrganizationType,
    DoctorType,
    LoginFormType,
    LoginResposneType,
} from "./types";

export const registerIndividual = async (
    data: IndividualFormType
): Promise<void> => {
    try {
        const mongoUser = await axiosInstance.post(
            createEndPoint.createIndividual(),
            data
        );
        console.log(mongoUser.data);
    } catch (error) {
        console.log(error);
    }
};

export const registerOrganization = async (
    data: OrganizationType
): Promise<void> => {
    try {
        const mongoUser = await axiosInstance.post(
            createEndPoint.createOrganization(),
            data
        );
        console.log(mongoUser.data);
    } catch (error) {
        console.log(error);
    }
};

export const registerDoctor = async (data: DoctorType): Promise<void> => {
    try {
        const mongoUser = await axiosInstance.post(
            createEndPoint.createDoctor(),
            data
        );
        console.log(mongoUser.data);
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (
    userDetails: LoginFormType,
    location?: LocationType
): Promise<LoginResposneType> => {
    try {
        if(location){
            userDetails.location = location;
        }
        const loginResponse = await axiosInstance.post(
            createEndPoint.loginUser(userDetails.userType),
            userDetails
        );
        if (loginResponse.data.success) {
            localStorage.setItem("loginType", userDetails.userType);
            localStorage.setItem("accessToken", loginResponse.data.data.accessToken);
            localStorage.setItem("refreshToken", loginResponse.data.data.refreshToken);
            localStorage.setItem("loggedInUserData", JSON.stringify(loginResponse.data.data.user));
            return {
                success: true,
                userData: loginResponse.data.data,
                accessToken: loginResponse.data.accessToken,
                refreshToken: loginResponse.data.refreshToken,
            };
        }
        return {
            success: false,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
        };
    }
};
