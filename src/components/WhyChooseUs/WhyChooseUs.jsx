import React from 'react';
import { FaTags, FaShieldAlt, FaHeadset, FaClock } from 'react-icons/fa';

const WhyChooseUs = () => {
    const features = [
        { icon: <FaTags />, title: "Best Price Guarantee", desc: "We offer competitive rates and special deals for long-term rentals." },
        { icon: <FaShieldAlt />, title: "Safe & Secure", desc: "Verified owners and fully insured rides for your peace of mind." },
        { icon: <FaHeadset />, title: "24/7 Support", desc: "Our team is available round the clock to assist you." },
        { icon: <FaClock />, title: "Fast Booking", desc: "Book your favorite car in just a few clicks, hassle-free." },
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose TravelEase?</h2>
                    <p className="opacity-70">We provide the best experience for your journey</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item, idx) => (
                        <div key={idx} className="card bg-base-200 shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center group">
                            <div className="text-4xl text-green-500 mb-4 mx-auto group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="opacity-70 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default WhyChooseUs;