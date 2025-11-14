import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Home() {
    return (
        <div>
            <Navbar />

            {/* this is a placeholder to load all child components */}
            <Outlet />

           
            {/* <footer className='footer'>
        <div>Copyrights to Sunbeam @2025</div>
      </footer> */}
        </div>
    )
}

export default Home
