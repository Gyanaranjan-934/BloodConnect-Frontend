import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const NotificationComponent = ({
    isNotificationOpen,
}: {
    isNotificationOpen: boolean;
}) => {
    return (
        <>
            {isNotificationOpen && (
                <ul
                    role="menu"
                    data-popover="notifications-menu"
                    data-popover-placement="bottom"
                    className="absolute right-2 z-10 flex min-w-[300px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none top-full right-0"
                >
                    <button
                        role="menuitem"
                        className="flex items-center w-full gap-4 px-3 py-2 pl-2 pr-8 leading-tight transition-all rounded-md outline-none cursor-pointer select-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                    >
                        <img
                            alt="tania andrew"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                            className="relative inline-block h-12 w-12 !rounded-full object-cover object-center"
                        />
                        <div className="flex flex-col gap-1">
                            <p className="block font-sans text-sm antialiased font-semibold leading-normal text-gray-700">
                                Tania send you a message
                            </p>
                            <p className="flex items-center gap-1 font-sans text-sm antialiased font-medium text-blue-gray-500">
                                <FontAwesomeIcon icon={faClock} />
                                13 minutes ago
                            </p>
                        </div>
                    </button>
                </ul>
            )}
        </>
    );
};

export default NotificationComponent;
