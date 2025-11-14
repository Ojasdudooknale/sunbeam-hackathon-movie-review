import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import MovieListing from './pages/MovieListing'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AddReview from './pages/AddReview'
import AllReviews from './pages/AllReviews'
import MyReview from './pages/Myreview'


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

          <Route
            path='home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route
              path='movies'
              element={<MovieListing />}
            />
            <Route
              path='my-reviews'
              element={<MyReview />}

            />
            <Route
              path='share-reviews'
            //element={<PropertyDetails />}
            />
            <Route
              path='add-review/:movieId'
              element={<AddReview />}
            />
            <Route
              path='all-reviews'
              element={<AllReviews />}
            />
            <Route
              path='edit'
            //element={<Cart />}
            />
            <Route
              path='change-pass'
            //element={<AboutUs />}
            />
            {/* <Route
              path='contact-us'
              element={<ContactUs />}
            />
            <Route
              path='bookings'
              element={<Bookings />}
            /> */}
          </Route>
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
