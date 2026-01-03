import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaCar, FaCalendarCheck, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        bookingCount: 0,
        vehicleCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            const fetchData = async () => {
                try {
                   // count bookings
                    const bookingsRes = await axios.get(`https://travel-ease-server-self.vercel.app/bookings?email=${user.email}`);
                    
                    // count vehicles
                    const vehiclesRes = await axios.get(`https://travel-ease-server-self.vercel.app/cars/user/${user.email}`);

                    setStats({
                        bookingCount: bookingsRes.data.length,
                        vehicleCount: vehiclesRes.data.length
                    });
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching dashboard data:", error);
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen bg-base-100">
           
            <div className="mb-10">
                <h2 className="text-3xl font-bold">
                    Welcome back, <span className="text-green-500">{user?.displayName}!</span>
                </h2>
                <p className="text-gray-500 mt-2">Here is an overview of your activity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Profile*/}
                <div className="card bg-base-200 shadow-xl h-fit">
                    <div className="card-body items-center text-center">
                        <div className="avatar mb-4">
                            <div className="w-24 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/MBtqXQp/user.png"} alt="Profile" />
                            </div>
                        </div>
                        <h2 className="card-title text-2xl">{user?.displayName}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                        
                        <div className="divider"></div>
                        
                        <div className="w-full text-left space-y-3">
                            <div className="flex items-center gap-3">
                                <FaUser className="text-green-500" />
                                <span className="font-semibold">User ID:</span> 
                                <span className="text-xs opacity-70 truncate">{user?.uid}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaCalendarCheck className="text-green-500" />
                                <span className="font-semibold">Joined:</span> 
                                <span className="text-sm">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats*/}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Stats box */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="stats shadow bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                            <div className="stat">
                                <div className="stat-figure text-blue-100">
                                    <FaCalendarCheck className="text-4xl opacity-80" />
                                </div>
                                <div className="stat-title text-blue-100">Total Bookings</div>
                                <div className="stat-value">{stats.bookingCount}</div>
                                <div className="stat-desc text-blue-100">Trips scheduled</div>
                                <div className="stat-actions mt-2">
                                    <Link to="/dashboard/mybookings" className="btn btn-sm btn-ghost bg-white/20 border-0 text-white">View History</Link>
                                </div>
                            </div>
                        </div>

                        
                        <div className="stats shadow bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                            <div className="stat">
                                <div className="stat-figure text-orange-100">
                                    <FaCar className="text-4xl opacity-80" />
                                </div>
                                <div className="stat-title text-orange-100">My Vehicles</div>
                                <div className="stat-value">{stats.vehicleCount}</div>
                                <div className="stat-desc text-orange-100">Cars listed for rent</div>
                                <div className="stat-actions mt-2">
                                    <Link to="/dashboard/myvehicles" className="btn btn-sm btn-ghost bg-white/20 border-0 text-white">Manage Cars</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                  
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Quick Actions</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/dashboard/addvehicle" className="btn btn-outline btn-success gap-2">
                                    <FaCar /> Add New Vehicle
                                </Link>
                                <Link to="/dashboard/allvehicles" className="btn btn-outline btn-info gap-2">
                                    <FaCalendarCheck /> Book a Ride
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="alert alert-info bg-indigo-100 border-indigo-200 text-indigo-800">
                        <FaEdit />
                        <div>
                            <h3 className="font-bold">Did you know?</h3>
                            <div className="text-xs">You can update your listed vehicles' price and availability from the "My Vehicles" page anytime!</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;