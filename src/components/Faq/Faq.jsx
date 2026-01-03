import React from 'react';

const Faq = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                
                <div className="join join-vertical w-full shadow-md bg-base-200 rounded-xl">
                    <div className="collapse collapse-arrow join-item border-b border-base-300">
                        <input type="radio" name="my-accordion-4" defaultChecked /> 
                        <div className="collapse-title text-xl font-medium">How do I book a vehicle?</div>
                        <div className="collapse-content"> 
                            <p className="opacity-80">Simply create an account, browse our available vehicles, select your dates, and click 'Book Now'.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-b border-base-300">
                        <input type="radio" name="my-accordion-4" /> 
                        <div className="collapse-title text-xl font-medium">Is insurance included?</div>
                        <div className="collapse-content"> 
                            <p className="opacity-80">Yes, basic insurance is included with all bookings. You can opt for comprehensive coverage during checkout.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-b border-base-300">
                        <input type="radio" name="my-accordion-4" /> 
                        <div className="collapse-title text-xl font-medium">Can I modify my booking?</div>
                        <div className="collapse-content"> 
                            <p className="opacity-80">You can modify your booking details up to 48 hours before the trip starts without any extra fee.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow join-item">
                        <input type="radio" name="my-accordion-4" /> 
                        <div className="collapse-title text-xl font-medium">What documents do I need?</div>
                        <div className="collapse-content"> 
                            <p className="opacity-80">You need a valid driver's license and a national ID or passport to rent a vehicle.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Faq;