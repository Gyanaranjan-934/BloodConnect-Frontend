import { Typography, Button } from "@material-tailwind/react";
import React from "react";

function DashboardHeader({
    setIsAlertPopupOpen,
}:{
    setIsAlertPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className="flex justify-center w-full relative border-b border-gray-300 p-4">
            <Typography
                variant="h1"
                placeholder={""}
                color="blue-gray"
                className="text-3xl"
            >
                Dashboard
            </Typography>
            <div className="absolute z-14 right-10 top-auto">
                <Button
                    placeholder={""}
                    title="Create Event"
                    color="blue-gray"
                    onClick={() => setIsAlertPopupOpen(true)}
                >
                    Blood Report
                </Button>
            </div>
        </div>
    );
}

export default DashboardHeader;
