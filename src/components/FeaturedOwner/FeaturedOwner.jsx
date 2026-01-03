import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FeaturedOwner = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://travel-ease-server-self.vercel.app/cars?limit=8') 
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching featured cars:", error);
        setLoading(false);
      });
  }, []);

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="h-56 bg-gray-300 rounded-t-2xl"></div>
      <div className="card-body">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="flex justify-between mt-6">
           <div className="h-8 bg-gray-300 rounded w-1/3"></div>
           <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 bg-base-200"> 
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">
              Featured Owners
            </h2>
            <p className="text-gray-500 mt-2">
                Spotlight on a trusted host
            </p>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {loading ? (
             [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            cars.map((vehicle) => (
            <div key={vehicle._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <figure>
                <img 
                  src={vehicle.coverImage} 
                  alt={vehicle.vehicleName} 
                  className="h-56 w-full object-cover" 
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{vehicle.vehicleName}</h2>
                <p className='text-sm text-gray-500 font-semibold'>
                    Owner: <span className="text-primary">{vehicle.owner || 'Anonymous'}</span>
                </p> 
                
                <p>{vehicle.description ? vehicle.description.slice(0, 50) + '...' : ''}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-success">
                    ${vehicle.pricePerDay}/day
                  </span>
                  <div className="card-actions">
                    <Link to={`/vehicle/${vehicle._id}`}>
                     <button className="btn btn-success text-white">View Details</button>
                    </Link>
                   
                  </div>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedOwner;