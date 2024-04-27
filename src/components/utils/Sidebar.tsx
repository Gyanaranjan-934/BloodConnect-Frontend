import React from "react";
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionBody,
    AccordionHeader,
} from "@material-tailwind/react";
import { ProfileMenu } from "./ProfileMenu";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ErrorBoundary from "../../ErrorBoundary";
import AlertPage from "../../modules/alerts/AlertPage";
import SearchDonors from "../donors/SearchDonors";
import {
    ChevronDownIcon,
    BellAlertIcon,
    BellIcon,
} from "@heroicons/react/24/solid";

export function Sidebar() {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(false);
    const [isSearchDonorsPopupOpen, setIsSearchDonorsPopupOpen] =
        React.useState(false);
    const [accordenOpen, setAccordernOpen] = React.useState<number>(0);

    const handleOpen = (value: number) => {
        setAccordernOpen(accordenOpen === value ? 0 : value);
    };
    return (
        <>
            <div className="bg-red-50 h-screen relative w-full max-w-[20rem] flex flex-col  p-4 shadow-xl shadow-blue-gray-900/5">
                <Link to={"/"}>
                    <div className="mb-2 flex items-center gap-4 p-4">
                        <img
                            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                            alt="brand"
                            className="h-8 w-8"
                        />
                        <Typography
                            variant="h5"
                            color="blue-gray"
                            placeholder={""}
                        >
                            BloodConnect
                        </Typography>
                    </div>
                </Link>
                <Accordion
                    open={accordenOpen === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${accordenOpen === 2 ? "rotate-180" : ""}`}
                        />
                    }
                    placeholder={""}
                    title="Alerts"
                >
                    <ListItem
                        className="p-0"
                        selected={accordenOpen === 2}
                        placeholder={""}
                    >
                        <AccordionHeader
                            onClick={() => handleOpen(2)}
                            className="border-b-0 p-3"
                            placeholder={""}
                        >
                            <ListItemPrefix placeholder={""}>
                                <BellAlertIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="mr-auto font-normal"
                                placeholder={""}
                            >
                                Alerts
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0" placeholder={""}>
                            <ListItem
                                onClick={() => setIsAlertPopupOpen(true)}
                                className=" ml-2"
                                placeholder={""}
                            >
                                <ListItemPrefix placeholder={""}>
                                    <BellIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography
                                    placeholder={"Menu"}
                                    variant="small"
                                    className="font-normal"
                                >
                                    Create Blood Alert
                                </Typography>
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <List placeholder={""}>
                    <ListItem placeholder={""}>
                        <ListItemPrefix placeholder={""}>
                            <FontAwesomeIcon icon={faSearch} />
                        </ListItemPrefix>
                        <Typography
                            placeholder={"Menu"}
                            variant="small"
                            className="font-normal"
                            onClick={() => setIsSearchDonorsPopupOpen(true)}
                        >
                            Search Donors
                        </Typography>
                    </ListItem>
                </List>
                <ProfileMenu />
            </div>
            {isAlertPopupOpen && <AlertPage onClose={setIsAlertPopupOpen} />}
            {isSearchDonorsPopupOpen && (
                <ErrorBoundary>
                    <SearchDonors onClose={setIsSearchDonorsPopupOpen} />
                </ErrorBoundary>
            )}
        </>
    );
}
