import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTh, FaList } from 'react-icons/fa';

const AllVehicles = () => {
    const [cars, setCars] = useState([]); 
    const [filteredCars, setFilteredCars] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    // Filters States
    const [searchQuery, setSearchQuery] = useState(""); 
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [sortOrder, setSortOrder] = useState("");
    
    // view Mode State
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

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
            });
    }, []);

    useEffect(() => {
        let result = [...cars];
        
        // Search by Name or Location
        if (searchQuery) {
            result = result.filter(car => 
                car.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (car.location && car.location.toLowerCase().includes(searchQuery.toLowerCase())) 
            );
        }

        // Filter by Category
        if (selectedCategory) {
            result = result.filter(car => car.category === selectedCategory);
        }

        // Sort by Price
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
        setViewMode("grid");
    };

    // Skeleton Component (Loading Animation)
    const SkeletonCard = () => (
        <div className={`card bg-base-100 shadow-xl animate-pulse ${viewMode === 'list' ? 'flex-row' : ''}`}>
            <div className={`${viewMode === 'list' ? 'w-1/3 h-full' : 'w-full h-48'} bg-gray-300 rounded-t-xl`}></div>
            <div className="card-body w-full">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="flex gap-4 mt-auto">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8">All Available Vehicles</h2>

            {/* Filter, Sort and Toggle Section */}
            <div className="bg-base-200 p-6 rounded-lg mb-10 flex flex-col lg:flex-row gap-4 justify-between items-center">
                
                {/* Search */}
                <input 
                    type="text" 
                    placeholder="Search by Name or Location" 
                    className="input input-bordered w-full max-w-xs" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Category */}
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

                {/* Sort */}
                <select 
                    className="select select-bordered w-full max-w-xs"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>

                {/* View Toggle Btns */}
                <div className="join border border-base-300 bg-base-100">
                    <button 
                        className={`btn btn-sm join-item ${viewMode === 'grid' ? 'btn-active btn-primary text-white' : ''}`}
                        onClick={() => setViewMode('grid')}
                        title="Grid View"
                    >
                        <FaTh />
                    </button>
                    <button 
                        className={`btn btn-sm join-item ${viewMode === 'list' ? 'btn-active btn-primary text-white' : ''}`}
                        onClick={() => setViewMode('list')}
                        title="List View"
                    >
                        <FaList />
                    </button>
                </div>

                {/* Reset Button */}
                <button onClick={handleReset} className="btn btn-neutral btn-sm md:btn-md">Reset</button>
            </div>

            {/* Main Content Area */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
                
                {loading ? (
                    // Show Skeletons 
                    [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
                ) : filteredCars.length > 0 ? (
                    filteredCars.map(vehicle => (
                        <div 
                            key={vehicle._id} 
                            className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 ${viewMode === 'list' ? 'md:flex-row' : ''}`}
                        >
                            <figure className={`${viewMode === 'list' ? 'md:w-1/3 h-56 md:h-auto' : 'h-56 px-5 pt-5'}`}>
                                <img 
                                    src={vehicle.coverImage} 
                                    className={`${viewMode === 'list' ? 'h-full w-full object-cover' : 'rounded-xl h-full w-full object-cover'}`}
                                    alt={vehicle.vehicleName} 
                                />
                            </figure>
                            
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h2 className="card-title">{vehicle.vehicleName}</h2>
                                    {/* Location Badge added */}
                                    {vehicle.location && <div className="badge badge-ghost text-xs">{vehicle.location}</div>}
                                </div>

                                <p className="text-gray-500 text-sm my-2">
                                    {vehicle.description ? vehicle.description.slice(0, 60) + "..." : "No description"}
                                </p>
                                
                                <div className="flex gap-2 mt-auto mb-4">
                                    <div className="badge badge-outline">{vehicle.category}</div>
                                    <div className="badge badge-secondary badge-outline font-bold">
                                        ${vehicle.pricePerDay}/day
                                    </div>
                                </div>

                                <div className="card-actions justify-end">
                                    <Link to={`/vehicle/${vehicle._id}`} className={viewMode === 'list' ? 'w-auto' : 'w-full'}>
                                        <button className="btn btn-primary bg-green-500 border-0 w-full text-white">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 py-20">
                        <h3 className="text-2xl font-bold">No vehicles found.</h3>
                        <p>Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllVehicles;