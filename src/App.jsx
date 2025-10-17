import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Home from './pages/Home'

// Simple auth guard: checks localStorage for a "user" entry
function RequireAuth({ children }) {
  const location = useLocation()
  const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null
  if (!stored) {
    // redirect to login, preserve attempted location in state
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
    </Routes>
  )
}

export default App