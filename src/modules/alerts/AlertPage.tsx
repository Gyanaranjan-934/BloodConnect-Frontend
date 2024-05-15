import {
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import CreatedAlerts from "./components/CreatedAlerts";
import ReceivedAlerts from "./components/ReceivedAlerts";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

const TabList = [
    { label: "Created Alerts", value: 0, content: <CreatedAlerts /> },
    { label: "Received Alerts", value: 1, content: <ReceivedAlerts /> },
];

const AlertPage = () => {
    const { loggedInUserType } = React.useContext(AuthContext);
    if (loggedInUserType === "admin") {
        return <Navigate to={"/dashboard"} />;
    }
    return (
        <Tabs value={0} placeholder={""}>
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
    );
};

export default AlertPage;
