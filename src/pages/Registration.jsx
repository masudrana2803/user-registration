import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { CiUser } from "react-icons/ci";
import { useNavigate } from 'react-router'

const EyeButton = ({ onClick, isVisible }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
    aria-label={isVisible ? 'Hide password' : 'Show password'}
  >
    {isVisible ? (<AiOutlineEyeInvisible className="h-5 w-5" /> ) : 
    ( <AiOutlineEye className="h-5 w-5" /> )}
  </button>
)

const Registration = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.username || !form.email || !form.password || !form.confirm) {
      setError('Please fill all fields')
      return
    }
    if (form.password.length < 6) {
      setError('Password should be at least 6 characters')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    // For now just log — replace with real submit logic
    // eslint-disable-next-line no-console
    console.log('Register', form)
    alert('Registration submitted (check console)')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create an account</h2>

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

        {/* Username */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Username</span>
          <div className="mt-1 flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-400">
            <div className="pl-3 pr-2 text-gray-400">
              <CiUser className="h-5 w-5" />
            </div>
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              className="flex-1 py-2 pr-3 pl-0 focus:outline-none"
              placeholder="Your username"
              aria-label="username"
            />
          </div>
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <div className="mt-1 flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-400">
            <div className="pl-3 pr-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.94 6.94A2 2 0 014.12 6h11.76a2 2 0 011.18.34L10 11 2.94 6.94z" />
                <path d="M18 8.12V14a2 2 0 01-2 2H4a2 2 0 01-2-2V8.12l8 4.5 8-4.5z" />
              </svg>
            </div>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              type="email"
              className="flex-1 py-2 pr-3 pl-0 focus:outline-none"
              placeholder="you@example.com"
              aria-label="email"
            />
          </div>
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
              className="block w-full pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              aria-label="password"
            />
            <EyeButton onClick={() => setShowPassword(v => !v)} isVisible={showPassword} />
          </div>
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
              className="block w-full pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Re-enter password"
              aria-label="confirm password"
            />
            <EyeButton onClick={() => setShowConfirm(v => !v)} isVisible={showConfirm} />
          </div>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
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
    </div>
  )
}

export default Registration