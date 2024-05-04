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
import {
    faBellSlash,
    faDashboard,
    faEdit,
    faFeed,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import ErrorBoundary from "../../ErrorBoundary";
import AlertPage from "../../modules/alerts/AlertPage";
import SearchDonors from "../donors/SearchDonors";
import {
    ChevronDownIcon,
    BellAlertIcon,
    BellIcon,
} from "@heroicons/react/24/solid";
import CreateAlertForm from "../../modules/alerts/components/CreateAlertForm";

const IndividualSidebarNavLinks = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: faDashboard,
    },
    {
        label: "Alerts",
        path: "/alerts",
        icon: faBellSlash,
    },
    {
        label: "Events",
        path: "/events",
        icon: faEdit,
    },
    {
        label: "Feeds",
        path: "/feeds",
        icon: faFeed,
    },
];

const OrganizationSidebarNavLinks = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: faDashboard,
    },
    {
        label: "Feeds",
        path: "/feeds",
        icon: faFeed,
    },
    {
        label: "Events",
        path: "/events",
        icon: faEdit,
    },
];

const DoctorSidebarNavLinks = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: faDashboard,
    },
    {
        label: "Feeds",
        path: "/feeds",
        icon: faFeed,
    },
    {
        label: "Events",
        path: "/events",
        icon: faEdit,
    },
];

export function Sidebar() {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(false);
    const [isSearchDonorsPopupOpen, setIsSearchDonorsPopupOpen] =
        React.useState(false);
    const [accordenOpen, setAccordernOpen] = React.useState<number>(0);
    const userType = localStorage.getItem("loginType");
    const navigate = useNavigate();

    const navList =
        userType === "individual"
            ? IndividualSidebarNavLinks
            : userType === "organization"
              ? OrganizationSidebarNavLinks
              : DoctorSidebarNavLinks;

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
                <List placeholder={""}>
                    <ListItem
                        onClick={() => setIsAlertPopupOpen(true)}
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
                    {navList.map((link) => (
                        <ListItem
                            key={link.label}
                            onClick={() => {
                                navigate(link.path);
                            }}
                            placeholder={""}
                        >
                            <ListItemPrefix placeholder={""}>
                                <FontAwesomeIcon icon={link.icon} />
                            </ListItemPrefix>
                            <Typography
                                placeholder={"Menu"}
                                variant="small"
                                className="font-normal"
                            >
                                {link.label}
                            </Typography>
                        </ListItem>
                    ))}
                </List>

                <ProfileMenu />
            </div>
            {isAlertPopupOpen && <CreateAlertForm onClose={setIsAlertPopupOpen} />}
            {isSearchDonorsPopupOpen && (
                <ErrorBoundary>
                    <SearchDonors onClose={setIsSearchDonorsPopupOpen} />
                </ErrorBoundary>
            )}
        </>
    );
}
