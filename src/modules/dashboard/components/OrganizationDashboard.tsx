import React from 'react'
import { DashboardContext } from '../../../context/DashboardContext';

const OrganizationDashboard = () => {
  const {getUserDashboard} = React.useContext(DashboardContext)
  const [userDashboard,setUserDashboard] = React.useState<unknown>(null)
  React.useEffect(() => {
    const getUserDashboardFunc = async () => {
      const userData = await getUserDashboard();
      console.log(userData);
      setUserDashboard(userData)
    }
    getUserDashboardFunc()
  }, []);
  return (
    <div>OrganizationDashboard{JSON.stringify(userDashboard)}</div>
  )
}

export default OrganizationDashboard