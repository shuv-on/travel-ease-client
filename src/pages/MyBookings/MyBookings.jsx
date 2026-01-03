import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; 
import Swal from 'sweetalert2';

const MyBookings = () => {
    const { user } = useAuth(); 
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

   
    useEffect(() => {
        if (user?.email) {
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
                });
        }
    }, [user]);

  
    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                
                fetch(`https://travel-ease-server-self.vercel.app/bookings/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire(
                            'Cancelled!',
                            'Your booking has been cancelled.',
                            'success'
                        );
                        
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire('Error!', 'Something went wrong.', 'error');
                });
            }
        });
    };

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
        <div className="container mx-auto px-4 py-10 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>
            
            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bookings.map(booking => (
                        <div key={booking._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-200">
                            <figure className="px-5 pt-5 relative">
                                <img 
                                    src={booking.image} 
                                    alt={booking.vehicleName} 
                                    className="rounded-xl h-48 w-full object-cover" 
                                />
                               
                                <div className={`absolute top-8 right-8 badge ${booking.status === 'pending' ? 'badge-warning' : 'badge-success'} text-white`}>
                                    {booking.status}
                                </div>
                            </figure>
                            
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-2xl">{booking.vehicleName}</h2>
                                <p className="text-gray-500 font-medium">
                                    Date: {new Date(booking.bookingDate).toLocaleDateString()}
                                </p>
                                
                                <div className="flex flex-wrap justify-center gap-2 my-2">
                                    <div className="badge badge-outline p-3">{booking.category}</div>
                                    <div className="badge badge-secondary badge-outline p-3 font-bold">${booking.pricePerDay}/day</div>
                                </div>
                                
                              
                                <div className="card-actions w-full mt-4 flex justify-between gap-2">
                                   
                                    <button 
                                        onClick={() => handleCancel(booking._id)}
                                        className="btn btn-error bg-green-400 border-0 text-white btn-sm flex-1"
                                    >
                                        Cancel Booking
                                    </button>

                                   
                                    <button 
                                        className="btn btn-ghost btn-sm border-gray-300 flex-1"
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Booking Details',
                                                html: `
                                                    <p><b>Transaction ID:</b> ${booking._id}</p>
                                                    <p><b>Vehicle:</b> ${booking.vehicleName}</p>
                                                    <p><b>Price:</b> $${booking.pricePerDay}</p>
                                                `,
                                                icon: 'info'
                                            });
                                        }}
                                    >
                                        Info
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 col-span-full">
                    <img src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" alt="No Data" className="w-24 h-24 opacity-50 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">No bookings yet!</h3>
                    <p className="text-sm">Explore our vehicles and book your first ride.</p>
                </div>
            )}
        </div>
    );
};

export default MyBookings;