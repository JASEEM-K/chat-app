import { useEffect } from "react"
import { Loader } from 'lucide-react'
import { Routes , Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import { useAuthStore } from "./store/useAuthStore"


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

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

  console.log({ authUser })
  return (
    <div>
      <Routes>
        <Route path="/" element={authUser? <h1>Home</h1>: <SignUpPage />} />
        <Route path="/login" element={!authUser? <LoginPage /> : <h1>Home</h1>} />
        <Route path="/signup" element={!authUser? <SignUpPage /> : <h1>Home</h1>} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App