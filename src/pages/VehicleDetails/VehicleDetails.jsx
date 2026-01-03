import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring'; 
import { format } from 'date-fns'; 
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext'; 
import { FaArrowLeft } from 'react-icons/fa'; 

const VehicleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const { user } = useAuth(); 
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [isBooking, setIsBooking] = useState(false);

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
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login'); 
                }
            });
            return;
        }

        setIsBooking(true);

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
                    text: `Your ride request has been submitted successfully on ${format(new Date(bookingData.bookingDate), 'MMMM dd, yyyy')}.`, 
                    icon: 'success',
                    confirmButtonText: 'Great!',
                    confirmButtonColor: '#3085d6'
                });
                setIsBooking(false); 
            } else {
                setIsBooking(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Booking failed. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
        })
        .catch(error => {
            console.error("Booking Error:", error);
            setIsBooking(false);
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        });
    };

    // React Spring for button animation
    const springProps = useSpring({
        from: { scale: 1 },
        to: { scale: 1 },
        config: { tension: 220, friction: 30 },
    });

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
                
               
                <div className="mb-6">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn btn-outline btn-sm gap-2 hover:bg-green-500 hover:text-white hover:border-green-500"
                    >
                        <FaArrowLeft /> Go Back
                    </button>
                </div>

                {/* Framer Motion for card */}
                <motion.div 
                    className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <figure className="lg:w-1/2 relative h-full">
                        <img 
                            src={car.coverImage} 
                            alt={car.vehicleName}
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
                            {/* React Spring animated button */}
                            <animated.button 
                                onClick={handleBooking}
                                disabled={isBooking}
                                style={{ 
                                    scale: isBooking ? 1 : springProps.scale,
                                }}
                                className={`btn btn-primary btn-lg w-full text-white shadow-lg transition-all duration-300 ${isBooking ? 'bg-green-700 cursor-not-allowed' : 'bg-green-500 border-0'}`}
                                onMouseEnter={() => springProps.scale.set(1.05)}
                                onMouseLeave={() => springProps.scale.set(1)}
                            >
                                {isBooking ? (
                                    <span className="flex items-center justify-center">
                                        <span className="loading loading-spinner loading-sm mr-2"></span>
                                        Processing...
                                    </span>
                                ) : (
                                    'Book This Ride Now'
                                )}
                            </animated.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VehicleDetails;