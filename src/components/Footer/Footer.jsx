import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    <div>
                        <Link to="/" className='flex items-center gap-1 text-2xl font-bold mb-4 text-white'>
                            <span className='text-green-500'>travel</span>Ease
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            TravelEase is the biggest  travel mangement company in Bandladesh. 
                        We delivered alsmost 100+ cars in everyday.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="btn btn-circle btn-sm btn-outline text-white hover:bg-green-500 hover:border-green-500 transition-all"><FaFacebookF /></a>
                            <a href="#" className="btn btn-circle btn-sm btn-outline text-white hover:bg-green-500 hover:border-green-500 transition-all"><FaTwitter /></a>
                            <a href="#" className="btn btn-circle btn-sm btn-outline text-white hover:bg-green-500 hover:border-green-500 transition-all"><FaInstagram /></a>
                            <a href="#" className="btn btn-circle btn-sm btn-outline text-white hover:bg-green-500 hover:border-green-500 transition-all"><FaLinkedinIn /></a>
                        </div>
                    </div>

                   
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-green-500 transition-colors">About Us</Link></li>
                            <li><Link to="/allvehicles" className="hover:text-green-500 transition-colors">All Vehicles</Link></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-green-500 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Legal</a></li>
                            <li><a href="#" className="hover:text-green-500 transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                   
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <span>📍</span>
                                <span>123 Travel Road, Tourism City,<br/>Dhaka 1216, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>📞</span>
                                <span>+880 123 456 7890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>✉️</span>
                                <span>support@travelease.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} TravelEase. All rights reserved. 
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;