import { ReactElement, useEffect, useState } from "react";
import { RegistrationFormComponent } from "../components/auth/formComponent";

export const RegistrationPage = (): ReactElement => {
    // get the current geolocation
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  useEffect(() => {
    console.log(navigator);
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      <RegistrationFormComponent />
      <div>
        Latitude: {latitude}
        <br />
        Longitude: {longitude}
      </div>
    </>
  );
};
