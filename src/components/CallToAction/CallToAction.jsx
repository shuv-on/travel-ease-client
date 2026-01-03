import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
        <section className="py-20 bg-success text-white text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-6">Ready for your next adventure?</h2>
                <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
                    Join thousands of happy travelers who trust TravelEase for their journey. Book your perfect ride today!
                </p>
                <Link to="/allvehicles" className="btn btn-wide bg-white text-green-700 hover:bg-gray-100 border-none font-bold text-lg">
                    Book Now
                </Link>
            </div>
        </section>
    );
};
export default CallToAction;