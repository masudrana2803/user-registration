import React from 'react'

// Single Home component
const Home = () => {
  const stored = JSON.parse(localStorage.getItem('user') || 'null')
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome{stored ? `, ${stored.username}` : ''}!</h1>
        <p className="text-gray-600">You have successfully signed in to the Home page.</p>
      </div>
    </div>
  )
}

export default Home
