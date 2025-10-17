import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  // login form uses username and password for this app
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // read stored user
    const stored = JSON.parse(localStorage.getItem('user') || 'null')
    if (!stored) {
      setError("User doesn't exist. Please sign up first.")
      return
    }

    // validate username & password
    if (form.username === stored.username && form.password === stored.password) {
      // success — navigate to home
      navigate('/home')
    } else {
      setError("User doesn't exist or credentials are incorrect.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-sky-600">Login</h2>
        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
        <label className="block mb-4">
          <span className="text-sm text-gray-700">Username</span>
          <input name="username" value={form.username} onChange={onChange} className="block w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-400" />
        </label>
        <label className="block mb-6">
          <span className="text-sm text-gray-700">Password</span>
          <input type="password" name="password" value={form.password} onChange={onChange} className="block w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-400" />
        </label>
        <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition">Sign in</button>
      </form>
    </div>
  )
}

export default Login
