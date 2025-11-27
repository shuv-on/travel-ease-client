import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllVehicles = () => {
    const [cars, setCars] = useState([]); 
    const [filteredCars, setFilteredCars] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        axios.get('https://travel-ease-server-self.vercel.app/cars')
            .then(res => {
                setCars(res.data);
                setFilteredCars(res.data); 
                setLoading(false);
            })
            .catch(err => {
                console.error("API Error:", err);
                setLoading(false); 
                alert("Failed to load vehicles. Please try again.");
            });
    }, []);

    useEffect(() => {
        let result = [...cars];
        if (searchQuery) {
            result = result.filter(car => 
                car.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (car.location && car.location.toLowerCase().includes(searchQuery.toLowerCase())) 
            );
        }
        //Filter by Category
        if (selectedCategory) {
            result = result.filter(car => car.category === selectedCategory);
        }

        //Sort by Price
        if (sortOrder === 'asc') {
            result.sort((a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay));
        } else if (sortOrder === 'desc') {
            result.sort((a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay));
        }

        setFilteredCars(result);
    }, [cars, searchQuery, selectedCategory, sortOrder]);

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSortOrder("");
    };

    if (loading) {
        return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">All Available Vehicles</h2>

            {/* Filter and Sort Section */}
            <div className="bg-base-200 p-6 rounded-lg mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center">
                {/* Search by Location/Name */}
                <input 
                    type="text" 
                    placeholder="Search by Name or Location" 
                    className="input input-bordered w-full max-w-xs" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Filter by Category */}
                <select 
                    className="select select-bordered w-full max-w-xs"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Electric">Electric</option>
                    <option value="Van">Van</option>
                    <option value="Luxury">Luxury</option>
                </select>

                {/* Sort by Price */}
                <select 
                    className="select select-bordered w-full max-w-xs"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>

                {/* Reset btn */}
                <button onClick={handleReset} className="btn btn-neutral">Reset Filters</button>
            </div>

            {/* Grid Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.length > 0 ? (
                    filteredCars.map(vehicle => (
                        <div key={vehicle._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                            <figure className="px-5 pt-5">
                              
                                <img src={vehicle.coverImage} className="rounded-xl h-48 w-full object-cover" alt={vehicle.vehicleName} />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{vehicle.vehicleName}</h2>
                                <p className="text-gray-500 text-sm">{vehicle.description ? vehicle.description.slice(0, 50) + "..." : "No description"}</p>
                                
                                <div className="flex gap-4 my-2">
                                    <div className="badge badge-outline">{vehicle.category}</div>
                                    <div className="badge badge-secondary badge-outline">${vehicle.pricePerDay}/day</div>
                                </div>

                                <div className="card-actions w-full mt-4">
                                  
                                    <Link to={`/vehicle/${vehicle._id}`} className="block w-full">
                                        <button className="btn btn-primary bg-green-500 border-0 w-full text-white">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-gray-500 py-10">
                        <h3 className="text-xl">No vehicles found.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllVehicles;