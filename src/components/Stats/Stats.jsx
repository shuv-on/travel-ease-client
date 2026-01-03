import React from 'react';
import { FaUsers, FaCarSide, FaMapMarkedAlt, FaHistory } from 'react-icons/fa';

const Stats = () => {
    const statData = [
        {
            id: 1,
            icon: <FaUsers className="text-4xl text-green-500" />,
            count: "15,000+",
            label: "Happy Travelers",
            desc: "Trusted by thousands of users worldwide."
        },
        {
            id: 2,
            icon: <FaCarSide className="text-4xl text-blue-500" />,
            count: "2,500+",
            label: "Vehicles in Fleet",
            desc: "Sedans, SUVs, Vans, and more ready for you."
        },
        {
            id: 3,
            icon: <FaHistory className="text-4xl text-purple-500" />,
            count: "10 Years",
            label: "Experience",
            desc: "Providing reliable service since 2014."
        },
        {
            id: 4,
            icon: <FaMapMarkedAlt className="text-4xl text-orange-500" />,
            count: "50+",
            label: "City Locations",
            desc: "Pickup and drop-off available everywhere."
        }
    ];

    return (
        <section className="py-20 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">Our Impact in Numbers</h2>
                    <p className="text-gray-500">Growing bigger and better every day</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statData.map((stat) => (
                        <div key={stat.id} className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 border-b-4 border-transparent hover:border-green-500">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-base-200 rounded-full mb-2">
                                    {stat.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
                                    {stat.count}
                                </h3>
                                <p className="text-lg font-semibold text-gray-500">{stat.label}</p>
                                <p className="text-sm text-gray-400 mt-2">{stat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;