import {
    Typography,
    Input,
    Textarea,
    Select,
    Button,
    Option,
} from "@material-tailwind/react";
import { genders, bloodGroups, AlertDetailsType, LocationType } from "../utils";
import MapWithAutocomplete from "../../../components/utils/Map";
import { ChangeEvent, FormEvent } from "react";

export default function AlertForm({
    alertDetails,
    setAlertDetails,
    handleClose,
    onChangeHandler,
    address,
    setAddress,
    submitAlertDetails,
    setSelectedLocation,
}: {
    alertDetails: AlertDetailsType;
    setAlertDetails: React.Dispatch<React.SetStateAction<AlertDetailsType>>;
    handleClose: () => void;
    onChangeHandler: (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setSelectedLocation: React.Dispatch<React.SetStateAction<LocationType>>;
    submitAlertDetails: (event: FormEvent<HTMLFormElement>) => void;
}) {
    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={submitAlertDetails}>
                <div className="flex flex-col gap-4">
                    <Typography
                        placeholder={"Create Alert"}
                        className="text-lg font-bold"
                    >
                        Create Emergency Alert
                    </Typography>

                    <div className="flex gap-2 mt-2">
                        <Input
                            label="Patient Name"
                            crossOrigin={"origin"}
                            name="patientName"
                            required
                            value={alertDetails.patientName}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Enter Patient Name"
                        />
                        <Input
                            label="Patient Age"
                            crossOrigin={"origin"}
                            name="patientAge"
                            value={alertDetails.patientAge}
                            onChange={onChangeHandler}
                            required
                            type="text"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Enter Patient Age"
                        />
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        <Textarea
                            label="Problem Description"
                            value={alertDetails.problemDescription}
                            name="problemDescription"
                            onChange={onChangeHandler}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div className="flex justify-around gap-2 mt-2">
                        <Input
                            label="Patient Photo"
                            crossOrigin={"origin"}
                            name="patientPhoto"
                            type="file"
                            required
                            onChange={(e) =>
                                setAlertDetails({
                                    ...alertDetails,
                                    patientPhoto: e.target.files?.[0],
                                })
                            }
                        />

                        <Select
                            label="Choose Gender"
                            placeholder="Gender"
                            name="gender"
                            value={alertDetails.gender}
                            onChange={(gender) => {
                                setAlertDetails({
                                    ...alertDetails,
                                    gender: gender ? gender : "",
                                });
                            }}
                        >
                            {genders.map((group) => (
                                <Option key={group} value={group}>
                                    {group}
                                </Option>
                            ))}
                        </Select>

                        <Input
                            label="No. of Donors to Send"
                            crossOrigin={"origin"}
                            name="noOfDonorsToSend"
                            required
                            value={alertDetails.noOfDonorsToSend}
                            onChange={onChangeHandler}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm "
                            type="number"
                        />

                        <Select
                            label="Choose Blood Group"
                            placeholder="Blood Group"
                            value={alertDetails.bloodGroup}
                            name="bloodGroup"
                            onChange={(group) => {
                                setAlertDetails({
                                    ...alertDetails,
                                    bloodGroup: group ? group : "",
                                });
                            }}
                        >
                            {bloodGroups.map((group) => (
                                <Option key={group} value={group}>
                                    {group}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="flex justify-around gap-2 mt-2">
                        <Input
                            label="Date of Requirement"
                            crossOrigin={"origin"}
                            name="dateOfRequirement"
                            value={alertDetails.dateOfRequirement}
                            onChange={onChangeHandler}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            type="date"
                            placeholder="Enter Alert Date"
                        />
                        <Input
                            label="Time of Requirement"
                            crossOrigin={"origin"}
                            name="expiryTime"
                            value={alertDetails.expiryTime}
                            onChange={onChangeHandler}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            type="time"
                            placeholder="Enter Alert Time"
                        />
                    </div>
                    <MapWithAutocomplete
                        setSelectedLocation={setSelectedLocation}
                        setAddress={setAddress}
                        address={address}
                    />
                </div>
                <div className=" flex gap-2 justify-evenly">
                    <Button
                        placeholder={""}
                        title="Create Alert"
                        type="submit"
                        color="green"
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
            </form>
        </div>
    );
}
