import { Outlet } from 'react-router-dom'
import DashboardLayout from './layout/DashboardLayout.jsx'

function App() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

export default App
