import React, { useEffect, useState } from 'react';

const Topcategories = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cars')
      .then((res) => res.json())
      .then((data) => {
        const customOrder = ["SUV", "Electric", "Van", "Sedan"];
        const sortedData = data
          .filter(car => customOrder.includes(car.category))

          .sort((a, b) => {
            const indexA = customOrder.indexOf(a.category);
            const indexB = customOrder.indexOf(b.category);
            return indexA - indexB;
          });

        setCars(sortedData.slice(0, 6));
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="py-12 bg-base-200"> 
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-2">
              Top Categories
            </h2>
            <p className="text-gray-500 font-medium">
              SUVs, Electric, Vans, Sedans
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
                
                <p className='text-sm font-bold text-gray-500'>
                    Category: <span className='text-primary'>{vehicle.category}</span>
                </p>

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

export default Topcategories;