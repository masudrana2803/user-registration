import React, { useState, useRef } from 'react'
import { MdDoneAll } from "react-icons/md";
import { useNavigate } from 'react-router'

const Login = () => {
  // State for username and password inputs
  const [form, setForm] = useState({ username: '', password: '' })
  // State to store error messages
  const [error, setError] = useState('')
  // State for controlling the toast notification visibility and text
  const [notification, setNotification] = useState({ text: '', visible: false })
  // Ref to keep track of timeout for hiding the toast automatically
  const hideTimeout = useRef(null)
  // Hook to navigate programmatically between routes
  const navigate = useNavigate()

  // Update form values when input changes
  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) // dynamic field update
    setError('') // clear any previous error when user types
  }

  // Function to show toast message
  const showToast = (text) => {
    setNotification({ text, visible: true }) // make toast visible
    if (hideTimeout.current) clearTimeout(hideTimeout.current) // clear existing timeout if any
    // hide toast automatically after 3 seconds
    hideTimeout.current = setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), 3000)
  }

  // Handle form submission for login
  const onSubmit = (e) => {
    e.preventDefault() // prevent default form reload behavior

    // Get stored user data from localStorage
    const stored = JSON.parse(localStorage.getItem('user') || 'null')

    // If no user is stored, show an error
    if (!stored) {
      setError("User doesn't exist. Please sign up first.")
      return
    }

    // If username and password match, login success
    if (form.username === stored.username && form.password === stored.password) {
      showToast('Login successful!') // show success toast
      setTimeout(() => navigate('/home'), 1000) // wait 1 second before redirecting to /home
    } else {
      // Wrong credentials case
      setError("User doesn't exist or credentials are incorrect.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-6">
      {/* Login form container */}
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-sky-600">Login</h2>

        {/* Show error message if exists */}
        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        {/* Username field */}
        <label className="block mb-4">
          <span className="text-sm text-gray-700">Username</span>
          <input
            name="username"
            value={form.username}
            onChange={onChange}
            className="block w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-400"
          />
        </label>

        {/* Password field */}
        <label className="block mb-6">
          <span className="text-sm text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            className="block w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-400"
          />
        </label>

        {/* Submit button */}
        <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition">
          Log in
        </button>
      </form>

      {/* Slide-in toast notification (top-right corner) */}
      <div
        className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ${
          notification.visible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
        }`}
      >
        {/* Toast content box */}
        <div className="bg-sky-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
          <MdDoneAll className="h-5 w-5" /> {/* Done icon */}
          <span className="text-sm">{notification.text}</span> {/* Toast message text */}
        </div>
      </div>
    </div>
  )
}

export default Login
