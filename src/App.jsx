import './App.css'
import NavBar from './components/NavBar'
import AppRoutes from './components/AppRoutes'
import { AuthProvider } from './utils/AuthContext'

function App() {

  return (
    <AuthProvider>
        <NavBar></NavBar>
        <AppRoutes></AppRoutes>
    </AuthProvider>
  )
}

export default App
