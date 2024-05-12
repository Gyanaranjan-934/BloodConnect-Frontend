import { Typography, Button } from "@material-tailwind/react";

function EventHeader({
    setIsAlertPopupOpen,
}:{
    setIsAlertPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className="flex justify-center relative border-b border-gray-300 p-4">
            <Typography
                variant="h1"
                placeholder={""}
                color="blue-gray"
                className="text-3xl"
            >
                Events
            </Typography>
            <div className="absolute z-10 right-14 top-auto">
                <Button
                    placeholder={""}
                    title="Create Event"
                    color="blue-gray"
                    onClick={() => setIsAlertPopupOpen(true)}
                >
                    Create Event
                </Button>
            </div>
        </div>
    );
}

export default EventHeader;
