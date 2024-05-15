import { Dialog } from "@material-tailwind/react";
import { OrganizationType } from "../types";

export default function OrganizationDetailsPopup({
    open,
    setOpen,
    organization,
}:{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    organization: OrganizationType | null;
}) {
    const handleOpen = () => setOpen(!open);
  return (
    <>
        {organization && <Dialog
            placeholder={""}
            open={open}
            handler={handleOpen}
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
        >
            {JSON.stringify(organization)}
        </Dialog>}
    
    </>
  )
}
