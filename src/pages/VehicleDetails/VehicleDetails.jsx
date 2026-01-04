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
    
    
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        fetch(`https://travel-ease-server-self.vercel.app/cars/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch car data');
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
                if (result.isConfirmed) navigate('/login');
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
            headers: { 'content-type': 'application/json' },
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
                setBookingSuccess(true); 
            } else {
                setIsBooking(false);
                Swal.fire({ title: 'Error!', text: 'Booking failed.', icon: 'error' });
            }
        })
        .catch(error => {
            setIsBooking(false);
            Swal.fire({ title: 'Error!', text: 'Something went wrong.', icon: 'error' });
        });
    };

    const springProps = useSpring({
        from: { scale: 1 },
        to: { scale: 1 },
        config: { tension: 220, friction: 30 },
    });

    if (loading) return <span className="loading loading-spinner loading-lg text-primary block mx-auto mt-20"></span>;
    if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
    if (!car) return <div className="text-center mt-10">Vehicle not found!</div>;

    return (
        <div className="bg-base-200 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="mb-6">
                    <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm gap-2">
                        <FaArrowLeft /> Go Back
                    </button>
                </div>

                <motion.div 
                    className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                >
                    <figure className="lg:w-1/2 h-full"><img src={car.coverImage} className="w-full h-full object-cover min-h-[400px]" alt={car.vehicleName} /></figure>
                    <div className="card-body lg:w-1/2 p-8 lg:p-12">
                        <h2 className="card-title text-4xl font-bold mb-2">{car.vehicleName}</h2>
                        <p className="text-gray-600 text-lg mb-6">{car.description}</p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 bg-base-200 rounded-lg"><span className="font-bold text-gray-500">Price</span> <br/><span className="text-2xl font-bold text-primary">${car.pricePerDay}</span>/day</div>
                            <div className="p-4 bg-base-200 rounded-lg"><span className="font-bold text-gray-500">Location</span> <br/><span className="text-lg">{car.location}</span></div>
                        </div>
                        
                        <div className="card-actions justify-end mt-auto">
                            <animated.button 
                                onClick={handleBooking}
                                disabled={isBooking || bookingSuccess} 
                                style={{ scale: (isBooking || bookingSuccess) ? 1 : springProps.scale }}
                                className={`btn btn-primary btn-lg w-full text-white shadow-lg 
                                    ${bookingSuccess ? 'bg-gray-500 border-gray-500 cursor-not-allowed' : 'bg-green-500 border-0'}`}
                                onMouseEnter={() => !bookingSuccess && springProps.scale.set(1.05)}
                                onMouseLeave={() => !bookingSuccess && springProps.scale.set(1)}
                            >
                                {isBooking ? 'Processing...' : bookingSuccess ? 'Booked' : 'Book This Ride Now'}
                            </animated.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default VehicleDetails;