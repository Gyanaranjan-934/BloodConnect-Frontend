import React from "react";
import { NearbyOrganizationType } from "../../modules/alerts/utils";
import { Card, List, ListItem } from "@material-tailwind/react";
import OrganzationDetailsPopup from "./OrganzationDetailsPopup";

export default function NearbyOrganizationList({
    nearbyOrganizations,
}: {
    nearbyOrganizations: NearbyOrganizationType[];
}) {
    const [isOrganizationDetailsPopupOpen, setIsOrganizationDetailsPopupOpen] =
        React.useState(false);
    const [selectedOrganization, setSelectedOrganization] =
        React.useState<NearbyOrganizationType | null>(null);

    return (
        <>
            <Card className="w-full" placeholder={""}>
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
                            <div>{JSON.stringify(organization)}</div>
                        </ListItem>
                    ))}
                </List>
            </Card>
            {isOrganizationDetailsPopupOpen && (
                <OrganzationDetailsPopup
                    organization={selectedOrganization}
                    setOpen={setIsOrganizationDetailsPopupOpen}
                    open={isOrganizationDetailsPopupOpen}
                />
            )}
        </>
    );
}
