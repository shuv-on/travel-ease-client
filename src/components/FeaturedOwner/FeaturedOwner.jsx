import React, { useEffect, useState } from 'react';

const FeaturedOwner = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cars?limit=6')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching featured cars:", error));
  }, []);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((vehicle) => (
            <div key={vehicle._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img 
                  src={vehicle.coverImage} 
                  alt={vehicle.vehicleName} 
                  className="h-56 w-full object-cover" 
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{vehicle.vehicleName}</h2>
                <p className='text-sm text-gray-500 font-semibold'>Owner: {vehicle.owner}</p>
                
                <p>{vehicle.description.slice(0, 60)}...</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-success">
                    ${vehicle.pricePerDay}/day
                  </span>
                  <div className="card-actions">
                    <button className="btn btn-success text-white">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedOwner;