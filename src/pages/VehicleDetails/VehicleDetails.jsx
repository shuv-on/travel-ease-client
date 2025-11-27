import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext'; 

const VehicleDetails = () => {
    const { id } = useParams();
    const { user } = useAuth(); 
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

  
    useEffect(() => {
        fetch(`https://travel-ease-server-self.vercel.app/cars/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch car data');
                }
                return res.json();
            })
            .then(data => {
                setCar(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            Swal.fire({
                title: 'Please Login',
                text: 'You need to login first to book a ride.',
                icon: 'warning',
                confirmButtonText: 'Login'
            });
            return;
        }

        const bookingData = {
            vehicleId: car._id,
            vehicleName: car.vehicleName,
            pricePerDay: car.pricePerDay,
            image: car.coverImage,
            category: car.category,
            userEmail: user.email,
            userName: user.displayName || "Anonymous",
            bookingDate: new Date().toISOString(),
            status: 'pending'
        };

        fetch('https://travel-ease-server-self.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire({
                    title: 'Booking Confirmed!',
                    text: 'Your ride request has been submitted successfully.',
                    icon: 'success',
                    confirmButtonText: 'Great!',
                    confirmButtonColor: '#3085d6'
                });
            }
        })
        .catch(error => {
            console.error("Booking Error:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
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
        return <div className="text-center text-red-500 text-2xl mt-10">Error: {error}</div>;
    }


    if (!car) {
        return <div className="text-center text-2xl mt-10">Vehicle not found!</div>;
    }

    return (
        <div className="bg-base-200 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden">
                    <figure className="lg:w-1/2 relative">
                        <img 
                            src={car.coverImage} 
                            className="w-full h-full object-cover min-h-[400px]" 
                        />
                        
                    </figure>
                    <div className="card-body lg:w-1/2 p-8 lg:p-12">
                        <h2 className="card-title text-4xl font-bold mb-2">{car.vehicleName}</h2>
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-gray-500 text-sm">(4.8 Reviews)</span>
                        </div>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            {car.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex flex-col p-4 bg-base-200 rounded-lg">
                                <span className="text-sm text-gray-500 font-bold">Location</span>
                                <span className="text-lg font-semibold">{car.location}</span>
                            </div>
                            <div className="flex flex-col p-4 bg-base-200 rounded-lg">
                                <span className="text-sm text-gray-500 font-bold">Price Rate</span>
                                <span className="text-2xl font-bold text-primary">${car.pricePerDay}<span className="text-sm text-gray-500">/day</span></span>
                            </div>
                        </div>
                        <div className="card-actions justify-end mt-auto">
                            <button 
                                onClick={handleBooking}
                                className="btn btn-primary btn-lg bg-green-500 border-0 w-full text-white shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Book This Ride Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;