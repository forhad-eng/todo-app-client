import { signOut } from 'firebase/auth'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useLocation } from 'react-router-dom'
import { auth } from '../../Firebase/firebase.init'

const Navbar = () => {
    const [user] = useAuthState(auth)
    const { pathname } = useLocation()

    const menuItem = (
        <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/add-task">Add Task</Link>
            </li>
            {user && (
                <li>
                    <Link to="/my-task">My Task</Link>
                </li>
            )}
            {user ? (
                <li>
                    <button onClick={() => signOut(auth)}>Sign Out</button>
                </li>
            ) : (
                <li>
                    <Link to="/login">Login</Link>
                </li>
            )}
        </>
    )

    return (
        <div>
            <div class="navbar bg-base-100">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabIndex="0" class="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex="0"
                            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {menuItem}
                        </ul>
                    </div>
                    <Link to="/" class="btn btn-ghost normal-case text-xl">
                        My ToDo
                    </Link>
                </div>
                <div class="navbar-end hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">{menuItem}</ul>
                </div>
                {pathname.includes('my-task') && (
                    <div className="navbar-end flex lg:hidden">
                        <label for="task-bar" tabIndex="2" class="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
