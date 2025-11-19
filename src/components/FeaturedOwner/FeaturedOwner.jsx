import React from 'react';
const dummyVehicles = [
  {
    id: 1,
    name: 'Toyota Camry',
    description: 'A reliable and comfortable sedan for city and highway driving.',
    image: 'https://i.ibb.co/68WcWpX/toyota-camry.jpg',
    price: 50,
  },
  {
    id: 2,
    name: 'Tesla Model S',
    description: 'Experience the future of driving with this all-electric luxury sedan.',
    image: 'https://i.ibb.co/wJv0K3W/tesla-model-s.jpg',
    price: 120,
  },
  {
    id: 3,
    name: 'Ford F-150',
    description: 'A tough and capable truck ready for any job or adventure.',
    image: 'https://i.ibb.co/y4Lg3LC/ford-f150.jpg',
    price: 80,
  },
];

const FeaturedOwner = () => {
  return (
    <div className="py-12 bg-base-200"> 
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Owners 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyVehicles.map((vehicle) => (
            <div key={vehicle.id} className="card bg-base-100 shadow-xl">
              <figure>
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="h-56 w-full object-cover" 
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{vehicle.name}</h2>
                <p>{vehicle.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-success">
                    ${vehicle.price}/day
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