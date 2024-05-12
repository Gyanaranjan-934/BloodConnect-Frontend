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
        console.log(mongoUser);

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
): Promise<void> => {
    if (location) {
        data.currentLocation = location;
    }
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
        if (location) {
            userDetails.location = location;
        }
        const loginResponse = await axiosInstance.post(
            createEndPoint.loginUser(userDetails.userType),
            userDetails
        );
        console.log(loginResponse);

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
) => {
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
        console.log(response);

        if (response.data.success) {
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};
