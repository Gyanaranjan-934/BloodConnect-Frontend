/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { AuthContext } from "../../modules/auth/AuthContext";
import MapWithAutocomplete from "../utils/Map";
import { Button } from "@material-tailwind/react";
import { searchDonors } from "../../modules/alerts/services";
import { NearbyOrganizationType } from "../../modules/alerts/utils";
import NearbyOrganizationList from "./NearbyOrganizationList";

const SearchDonors = ({
    onClose,
}: {
    isOpen?: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(true);
    const { geoLocation } = useContext(AuthContext);
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    }>(geoLocation);
    const [address, setAddress] = useState<string>("");
    const handleClose = () => {
        setIsAlertPopupOpen(false);

        setTimeout(() => {
            onClose(false);
        }, 100);
    };

    const [nearbyOrganizations, setNearbyOrganizations] = useState<NearbyOrganizationType[]>([]);

    const handleSearch = async () => {
        try {
            // Call searchDonors function to fetch nearby donors
            const donorsData: NearbyOrganizationType[] = await searchDonors(selectedLocation);

            // Update state with the retrieved donors data
            setNearbyOrganizations(donorsData);
        } catch (error) {
            console.log("Error fetching nearby donors:", error);
        }
    };

    return (
        <div>
            <div
                className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isAlertPopupOpen ? "opacity-100" : "opacity-0"}`}
            >
                <div
                    className={`bg-white rounded-lg shadow-md w-[60%] h-min max-h-[90%]  overflow-y-auto p-4 text-center z-10 transform transition-transform ease-in duration-500 ${isAlertPopupOpen ? "scale-100" : "scale-90"}`}
                >
                    {nearbyOrganizations.length === 0 ? (
                        <div className="flex flex-col">
                            <MapWithAutocomplete
                                setSelectedLocation={setSelectedLocation}
                                setAddress={setAddress}
                                address={address}
                            />
                            <div className=" flex justify-around">
                                <Button placeholder={""} color="green" onClick={handleSearch}>
                                    Search
                                </Button>
                                <Button placeholder={""} color="red" onClick={handleClose}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <NearbyOrganizationList nearbyOrganizations={nearbyOrganizations} />
                            <Button placeholder={""} color="red" onClick={handleClose}>
                                Close
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchDonors;
