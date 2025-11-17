import React from 'react';
import { Link } from 'react-router-dom';
import carImg from '../../assets/car1.jpg'
const Banner = () => {
  return (
    <div 
      className="hero min-h-[60vh] md:min-h-[80vh]"
      style={{ 
        backgroundImage: `url(${carImg}) `
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div> 
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to travelEase</h1>
          <p className="mb-5">
            Find your perfect ride, effortlessly. Book from thousands of vehicles near you.
          </p>
          <Link to="/allvehicles" className="btn btn-success text-white">
             All Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;