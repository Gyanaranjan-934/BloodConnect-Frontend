import React from "react";
type AlertContextType = object;

export const AlertContext = React.createContext<AlertContextType>({});

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const contextValue: AlertContextType = {};

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
        </AlertContext.Provider>
    );
};
