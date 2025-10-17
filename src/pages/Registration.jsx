import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { CiUser, CiMail } from "react-icons/ci";
import { MdDoneAll } from "react-icons/md";
import { useNavigate } from 'react-router'

const EyeButton = ({ onClick, isVisible }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
  >
    {isVisible ? (<AiOutlineEyeInvisible className="h-5 w-5" /> ) : 
    ( <AiOutlineEye className="h-5 w-5" /> )}
  </button>
)

const Registration = () => {
  // form state (controlled inputs)
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  // show/hide password toggles
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  // per-field validation errors, e.g. { username: 'Required', email: '' }
  const [errors, setErrors] = useState({})

  // handle input changes and clear the specific field error when user types
  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // SPA navigation helper
  const navigate = useNavigate()

  // form submit with basic validation; sets per-field errors so UI can highlight them
  const onSubmit = (e) => {
    e.preventDefault()
    // reset previous errors
    const newErrors = {}

    // required checks
    if (!form.username) newErrors.username = 'Username is required'
    if (!form.email) newErrors.email = 'Email is required'
    if (!form.password) newErrors.password = 'Password is required'
    if (!form.confirm) newErrors.confirm = 'Please confirm your password'

    // additional rules
    if (form.password && form.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (form.password && form.confirm && form.password !== form.confirm) newErrors.confirm = 'Passwords do not match'

    // if there are validation errors, set them and bail out
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }

    // For now just log — replace with real submit logic (API call)
    // eslint-disable-next-line no-console
    console.log('Register', form)
    // persist user credentials locally (simple demo — don't store plain passwords in production)
    const user = { username: form.username, email: form.email, password: form.password }
    localStorage.setItem('user', JSON.stringify(user))
    // show slide-in toast
    setNotification({ text: 'Registration successful — please login', visible: true })
    if (hideTimeout.current) clearTimeout(hideTimeout.current)
    hideTimeout.current = setTimeout(() => setNotification(prev => ({ ...prev, visible: false })), 3000)
    // clear form and navigate to login
    setForm({ username: '', email: '', password: '', confirm: '' })
    setErrors({})
    navigate('/login')
  }

  // Notification state + timeout ref for auto-hide
  const [notification, setNotification] = useState({ text: '', visible: false })
  const hideTimeout = useRef(null)

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create an account</h2>


        {/* Username */}
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
              className={`flex-1 py-2 pr-3 pl-0 focus:outline-none ${errors.username ? 'border-red-500' : ''}`}
              placeholder="Your username"
            />
          </div>
      {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
        </label>

        {/* Email */}
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
              className={`flex-1 py-2 pr-3 pl-0 focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
              placeholder="you@example.com"
            />
          </div>
      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </label>

        {/* Password */}
        <label className="block mb-4 relative">
          <span className="text-sm font-medium text-gray-700">Password</span>
          <div className="mt-1 relative">
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type={showPassword ? 'text' : 'password'}
              className={`block w-full py-2 border rounded-md focus:outline-none ${errors.password ? 'border-red-500 ring-red-500' : 'focus:ring-2 focus:ring-blue-400'}`}
              placeholder="Enter password"
            />
            <EyeButton onClick={() => setShowPassword(v => !v)} isVisible={showPassword} className="absolute right-2 top-1/2 transform -translate-y-1/2"
 />
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </label>

        {/* Confirm Password */}
        <label className="block mb-6 relative">
          <span className="text-sm font-medium text-gray-700">Confirm Password</span>
          <div className="mt-1 relative">
            <input
              name="confirm"
              value={form.confirm}
              onChange={onChange}
              type={showConfirm ? 'text' : 'password'}
              className={`block w-full pr-10 py-2 border rounded-md focus:outline-none ${errors.confirm ? 'border-red-500 ring-red-500' : 'focus:ring-2 focus:ring-blue-400'}`}
              placeholder="Re-enter password"
            />
            <EyeButton onClick={() => setShowConfirm(v => !v)} isVisible={showConfirm} />
          </div>
          {errors.confirm && <p className="mt-1 text-sm text-red-600">{errors.confirm}</p>}
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center text-sm text-gray-700">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-sky-600 hover:text-sky-700 font-medium ml-1"
          >
            Login
          </button>
        </div>
      </form>
      {/* Slide-in toast (top-right) */}
      <div
        className={`fixed top-6 right-6 z-50 transform transition-all duration-200 ${notification.visible ? 'translate-x-0 opacity-100' : 'translate-x-40 opacity-0'}`}
      >
        <div className="bg-sky-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
            <MdDoneAll className="h-5 w-5" />
          <span className="text-sm">{notification.text}</span>
        </div>
      </div>
    </div>
  )
}

export default Registration