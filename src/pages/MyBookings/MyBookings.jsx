import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import Swal from 'sweetalert2';

const MyBookings = () => {
    const { user } = useAuth(); 
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        fetch(`https://travel-ease-server-self.vercel.app/bookings?email=${user.email}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                return res.json();
            })
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setError(err.message);
                setLoading(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load bookings. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            });
    }, [user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 text-2xl mt-10">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>
            
            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map(booking => (
                        <div key={booking._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                            <figure className="px-5 pt-5">
                                <img 
                                    src={booking.image} 
                                    alt={booking.vehicleName} 
                                    className="rounded-xl h-48 w-full object-cover" 
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{booking.vehicleName}</h2>
                                <p className="text-gray-500 text-sm">
                                    {new Date(booking.bookingDate).toLocaleDateString()}
                                </p>
                                
                                <div className="flex gap-4 my-2">
                                    <div className="badge badge-outline">{booking.category}</div>
                                    <div className={`badge ${booking.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                                        {booking.status.toUpperCase()}
                                    </div>
                                    <div className="badge badge-secondary badge-outline">${booking.pricePerDay}/day</div>
                                </div>
                                
                                <div className="card-actions w-full mt-4">
                                    <button 
                                        className="btn btn-primary bg-green-500 border-0 w-full text-white"
                                        onClick={() => {
                                            
                                            Swal.fire({
                                                title: 'Booking Details',
                                                text: `Status: ${booking.status}\nBooked on: ${new Date(booking.bookingDate).toLocaleString()}`,
                                                icon: 'info',
                                                confirmButtonText: 'OK'
                                            });
                                        }}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10 col-span-full">
                    <h3 className="text-xl mb-4">No bookings found.</h3>
                    <p className="text-sm">Book your first ride today!</p>
                </div>
            )}
        </div>
    );
};

export default MyBookings;