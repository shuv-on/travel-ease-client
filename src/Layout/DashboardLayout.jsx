import React, { useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaCar, FaUser, FaCalendarAlt, FaSignOutAlt, FaPlusCircle, FaTachometerAlt, FaTimes } from 'react-icons/fa';

const DashboardLayout = () => {
    const { user, logout } = useAuth();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const sidebarLinks = <>
        <li>
            <NavLink 
                to="/dashboard" 
                end 
                className={({ isActive }) => isActive ? "bg-green-500 text-white font-bold mb-2" : "mb-2"}
            >
                <FaTachometerAlt /> Overview
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/dashboard/profile" 
                className={({ isActive }) => isActive ? "bg-green-500 text-white font-bold mb-2" : "mb-2"}
            >
                <FaUser /> My Profile
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/dashboard/addvehicle" 
                className={({ isActive }) => isActive ? "bg-green-500 text-white font-bold mb-2" : "mb-2"}
            >
                <FaPlusCircle /> Add Vehicle
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/dashboard/myvehicles" 
                className={({ isActive }) => isActive ? "bg-green-500 text-white font-bold mb-2" : "mb-2"}
            >
                <FaCar /> My Vehicles
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/dashboard/mybookings" 
                className={({ isActive }) => isActive ? "bg-green-500 text-white font-bold mb-2" : "mb-2"}
            >
                <FaCalendarAlt /> My Bookings
            </NavLink>
        </li>

        <div className="divider my-4"></div>

        <li>
            <Link to="/" className="mb-2">
                <FaHome className="text-gray-500" /> Go to Home Page
            </Link>
        </li>
        <li>
            <button onClick={logout} className="text-red-500 hover:bg-red-100 hover:text-red-600">
                <FaSignOutAlt /> Logout
            </button>
        </li>
    </>;

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            
           
            <div className="drawer-content flex flex-col bg-base-100 min-h-screen">
               
                <div className="w-full navbar bg-base-100 lg:hidden shadow-sm border-b sticky top-0 z-40">
                    <div className="flex-none">
                        <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-lg font-bold text-green-600">TravelEase Dashboard</div>
                </div>

               
                <div className="p-4 md:p-8 bg-base-200/50 min-h-full">
                    <Outlet />
                </div>
            </div> 
            
         
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
                
                <div className="menu p-4 w-72 min-h-full bg-base-100 text-base-content shadow-xl relative">
                  
                    <label 
                        htmlFor="dashboard-drawer" 
                        className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 lg:hidden z-50"
                    >
                        <FaTimes className="text-lg" />
                    </label>

                   
                    <div className="mb-8 px-2 mt-4 lg:mt-0">
                        <Link to="/" className="text-2xl font-bold">
                            <span className="text-green-500">travel</span><span className="text-green-400">Ease</span>
                        </Link>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">User Dashboard</p>
                    </div>

                   
                    <div className="flex items-start gap-3 mb-8 p-3 bg-base-200 rounded-xl">
                        <div className="avatar mt-1">
                            <div className="w-10 h-10 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-1">
                                <img src={user?.photoURL || "https://i.ibb.co/MBtqXQp/user.png"} alt="user" />
                            </div>
                        </div>
                       
                        <div className="min-w-0 flex-1">
                            <p className="font-bold text-sm truncate">{user?.displayName}</p>
                            <p className="text-xs text-gray-500 break-all whitespace-normal">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                  
                    <ul className="space-y-1">
                        {sidebarLinks}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;