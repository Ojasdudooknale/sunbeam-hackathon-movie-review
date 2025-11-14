import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import { login } from '../services/users'


const SignIn = () => {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const { setUser } = useAuth()


    const onLogin = async () => {
        if (email.length == 0) {
            toast.warning('please enter email')
        } else if (password.length == 0) {
            toast.warning('please enter password')
        } else {
            const response = await login(email, password)
            if (response['status'] == 'success') {
                toast.success('login successful')

                // get the token from response and cache it in local storage
                localStorage.setItem('token', response['data']['token'])
                // localStorage.setItem('firstName', response['data']['firstName'])
                // localStorage.setItem('lastName', response['data']['lastName'])

                // set the logged in user information
                setUser({
                    firstName: response['data']['firstName'],
                    lastName: response['data']['lastName'],
                })

                // navigate to the PropertyListing page
                // navigate('/home/properties')
            } else {
                toast.error(response['error'])
            }
        }
    }

    return (
        <>

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div >
                            <label htmlFor="email" className="ml-0 block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
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
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onSubmit={onLogin}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default SignIn









