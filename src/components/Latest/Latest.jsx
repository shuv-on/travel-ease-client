import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Latest = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    axios.get('https://travel-ease-server-self.vercel.app/cars?limit=8')
      .then(res => {
        setVehicles(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, []);

  
  const SkeletonCard = () => (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="h-56 w-full bg-gray-300 rounded-t-2xl"></div>
      <div className="card-body">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 bg-base-200"> 
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our Latest Vehicles
        </h2>
        
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {loading ? (
            
            [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
          ) : (
           
            vehicles.map((vehicle) => (
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

export default Latest;