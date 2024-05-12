import { Typography, Checkbox, Avatar, Button } from "@material-tailwind/react";
import { NearbyDonorType } from "../utils";

export default function UsersListView({
    nearByUsers,
    selectedUsers,
    setSelectedUsers,
    submitSelectedDonors,
    handleClose,
}: {
    nearByUsers: NearbyDonorType[];
    selectedUsers: NearbyDonorType[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<NearbyDonorType[]>>;
    submitSelectedDonors: () => void;
    handleClose: () => void;
}) {
    return (
        <div>
            <div className="flex flex-col gap-4 mt-2">
                <Typography
                    placeholder={"Create Alert"}
                    className="text-lg font-bold"
                >
                    Nearby Users
                </Typography>
                {nearByUsers.length > 0 && (
                    <div className="flex flex-col gap-4 mt-2">
                        <Checkbox
                            ripple={false}
                            label={"Select All"}
                            checked={
                                selectedUsers.length === nearByUsers.length
                            }
                            onClick={() => {
                                if (
                                    selectedUsers.length === nearByUsers.length
                                ) {
                                    setSelectedUsers([]);
                                } else {
                                    setSelectedUsers(nearByUsers);
                                }
                            }}
                            placeholder={""}
                            crossOrigin={"origin"}
                        />
                    </div>
                )}
                <div className="flex flex-col gap-4 mt-2">
                    {nearByUsers?.map((user: NearbyDonorType) => (
                        <div className="flex gap-2 mt-2">
                            <Checkbox
                                checked={selectedUsers.includes(user)}
                                ripple={false}
                                onClick={() => {
                                    if (selectedUsers.includes(user)) {
                                        setSelectedUsers(
                                            selectedUsers.filter(
                                                (user) => user !== user
                                            )
                                        );
                                    } else {
                                        setSelectedUsers([
                                            ...selectedUsers,
                                            user,
                                        ]);
                                    }
                                }}
                                placeholder={""}
                                crossOrigin={"origin"}
                            />
                            <Avatar
                                placeholder={"Avatar"}
                                src={user.avatar}
                                alt={user.fullName}
                                className="w-[50px] h-[50px]"
                            />
                            <div className="flex flex-col gap-2">
                                <Typography
                                    placeholder={"Name"}
                                    className="text-sm font-normal"
                                >
                                    {user.fullName}
                                </Typography>
                                <Typography
                                    placeholder={"Email"}
                                    className="text-sm font-normal"
                                >
                                    {user.email}
                                </Typography>
                            </div>
                        </div>
                    ))}
                    <div className=" flex gap-2 justify-evenly">
                        <Button
                            placeholder={""}
                            title="Create Alert"
                            type="submit"
                            color="green"
                            onClick={submitSelectedDonors}
                        >
                            Create Alert
                        </Button>
                        <Button
                            placeholder={""}
                            title="Cancel"
                            color="blue-gray"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
