import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const NavBar = () => {
    const [theme, setTheme] = useState('light');
    const { user, logout, openLoginModal, openRegisterModal } = useAuth();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

   
    const navLinks = <>
        <li>
            <NavLink to="/" className={({ isActive }) => `font-medium hover:text-green-500 ${isActive ? 'text-green-500 font-bold' : ''}`}>Home</NavLink>
        </li>
        <li>
            <NavLink to="/allvehicles" className={({ isActive }) => `font-medium hover:text-green-500 ${isActive ? 'text-green-500 font-bold' : ''}`}>All Vehicles</NavLink>
        </li>
      
    </>;

    return (
        <div className='sticky top-0 z-50 bg-base-100/90 backdrop-blur-md shadow-sm transition-all duration-300'>
            <div className="navbar container mx-auto px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                            {!user && (
                                <div className='flex flex-col gap-2 mt-2'>
                                     <button onClick={openLoginModal} className="btn btn-success btn-sm text-white">Login</button>
                                     <button onClick={openRegisterModal} className="btn btn-outline btn-success btn-sm">Register</button>
                                </div>
                            )}
                        </ul>
                    </div>
                    
                    <Link to="/" className='flex items-center gap-1 text-xl md:text-2xl font-bold'>
                        <h1 className='text-xl font-semibold '><span className='text-green-500'>travel</span><span className='text-green-400'>Ease</span></h1>
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-6">
                        {navLinks}
                    </ul>
                </div>
                
                <div className="navbar-end gap-2">
                   
                    <label className="swap swap-rotate">
                        <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
                      
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,1,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                      
                        <svg className="swap-off fill-current w-6 h-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,0,8.5,12,3.5,3.5,0,0,0,12,15.5Z"/></svg>
                    </label>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-green-500">
                                <div className="w-10 rounded-full">
                                    <img alt="User" src={user?.photoURL || "https://i.ibb.co/MBtqXQp/user.png"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li className="menu-title px-4 py-2 text-green-600 font-bold">{user?.displayName}</li>
                                
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <div className="divider my-1"></div> 
                                <li><button onClick={logout} className="text-red-500 hover:text-red-600">Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <div className='hidden sm:flex gap-2'>
                            <button onClick={openLoginModal} className="btn btn-success btn-sm text-white px-5">Login</button>
                            <button onClick={openRegisterModal} className="btn btn-outline btn-success btn-sm px-5">Register</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;