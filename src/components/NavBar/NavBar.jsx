import React from 'react';
import { NavLink, Link } from 'react-router-dom'; 

const NavBar = () => { 
    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-green-500 ${isActive ? 'border-b-2 border-green-500' : ''}`
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/allvehicles"
                className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-green-500 ${isActive ? 'border-b-2g border-green-500' : ''}`
                }
            >
                All Vehicles
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/addvehicles"
                className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-green-500 ${isActive ? 'border-b-2 border-green-500' : ''}`
                }
            >
                Add Vehicle
            </NavLink>
            
        </li>
        <li>
            <NavLink
                to="/myvehicles"
                className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-green-500 ${isActive ? 'border-b-2 border-green-500' : ''}`
                }
            >
                My Vehicles 
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/mybookings"
                className={({ isActive }) =>
                    `flex items-center gap-2 m-2 hover:border-b-2 hover:border-green-500 ${isActive ? 'border-b-2 border-green-500' : ''}`
                }
            >
                My Bookings
            </NavLink>
        </li>
    </>;

  

    return (
        <div className=''>
            <div className="navbar bg-base-100 shadow-sm px-5">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-gray-500">
                            {links}
                        </ul>
                    </div>
                    <div className='mx-5 '>
                        <Link
                            to="/"
                            className='flex items-center justify-around gap-2'
                        >
                            <h1 className='text-xl font-semibold '><span className='text-green-500'>travel</span><span className='text-green-400'>Ease</span></h1>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className=" menu menu-horizontal px-1 text-gray-500">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end gap-2">
                  <button className="btn btn-success"><span className='text-white'>Login</span></button>
                  <button className="btn btn-success"><span className='text-white'>Register</span></button>
                </div>
            </div>
        </div>
    );
}; 

export default NavBar;