import CreateAlertForm from './components/CreateAlertForm'

const AlertPage = ({onClose}:{onClose:React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <CreateAlertForm onClose={onClose}/>   
  )
}

export default AlertPage