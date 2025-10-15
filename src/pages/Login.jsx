import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    // replace with real login
    // eslint-disable-next-line no-console
    console.log('Login', form)
    alert('Logged in (mock)')
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-sky-600">Login</h2>
        <label className="block mb-4">
          <span className="text-sm text-gray-700">Email</span>
          <input name="email" value={form.email} onChange={onChange} className="block w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-sky-400" />
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
