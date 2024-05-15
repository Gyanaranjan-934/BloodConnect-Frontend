import React from "react";
import { Card, List, ListItem } from "@material-tailwind/react";
import OrganzationDetailsPopup from "./OrganzationDetailsPopup";
import { NearbyOrganizationType } from "../../alerts/utils";

export default function NearbyOrganizationList({
    nearbyOrganizations,
    setEditSuccess,
}: {
    nearbyOrganizations: NearbyOrganizationType[];
    setEditSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [isOrganizationDetailsPopupOpen, setIsOrganizationDetailsPopupOpen] =
        React.useState(false);
    const [selectedOrganization, setSelectedOrganization] =
        React.useState<NearbyOrganizationType | null>(null);

    return (
        <>
            <Card className="w-full overflow-y-auto" placeholder={""}>
                <List placeholder={""}>
                    {nearbyOrganizations.map((organization) => (
                        <ListItem
                            placeholder={""}
                            key={organization._id}
                            onClick={() => {
                                setSelectedOrganization(organization);
                                setIsOrganizationDetailsPopupOpen(true);
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                <h2>{organization.name}</h2>
                                <div className="flex gap-2">
                                    <span>{organization.email}</span> |
                                    <span>{organization.phone}</span>
                                </div>
                                <p>
                                    {Object.values(organization.address).join(
                                        ", "
                                    )}
                                </p>
                            </div>
                        </ListItem>
                    ))}
                </List>
            </Card>
            {isOrganizationDetailsPopupOpen && (
                <OrganzationDetailsPopup
                    setEditSuccess={setEditSuccess}
                    organization={selectedOrganization}
                    setOpen={setIsOrganizationDetailsPopupOpen}
                    open={isOrganizationDetailsPopupOpen}
                />
            )}
        </>
    );
}
