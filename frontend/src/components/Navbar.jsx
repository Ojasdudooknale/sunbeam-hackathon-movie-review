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
            <div className='container-fluid'>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <Link to='movies' className="navbar-brand">Movie Reviews</Link>
                        <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to='movies' aria-current="page" href="#">All Movies</Link>
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
                            <button className="btn text-warning" type="submit" onClick={onLogout}>Logout</button>
                        </div>
                    </div>
                </nav>
            </div>

        </div>

    )
}

export default Navbar
