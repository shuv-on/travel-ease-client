import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaCar, FaCalendarCheck, FaEdit, FaChartBar } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DynamicTitle from '../../components/DynamicTitle/DynamicTitle';

const Dashboard = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [stats, setStats] = useState({
        bookingCount: 0,
        vehicleCount: 0
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            const fetchData = async () => {
                try {
                    setLoading(true);

                    
                    const bookingsRes = await axios.get(`https://travel-ease-server-self.vercel.app/bookings?email=${user.email}`);
                    
                  
                    const vehiclesRes = await axios.get(`https://travel-ease-server-self.vercel.app/cars`);

                 
                    const myBookings = bookingsRes.data.filter(b => 
                        (b.userEmail && b.userEmail.toLowerCase() === user.email.toLowerCase()) || 
                        (b.email && b.email.toLowerCase() === user.email.toLowerCase())
                    );

                  
                    const myVehicles = vehiclesRes.data.filter(v => 
                        (v.userEmail && v.userEmail.toLowerCase() === user.email.toLowerCase()) ||
                        (v.email && v.email.toLowerCase() === user.email.toLowerCase())
                    );

                    
                    setStats({
                        bookingCount: myBookings.length,
                        vehicleCount: myVehicles.length
                    });

                    
                    const dataForChart = myBookings.slice(0, 5).map(booking => ({
                        name: booking.vehicleName ? (booking.vehicleName.length > 10 ? booking.vehicleName.slice(0, 10) + '..' : booking.vehicleName) : 'Ride',
                        price: booking.pricePerDay ? parseInt(booking.pricePerDay) : 0
                    }));
                    
                    setChartData(dataForChart);
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
            <DynamicTitle key={location.pathname} />
            <div className="mb-10">
                <h2 className="text-3xl font-bold">
                    Welcome back, <span className="text-green-500">{user?.displayName}!</span>
                </h2>
                <p className="text-gray-500 mt-2">Here is an overview of your activity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Profile  */}
                <div className="card bg-base-200 shadow-xl h-fit">
                    <div className="card-body items-center text-center">
                        <div className="avatar mb-4">
                            <div className="w-24 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/MBtqXQp/user.png"} alt="Profile" />
                            </div>
                        </div>
                        <h2 className="card-title text-2xl">{user?.displayName}</h2>
                        <p className="text-gray-500 break-all">{user?.email}</p>
                        
                        <div className="divider"></div>
                        
                        <div className="w-full text-left space-y-3">
                            <div className="flex items-center gap-3">
                                <FaUser className="text-green-500" />
                                <span className="font-semibold">User ID:</span> 
                                <span className="text-xs opacity-70 truncate">{user?.uid}</span>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="stats shadow bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                            <div className="stat">
                                <div className="stat-figure text-blue-100">
                                    <FaCalendarCheck className="text-4xl opacity-80" />
                                </div>
                                <div className="stat-title text-blue-100">Total Bookings</div>
                                {/* count bookings*/}
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

                    {/* Chart */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <div className="flex items-center gap-2 mb-4">
                                <FaChartBar className="text-green-500 text-xl" />
                                <h3 className="card-title">Booking Cost Analysis</h3>
                            </div>
                            
                            <div className="h-[300px] w-full">
                                {chartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="price" fill="#10B981" name="Cost ($)" barSize={50} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-full text-gray-400">
                                        <p>No booking data available for chart.</p>
                                        <Link to="/allvehicles" className="btn btn-sm btn-link">Book a ride now</Link>
                                    </div>
                                )}
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
                                <Link to="/allvehicles" className="btn btn-outline btn-info gap-2">
                                    <FaCalendarCheck /> Book a Ride
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;