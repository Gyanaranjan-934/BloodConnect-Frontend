import { Avatar } from "@material-tailwind/react";
import userImage from "../../assets/user.png";
export default function About() {
    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                About Our Blood Donation System
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                Our blood donation management system is designed
                                to efficiently coordinate and streamline the
                                process of blood collection, storage, and
                                distribution. With advanced features and a
                                user-friendly interface, we aim to make blood
                                donation more accessible and impactful.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Our Mission
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Our mission is to create a comprehensive blood
                                donation management system that streamlines the
                                entire process, from donor registration to blood
                                distribution. We aim to increase blood
                                availability, improve donor experience, and
                                ensure efficient allocation to those in need.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                How It Works
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                1. Donor Registration: Individuals can easily
                                register as blood donors through our
                                user-friendly platform.
                                <br />
                                2. Appointment Scheduling: Donors can
                                conveniently schedule appointments at our
                                collection centers.
                                <br />
                                3. Blood Collection: Our trained staff collect
                                and process the donated blood, ensuring the
                                highest standards of safety and quality.
                                <br />
                                4. Blood Storage and Distribution: The collected
                                blood is stored and distributed to hospitals and
                                medical facilities in need, optimizing supply
                                and demand.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center">
                <div className="container px-4 md:px-6">
                    <div className="space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            Meet the Team
                        </h2>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Our dedicated team of developers and administrators
                            work tirelessly to ensure the success of our blood
                            donation management system.
                        </p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div className="flex flex-col items-center space-y-3">
                            <Avatar
                                title="Gyanaranjan Sahoo"
                                src={userImage}
                                placeholder={""}
                            />

                            <div className="space-y-1 text-center">
                                <h3 className="text-lg font-medium">
                                    John Doe
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Lead Developer
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-3">
                            <Avatar
                                title="Gyanaranjan Sahoo"
                                src={userImage}
                                placeholder={""}
                            />
                            <div className="space-y-1 text-center">
                                <h3 className="text-lg font-medium">
                                    Sarah Miller
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Project Manager
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-3">
                            <Avatar
                                title="Gyanaranjan Sahoo"
                                src={userImage}
                                placeholder={""}
                            />
                            <div className="space-y-1 text-center">
                                <h3 className="text-lg font-medium">
                                    Tom Wilson
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    UI/UX Designer
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-3">
                            <Avatar
                                title="Gyanaranjan Sahoo"
                                src={userImage}
                                placeholder={""}
                            />
                            <div className="space-y-1 text-center">
                                <h3 className="text-lg font-medium">
                                    Lisa Brown
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Operations Manager
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
