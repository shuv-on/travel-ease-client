import React, { useEffect, useState } from 'react';

const Dynamic = () => {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3000/cars?limit=6')
      .then(res => res.json())
      .then(data => setVehicles(data))
      .catch(error => console.error("Error fetching cars:", error));
  }, []);

  return (
    <div className="py-12 bg-base-200"> 
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our Latest Vehicles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
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
                
                <p>{vehicle.description}</p>
                
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

export default Dynamic;