import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import donationIcon1 from "../assets/donationIcon1.jpg";
import donationIcon2 from "../assets/donation1.png";
export const Home = (): ReactElement => {
    return (
        <div className="flex justify-center flex-col ">
            <div className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Donate Blood, Save Lives
                                    </h1>
                                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                        Our blood donation management system
                                        makes it easy to register, schedule
                                        appointments, and organize blood drives.
                                        Join us in our mission to ensure a
                                        reliable supply of blood for those in
                                        need.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-red-500 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-300 dark:focus-visible:ring-red-500"
                                        to="#"
                                    >
                                        Donate Blood
                                    </Link>
                                    <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                        to="#"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                            <img
                                alt="Hero"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                                height="550"
                                src={donationIcon1}
                                width="550"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                    Key Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                    Streamline Your Blood Donation Process
                                </h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Our platform provides a comprehensive
                                    solution for managing blood donations, from
                                    donor registration to appointment scheduling
                                    and blood drive organization.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <div className="flex flex-col justify-center space-y-4">
                                <ul className="grid gap-6">
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                Donor Registration
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Easily register new donors and
                                                maintain their profiles.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                Appointment Scheduling
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Allow donors to conveniently
                                                schedule their blood donation
                                                appointments.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">
                                                Blood Drive Organization
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400">
                                                Coordinate and promote blood
                                                drives to ensure a reliable
                                                supply of blood.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <img
                                alt="Image"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                                height="310"
                                src={donationIcon2}
                                width="550"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center">
                    <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                Join the Movement to Save Lives
                            </h2>
                            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Our blood donation management system empowers
                                individuals and organizations to make a real
                                difference in their communities. Sign up today
                                and start saving lives.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md bg-red-500 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-red-400 dark:text-gray-900 dark:hover:bg-red-300 dark:focus-visible:ring-red-500"
                                to="#"
                            >
                                Donate Blood
                            </Link>
                            <Link
                                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                                to="#"
                            >
                                Organize a Blood Drive
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 Blood Donation. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        to="#"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4"
                        to="#"
                    >
                        Terms of Service
                    </Link>
                </nav>
            </div>
        </div>
    );
};
