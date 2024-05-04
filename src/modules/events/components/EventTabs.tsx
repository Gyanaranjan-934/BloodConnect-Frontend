import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import CurrentEvent from "./CurrentEvent";
import FutureEvents from "./FutureEvents";
import PastEvents from "./PastEvents";
const TabList = [
    {
        label: "Events in progress",
        value: 0,
        content: <CurrentEvent />,
    },
    {
        label: "Upcoming events",
        value: 1,
        content: <FutureEvents />,
    },
    {
        label: "Past events",
        value: 2,
        content: <PastEvents />,
    },
];

function EventTabs() {
    return (
        <div className=" p-4">
            <Tabs value={0} placeholder={""}  >
                <TabsHeader placeholder={""}>
                    {TabList.map((tab) => (
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
                    {TabList.map((tab) => (
                        <TabPanel key={tab.value} value={tab.value}>
                            {tab.content}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
}

export default EventTabs;
