import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyVehicles = () => {
    const { user } = useAuth();
    const [myVehicles, setMyVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        axios.get('https://travel-ease-server-self.vercel.app/cars')
            .then(res => {
                const filtered = res.data.filter(car => car.userEmail === user.email);
                setMyVehicles(filtered);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching vehicles:", err);
                setLoading(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to load your vehicles.',
                    icon: 'error'
                });
            });
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This vehicle will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://travel-ease-server-self.vercel.app/cars/${id}`)
                    .then(() => {
                        setMyVehicles(prev => prev.filter(vehicle => vehicle._id !== id));
                        Swal.fire('Deleted!', 'Vehicle has been deleted.', 'success');
                    })
                    .catch(err => {
                        console.error("Delete error:", err);
                        Swal.fire('Error!', 'Failed to delete vehicle.', 'error');
                    });
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">My Vehicles</h2>
            
            {myVehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myVehicles.map(vehicle => (
                        <div key={vehicle._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                            <figure className="px-5 pt-5">
                                <img 
                                    src={vehicle.coverImage} 
                                    alt={vehicle.vehicleName} 
                                    className="rounded-xl h-48 w-full object-cover" 
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{vehicle.vehicleName}</h2>
                                <p className="text-gray-500 text-sm">{vehicle.description ? vehicle.description.slice(0, 50) + "..." : "No description"}</p>
                                
                                <div className="flex gap-2 my-2">
                                    <div className="badge badge-outline">{vehicle.category}</div>
                                    <div className="badge badge-secondary badge-outline">${vehicle.pricePerDay}/day</div>
                                </div>
                                
                                <div className="card-actions w-full mt-4 gap-2">
                                    <Link to={`/vehicle/${vehicle._id}`} className="flex-1">
                                        <button className="btn btn-primary bg-blue-500 border-0 text-white">View Details</button>
                                    </Link>
                                    <Link to={`/dashboard/update-vehicle/${vehicle._id}`} className="flex-1">
                                        <button className="btn btn-secondary bg-yellow-500 border-0 text-white">Update</button>
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(vehicle._id)}
                                        className="btn btn-error bg-red-500 border-0 text-white flex-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    <h3 className="text-xl mb-4">No vehicles found.</h3>
                    <p className="text-sm">Add your first vehicle today!</p>
                    <Link to="/addvehicles" className="btn btn-primary bg-green-500 border-0 mt-4">Add Vehicle</Link>
                </div>
            )}
        </div>
    );
};

export default MyVehicles;