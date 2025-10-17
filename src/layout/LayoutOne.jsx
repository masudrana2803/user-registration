import React from 'react'
import { Outlet } from 'react-router'

const LayoutOne = () => {
  return (
    <div>
        <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">My Application</h1>
        </header>

        <Outlet/>
        {/*  */}
        {/* <main className="p-4"> */}
            {/* Main content will be rendered here */}
        {/* </main> */}
        <footer className="bg-gray-200 text-center p-4 mt-4">
            <p className="text-sm text-gray-600">&copy; 2024 My Application. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default LayoutOne