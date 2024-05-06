import React from "react";
type DashboardContextType = object;

export const DashboardContext = React.createContext<DashboardContextType>({
    getUserDashboard: async () => {},
});

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const contextValue: DashboardContextType = {};
    

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
};
