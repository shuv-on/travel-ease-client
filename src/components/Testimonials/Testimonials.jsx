import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Arif Ahmed",
            role: "Traveler",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
            comment: "Excellent service! The car was clean, well-maintained, and the booking process was incredibly smooth. Highly recommended!",
            rating: 5
        },
        {
            id: 2,
            name: "Sarah Khan",
            role: "Business Owner",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            comment: "I rented a van for our corporate trip. The support team was very helpful, and the vehicle condition was top-notch.",
            rating: 5
        },
        {
            id: 3,
            name: "Michael D.",
            role: "Tourist",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
            comment: "Great prices compared to other services. The owner was friendly and the pickup location was convenient.",
            rating: 4
        },
        {
            id: 4,
            name: "Emily Watson",
            role: "Photographer",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
            comment: "Used TravelEase for a weekend getaway. The SUV handled the off-road tracks perfectly. Will book again!",
            rating: 5
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? reviews.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === reviews.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
       
        <section className="py-20 bg-base-200 transition-colors duration-300">
            <div className="container mx-auto px-4">
                
                <div className="text-center mb-12">
                   
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What Travelers Say</h2>
                    <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto relative group">
                    
                  
                    <div className="bg-base-100 rounded-2xl p-8 md:p-12 text-center shadow-xl transition-all duration-500">
                        
                        <div className="flex justify-center mb-6">
                            <FaQuoteLeft className="text-4xl text-green-500 opacity-30" />
                        </div>

                       
                        <p className="text-lg md:text-xl opacity-80 italic mb-8 leading-relaxed">
                            "{reviews[currentIndex].comment}"
                        </p>

                        <div className="flex flex-col items-center justify-center">
                            <div className="avatar mb-4">
                                <div className="w-16 h-16 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                                    <img src={reviews[currentIndex].image} alt={reviews[currentIndex].name} />
                                </div>
                            </div>
                            <h4 className="text-xl font-bold">{reviews[currentIndex].name}</h4>
                            <p className="text-sm opacity-60">{reviews[currentIndex].role}</p>
                            
                            <div className="flex gap-1 text-yellow-400 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < reviews[currentIndex].rating ? "" : "text-gray-300"} />
                                ))}
                            </div>
                        </div>
                    </div>

                   
                    <button 
                        onClick={prevSlide}
                        className="hidden md:block absolute top-1/2 -left-12 -translate-y-1/2 p-3 rounded-full bg-base-100 hover:bg-green-500 hover:text-white shadow-lg transition-all opacity-70 hover:opacity-100"
                    >
                        <FaChevronLeft size={20} />
                    </button>

                    <button 
                        onClick={nextSlide}
                        className="hidden md:block absolute top-1/2 -right-12 -translate-y-1/2 p-3 rounded-full bg-base-100 hover:bg-green-500 hover:text-white shadow-lg transition-all opacity-70 hover:opacity-100"
                    >
                        <FaChevronRight size={20} />
                    </button>

                    <div className="flex justify-center gap-2 mt-6">
                        {reviews.map((_, slideIndex) => (
                            <div
                                key={slideIndex}
                                onClick={() => setCurrentIndex(slideIndex)}
                                className={`transition-all duration-300 cursor-pointer rounded-full h-3 ${
                                    currentIndex === slideIndex ? "bg-green-500 w-8" : "bg-gray-400 w-3"
                                }`}
                            ></div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;