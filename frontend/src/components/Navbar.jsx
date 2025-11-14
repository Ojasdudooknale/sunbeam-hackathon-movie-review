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
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <Link to='home/movies' className="navbar-brand">Movie Reviews</Link>
                        <button class="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link active" to='home/movies' aria-current="page" href="#">All Movies</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="home/my-reviews">My Reviews</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="home/share-reviews">Shared with me</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="all-reviews">All Reviews</Link>
                            </li>
                        </ul>
                        <div class="d-flex gap-4 align-items-center">
                            <Link to="edit" className='nav-link'>Edit Profile</Link>
                            <Link to='change-pass' className='nav-link'>Change Password</Link>
                            <button class="btn text-warning" type="submit" onClick={onLogout}>Logout</button>
                        </div>
                    </div>
                </nav>
            </div>

        </div>

    )
}

export default Navbar
