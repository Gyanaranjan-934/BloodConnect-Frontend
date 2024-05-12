import React from "react";
import { NearbyOrganizationType } from "../../modules/alerts/utils";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
} from "@material-tailwind/react";
import { AuthContext } from "../../modules/auth/AuthContext";
import { calculateDistance } from "../../services/calculateDistance";

export default function OrganzationDetailsPopup({
    open,
    setOpen,
    organization,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    organization: NearbyOrganizationType | null;
}) {
    const handleOpen = () => setOpen(!open);
    const [distance, setDistance] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const { geoLocation } = React.useContext(AuthContext);
    React.useEffect(() => {
        if (organization) {
            // get the perticular location
            
            const distance = calculateDistance(
                geoLocation.latitude,
                geoLocation.longitude,
                organization.currentLocation?.coordinates[1],
                organization.currentLocation?.coordinates[0]
            );
            setDistance(distance);
            setIsLoading(false);
        }
    }, [organization]);
    return (
        <>
            {organization && (
                <Dialog
                    size="sm"
                    placeholder={""}
                    open={open}
                    handler={handleOpen}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}
                >
                    <DialogHeader placeholder={""}>
                        {organization.name}
                    </DialogHeader>
                    <DialogBody placeholder={""}>
                        {JSON.stringify(organization)}
                        {Number(distance).toFixed(2)} KM
                    </DialogBody>
                    <DialogFooter placeholder={""}>
                        <Button
                            placeholder={""}
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            placeholder={""}
                            variant="gradient"
                            color="green"
                            onClick={handleOpen}
                        >
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>
            )}
        </>
    );
}
