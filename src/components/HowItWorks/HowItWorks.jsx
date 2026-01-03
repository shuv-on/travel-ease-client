import React from 'react';
import { FaCalendarCheck, FaSearch, FaCarSide } from 'react-icons/fa';

const HowItWorks = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">How It Works</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg mb-6">
                            <FaSearch />
                        </div>
                        <h3 className="text-xl font-bold mb-2">1. Browse & Select</h3>
                        <p className="opacity-70 max-w-xs">Choose from our wide range of vehicles that match your needs.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg mb-6">
                            <FaCalendarCheck />
                        </div>
                        <h3 className="text-xl font-bold mb-2">2. Book Your Dates</h3>
                        <p className="opacity-70 max-w-xs">Select your pickup and return dates easily through our system.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl shadow-lg mb-6">
                            <FaCarSide />
                        </div>
                        <h3 className="text-xl font-bold mb-2">3. Hit the Road</h3>
                        <p className="opacity-70 max-w-xs">Pick up your car from the location and enjoy your trip!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HowItWorks;