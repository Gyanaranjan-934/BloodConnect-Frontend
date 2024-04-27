import {
    GoogleMap,
    MarkerF,
    useLoadScript,
    Autocomplete,
    Libraries,
} from "@react-google-maps/api";
import { fromLatLng, setKey } from "react-geocode";
import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { Input } from "@material-tailwind/react";

const libraries:Libraries = ["places"];

const Map = ({
    setSelectedLocation,
    setAddress,
    address,
}: {
    setSelectedLocation: Dispatch<
        SetStateAction<{ latitude: number; longitude: number }>
    >;
    setAddress: Dispatch<SetStateAction<string>>;
    address: string;
}) => {
    const [searchResult, setSearchResult] =
        useState<google.maps.places.Autocomplete>();
    const mapContainerStyle = {
        width: "100%",
        height: "100%",
    };
    const { geoLocation } = useContext(AuthContext);
    setKey("AIzaSyDwTywZq2hev2S1Btoz6HuxKCDfy2Rt5ho");

    const getPlaceName = (lat: number, lng: number) => {
        let addressName = "";
        fromLatLng(lat, lng)
            .then(({ results }) => {
                console.log(results);
                addressName = results[0].formatted_address;
            })
            .catch((error) => {
                console.error(error);
                addressName = "Error getting place name";
            });
        setAddress(addressName);
        return addressName;
    };

    useEffect(() => {
        const placeName = getPlaceName(
            geoLocation.latitude,
            geoLocation.longitude
        );
        console.log(placeName);
        setAddress(placeName);
    }, []);

    const [markerCurrentPosition, setMarkerCurrentPosition] = React.useState<{
        lat: number;
        lng: number;
    } | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDwTywZq2hev2S1Btoz6HuxKCDfy2Rt5ho",
        libraries: libraries,
    });

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps</div>;

    function locationSelected() {
        if (searchResult) {
            const place = searchResult.getPlace();
            setAddress(`${place.name}, ${place.formatted_address}, ph: ${place.formatted_phone_number}` || ""); 
            setMarkerCurrentPosition({
                lat: place.geometry?.location?.lat(),
                lng: place.geometry?.location?.lng(),
            });
            setSelectedLocation({
                latitude:
                    place.geometry?.location?.lat() || geoLocation.latitude,
                longitude:
                    place.geometry?.location?.lng() || geoLocation.longitude,
            });
        }
    }

    function onLoad(autocomplete: google.maps.places.Autocomplete) {
        setSearchResult(autocomplete);
    }

    return (
        <>
            <Autocomplete onPlaceChanged={locationSelected} onLoad={onLoad}>
                <Input
                    label="Search Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 text-ellipsis invalid:border-red-500 dark:placeholder-gray-300"
                />
            </Autocomplete>
            {isLoaded && (
                <div className="m-4 p-4 h-[30rem] w-full bg-white"> 
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={10}
                        center={
                            markerCurrentPosition || {
                                lat: geoLocation.latitude,
                                lng: geoLocation.longitude,
                            }
                        }
                        onClick={(event) => {
                            setMarkerCurrentPosition({
                                lat:
                                    event.latLng?.lat() || geoLocation.latitude,
                                lng:
                                    event.latLng?.lng() ||
                                    geoLocation.longitude,
                            });
                            setSelectedLocation({
                                latitude:
                                    event.latLng?.lat() || geoLocation.latitude,
                                longitude:
                                    event.latLng?.lng() ||
                                    geoLocation.longitude,
                            });
                        }}
                    >
                        <MarkerF
                            position={
                                markerCurrentPosition || {
                                    lat: geoLocation.latitude,
                                    lng: geoLocation.longitude,
                                }
                            }
                        />
                    </GoogleMap>
                </div>
            )}
        </>
    );
};

export default Map;
