import { useEffect } from "react"
import { Loader } from 'lucide-react'
import { Routes , Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import { useAuthStore } from "./store/useAuthStore"
import Navbar from "./components/Navbar"
import ProfilePage from "./Pages/ProfilePage"
import { useThemeStore } from "./store/useThemeStore"
import SettingsPage from "./Pages/SettingsPage"
import HomePage from "./Pages/HomePage"


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])


  if(isCheckingAuth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      

      <Routes>
        <Route path="/" element={authUser? <HomePage />: <SignUpPage />} />
        <Route path="/login" element={!authUser? <LoginPage /> : <HomePage />} />
        <Route path="/signup" element={!authUser? <SignUpPage /> : <HomePage />} />
        <Route path="/profile" element={authUser? <ProfilePage /> : <SignUpPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App