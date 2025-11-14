import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AuthProvider from './providers/AuthProvider'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
      {/* <SignIn></SignIn> */}
      {/* <SignUp></SignUp> */}
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/login' />}
          />
          <Route
            path='login'
            element={<SignIn />}
          />
          <Route
            path='register'
            element={<SignUp />}
          />

          {/* <Route
            path='home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route
              path='properties'
              element={<PropertyListing />}
            />
            <Route
              path='property-details'
              element={<PropertyDetails />}
            />
            <Route
              path='add-property'
              element={<AddProperty />}
            />
            <Route
              path='cart'
              element={<Cart />}
            />
            <Route
              path='about-us'
              element={<AboutUs />}
            />
            <Route
              path='contact-us'
              element={<ContactUs />}
            />
            <Route
              path='bookings'
              element={<Bookings />}
            />
          </Route> */}
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
