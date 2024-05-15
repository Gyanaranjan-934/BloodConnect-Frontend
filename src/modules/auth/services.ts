import createEndPoint, { axiosInstance } from "../../services/createEndPoint";
import { getConfig } from "../alerts/services";
import { LocationType } from "../alerts/utils";
import {
    IndividualDashboardType,
    OrganizationDashboardType,
} from "../dashboard/types";
import {
    OrganizationType,
    DoctorType,
    LoginFormType,
    LoginResposneType,
    IndividualRegisterFormType,
} from "./types";

export const registerIndividual = async (
    data: IndividualRegisterFormType,
    location?: LocationType
): Promise<boolean> => {
    if (location) {
        data.currentLocation = location;
    }
    try {
        const mongoUser = await axiosInstance.post(
            createEndPoint.createIndividual(),
            { ...data }
        );
        
        if (mongoUser.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const registerOrganization = async (
    data: OrganizationType,
    location?: LocationType
): Promise<boolean> => {
    if (location) {
        data.currentLocation = location;
    }
    try {
        const mongoUser = await axiosInstance.post(
            createEndPoint.createOrganization(),
            data
        );

        if (mongoUser.data.success) {
            return true;
        }
        return false;
        
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const registerDoctor = async (data: DoctorType): Promise<boolean> => {
    try {
        const mongoUser = await axiosInstance.post(
            createEndPoint.createDoctor(),
            data
        );
        if (mongoUser.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const loginUser = async (
    userDetails: LoginFormType,
    location?: LocationType
): Promise<LoginResposneType> => {
    try {
        if (location) {
            userDetails.location = location;
        }
        const loginResponse = await axiosInstance.post(
            createEndPoint.loginUser(userDetails.userType),
            userDetails
        );

        if (loginResponse.data.success) {
            localStorage.setItem("loginType", userDetails.userType);
            localStorage.setItem(
                "accessToken",
                loginResponse.data.data.accessToken
            );
            localStorage.setItem(
                "refreshToken",
                loginResponse.data.data.refreshToken
            );
            localStorage.setItem(
                "loggedInUserData",
                JSON.stringify(loginResponse.data.data.user)
            );
            return {
                success: true,
                userData: loginResponse.data.data.user,
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

export const editProfile = async (
    userDetails: IndividualDashboardType | OrganizationDashboardType,
    type: "individual" | "organization",
    location?: LocationType,
    permanentAddress?: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    }
): Promise<boolean> => {
    try {
        const config = await getConfig();
        if (location) {
            userDetails.currentLocation = location;
        }
        if (permanentAddress && type === "individual") {
            (userDetails as IndividualDashboardType).permanentAddress =
                permanentAddress;
        }
        const response = await axiosInstance.put(
            createEndPoint.editProfile(type),
            { ...userDetails },
            {
                headers: config.headers,
            }
        ); 

        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
