import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import Registration from './pages/Registration'
import Login from './pages/Login'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App