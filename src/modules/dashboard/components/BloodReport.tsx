import { Button, Typography } from "@material-tailwind/react";
import React from "react";

function BloodReport({
    onClose,
}: {
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [isAlertPopupOpen, setIsAlertPopupOpen] = React.useState(true);
    
    return (
        <div
            className={`fixed inset-0 h-full w-full bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity ease-in duration-500 ${isAlertPopupOpen ? "opacity-100" : "opacity-0"}`}
        >
            <div
                className={`bg-white rounded-lg shadow-md w-[75%] h-min max-h-[90%]  overflow-y-auto p-4 text-center z-10 transform transition-transform ease-in duration-500 ${isAlertPopupOpen ? "scale-100" : "scale-90"}`}
            >
                <div className="flex flex-col gap-6">
                    <div className="flex justify-center items-center">
                        <Typography
                            placeholder={""}
                            variant="h4"
                            color="blue-gray"
                            className="text-3xl"
                        >
                            Blood Report
                        </Typography>
                    </div>
                    <Button
                        placeholder={""}
                        onClick={() => {
                            onClose(false);
                            setIsAlertPopupOpen(false);
                        }}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BloodReport;
