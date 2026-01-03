import React from 'react';

const Newsletter = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="opacity-70 mb-8">Subscribe to our newsletter for the latest travel tips, car rental deals, and exclusive offers.</p>
                    
                    <div className="join w-full max-w-md shadow-lg">
                        <input 
                            className="input input-bordered join-item w-full focus:outline-none" 
                            placeholder="Enter your email address" 
                        />
                        <button className="btn btn-primary join-item bg-green-500 border-none hover:bg-green-600 text-white">Subscribe</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Newsletter;