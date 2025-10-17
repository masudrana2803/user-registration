import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { CiUser, CiMail } from "react-icons/ci";
import { MdDoneAll } from "react-icons/md";
import { useNavigate } from 'react-router'

// Reusable button for toggling password visibility
const EyeButton = ({ onClick, isVisible }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
  >
    {/* Toggle between visible and hidden eye icons */}
    {isVisible ? (<AiOutlineEyeInvisible className="h-5 w-5" />) : (<AiOutlineEye className="h-5 w-5" />)}
  </button>
)

const Registration = () => {
  // Controlled input form data
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  // Visibility toggles for password fields
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  // Validation errors for each input field
  const [errors, setErrors] = useState({})
  // Toast notification state (message and visibility)
  const [notification, setNotification] = useState({ text: '', visible: false })
  // Timeout reference to hide toast automatically
  const hideTimeout = useRef(null)
  // React Router navigation hook
  const navigate = useNavigate()

  // Update form state and reset individual field error
  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value })) // dynamically update based on field name
    setErrors(prev => ({ ...prev, [name]: '' })) // clear the field-specific error
  }

  // Function to display the toast message
  const showToast = (text) => {
    setNotification({ text, visible: true }) // make toast visible with text
    if (hideTimeout.current) clearTimeout(hideTimeout.current) // clear existing timeout if running
    hideTimeout.current = setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), 3000) // hide toast after 3s
  }

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault() // prevent page reload
    const newErrors = {} // temporary object for validation errors

    // Basic required checks
    if (!form.username) newErrors.username = 'Username is required'
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.password) newErrors.password = 'Password is required'
    if (!form.confirm) newErrors.confirm = 'Please confirm your password'

    // Additional validation rules
    if (form.password && form.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (form.password && form.confirm && form.password !== form.confirm) newErrors.confirm = 'Passwords do not match'

    // If any validation errors exist, set them and stop form submission
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    // Store user data locally (demo only — not for production)
    const user = { username: form.username, email: form.email, password: form.password }
    localStorage.setItem('user', JSON.stringify(user))

    // Show success toast before redirect
    showToast('Registration successful — please login')

    // Clear form fields
    setForm({ username: '', email: '', password: '', confirm: '' })
    setErrors({})

    // Delay navigation slightly so toast can appear
    setTimeout(() => navigate('/login'), 1000)
  }

  // Cleanup timeout on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      {/* Registration form container */}
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Create an account</h2>

        {/* Username field */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Username</span>
          <div className={`mt-1 flex items-center border rounded-md focus-within:ring-2 ${errors.username ? 'border-red-500 ring-red-500' : 'focus-within:ring-blue-400'}`}>
            <div className="pl-3 pr-2 text-gray-400">
              <CiUser className="h-5 w-5" />
            </div>
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              className="flex-1 py-2 pr-3 pl-0 focus:outline-none"
              placeholder="Your username"
            />
          </div>
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
        </label>

        {/* Email field */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <div className={`mt-1 flex items-center border rounded-md focus-within:ring-2 ${errors.email ? 'border-red-500 ring-red-500' : 'focus-within:ring-blue-400'}`}>
            <div className="pl-3 pr-2 text-gray-400">
              <CiMail className="h-5 w-5" />
            </div>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              className="flex-1 py-2 pr-3 pl-0 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </label>

        {/* Password field */}
        <label className="block mb-4 relative">
          <span className="text-sm font-medium text-red-700">Password</span>
          <div className="mt-1 relative">
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              className={`block w-full py-2 border rounded-md focus:outline-none ${errors.password ? 'border-red-500 ring-red-500' : 'focus:ring-2 focus:ring-blue-400'}`}
              placeholder="Enter password"
            />
            {/* Eye toggle button for password */}
            <EyeButton onClick={() => setShowPassword(v => !v)} isVisible={showPassword} />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </label>

        {/* Confirm Password field */}
        <label className="block mb-6 relative">
          <span className="text-sm font-medium text-gray-700">Confirm Password</span>
          <div className="mt-1 relative">
            <input
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              type={showConfirm ? 'text' : 'password'}
              className={`block w-full py-2 border rounded-md focus:outline-none ${errors.confirm ? 'border-red-500 ring-red-500' : 'focus:ring-2 focus:ring-blue-400'}`}
              placeholder="Re-enter password"
            />
            {/* Eye toggle button for confirm password */}
            <EyeButton onClick={() => setShowConfirm(v => !v)} isVisible={showConfirm} />
          </div>
          {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>}
        </label>

        {/* Submit button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Sign Up
        </button>

        {/* Navigation to Login page */}
        <div className="mt-4 text-center text-sm text-gray-700">
          <span>Already have an account?</span>
          <button type="button" onClick={() => navigate('/login')} className="text-sky-600 hover:text-sky-700 font-medium ml-1">
            Login
          </button>
        </div>
      </form>

      {/* Slide-in toast (top-right corner) */}
      <div
        className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ${notification.visible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
      >
        <div className="bg-sky-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
          <MdDoneAll className="h-5 w-5" /> {/* success icon */}
          <span className="text-sm">{notification.text}</span> {/* toast message */}
        </div>
      </div>
    </div>
  )
}

export default Registration
