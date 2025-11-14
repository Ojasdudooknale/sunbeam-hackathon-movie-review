import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
// import { useSelector } from 'react-redux'

function Navbar() {
    // get the reference of navigate function
    const navigate = useNavigate()

    // get setUser from AuthContext
    const { setUser } = useAuth()

    // get the properties from cart (Redux functionality, currently commented out)
    // const properties = useSelector((store) => store.cart.properties)

    const onLogout = () => {
        // remove all the cached items
        localStorage.removeItem('token')
        localStorage.removeItem('firstName')
        localStorage.removeItem('lastName')

        // set the user to null in the authentication provider
        setUser(null)

        // redirect to the Login page using React Router's navigate function
        navigate('/login')
    }

    return (
        <div className='container-fluid'>
            {/* Using className for React, using bg-dark theme for better visibility */}
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to='movies' className="navbar-brand">Movie Reviews</Link>

                    {/* FIXED: Added data-bs-toggle and data-bs-target attributes */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* Adjusted 'to' paths to be relative to the current /home route */}
                                <Link className="nav-link active" to='movies' aria-current="page">All Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="my-reviews">My Reviews</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="share-reviews">Shared with me</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="all-reviews">All Reviews</Link>
                            </li>
                        </ul>
                        <div className="d-flex gap-4 align-items-center">
                            <Link to="edit" className='nav-link'>Edit Profile</Link>
                            <Link to='change-pass' className='nav-link'>Change Password</Link>
                            {/* Changed type="submit" to type="button" for logout button */}
                            <button className="btn text-warning" type="button" onClick={onLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
