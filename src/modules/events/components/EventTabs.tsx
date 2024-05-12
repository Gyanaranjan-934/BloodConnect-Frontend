import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import CurrentEvent from "../organization/components/CurrentEvent";
import FutureEventsOrg from "../organization/components/FutureEventsOrg";
import RegisteredEvents from "../individual/components/RegisteredEvents";
import React from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { EventType } from "../utils";
import FutureEvents from "../individual/components/FutureEvents";
import { getEventsOfOrganization } from "../services";
import PastEvents from "../organization/components/PastEvents";

const OrganizationTabList = [
    {
        label: "Events in progress",
        value: 0,
        content: CurrentEvent,
    },
    {
        label: "Upcoming events",
        value: 1,
        content: FutureEventsOrg,
    },
    {
        label: "Past events",
        value: 2,
        content: PastEvents,
    },
];

const IndividualTabList = [
    {
        label: "Upcoming Events",
        value: 0,
        content: FutureEvents,
    },
    {
        label: "Registered Events",
        value: 1,
        content: RegisteredEvents,
    },
];

function EventTabs() {
    const { loggedInUserType } = React.useContext(AuthContext);
    const { data } = useQuery({
        queryKey: ["events"],
        queryFn:
            loggedInUserType === "organization"
                ? getEventsOfOrganization
                : () => [],
    });
    const orgEvents = (data ? data : []) as EventType[];
    console.log(orgEvents);
    
    const currentDate = new Date();
    const today = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
    );

    const upcomingEvents = orgEvents.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate > today;
    });

    const pastEvents = orgEvents.filter((event) => {
        const eventDate = new Date(event.endDate);
        return eventDate < today;
    });

    const presentEvents = orgEvents.filter((event) => {
        const eventStartDate = new Date(event.startDate);
        const eventEndDate = new Date(event.endDate);
        return eventStartDate < today && eventEndDate > today;
    });

    return (
        <div className=" p-4">
            <Tabs value={0} placeholder={""}>
                <TabsHeader placeholder={""}>
                    {loggedInUserType === "organization"
                        ? OrganizationTabList.map((tab) => (
                              <Tab
                                  key={tab.value}
                                  value={tab.value}
                                  placeholder={""}
                                  className=" mr-2"
                              >
                                  {tab.label}
                              </Tab>
                          ))
                        : IndividualTabList.map((tab) => (
                              <Tab
                                  key={tab.value}
                                  value={tab.value}
                                  placeholder={""}
                                  className=" mr-2"
                              >
                                  {tab.label}
                              </Tab>
                          ))}
                </TabsHeader>
                <TabsBody placeholder={""}>
                    {loggedInUserType === "organization"
                        ? OrganizationTabList.map((tab) => (
                              <TabPanel key={tab.value} value={tab.value}>
                                  <tab.content
                                      eventList={
                                          tab.value === 0
                                              ? presentEvents
                                              : tab.value === 1
                                                ? upcomingEvents
                                                : pastEvents
                                      }
                                  />
                              </TabPanel>
                          ))
                        : IndividualTabList.map((tab) => (
                              <TabPanel key={tab.value} value={tab.value}>
                                  <tab.content />
                              </TabPanel>
                          ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}

export default EventTabs;
