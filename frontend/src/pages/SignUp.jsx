import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/users'
import { toast } from 'react-toastify'

const SignUp = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [birthDate, setBirthDate] = useState(null)

    const navigate = useNavigate()

    // Modify onRegister to accept the event object
    const onRegister = async (e) => {
        // Prevent default form submission behavior
        e.preventDefault();

        console.log(
            firstName,
            lastName,
            email,
            password,
            mobileNo,
            birthDate
        );
        if (firstName.length == 0) {
            toast.warning('please enter first name')
        } else if (lastName.length == 0) {
            toast.warning('please enter last name')
        } else if (email.length == 0) {
            toast.warning('please enter email')
        } else if (mobileNo.length == 0) {
            toast.warning('please enter phone number')
        } else if (password.length == 0) {
            toast.warning('please enter password')
        } else if (confirmPassword.length == 0) {
            toast.warning('please confirm password')
        } else if (password != confirmPassword) {
            toast.warning('password does not match')
        } else {
            console.log(
                firstName,
                lastName,
                email,
                password,
                mobileNo,
                birthDate
            );

            const response = await register(
                firstName,
                lastName,
                email,
                password,
                mobileNo,
                birthDate
            )
            if (response && response['status'] === 'success') { // Added null check for response
                toast.success('Successfully registered user')
                navigate('/login') // Navigating to login after success
            } else {
                toast.error(response ? response['error'] : 'Registration failed. Check server status.')
            }
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign up
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* Add onSubmit handler to the form */}
                    <form onSubmit={onRegister} className="space-y-6">

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                                    First Name
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                                    Last Name
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={(e) => {
                                        setLastName(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email Address
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="mobileno" className="block text-sm/6 font-medium text-gray-900">
                                    Mobile number
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="mobileno"
                                    name="mobileno"
                                    type="text"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={(e) => {
                                        setMobileNo(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="date" className="block text-sm/6 font-medium text-gray-900">
                                    Date
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={(e) => {
                                        setBirthDate(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            {/* The button type can now be "submit" again as the form handler manages the action */}
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignUp
