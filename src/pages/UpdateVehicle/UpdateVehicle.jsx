import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateVehicle = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vehicleName: '',
        ownerName: '',
        category: '',
        pricePerDay: '',
        location: '',
        availability: true,
        description: '',
        coverImage: '',
        userEmail: user?.email || ''
    });
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (!id || !user) {
            navigate('/myvehicles');
            return;
        }

        axios.get(`https://travel-ease-server-self.vercel.app/cars/${id}`)
            .then(res => {
                if (res.data.userEmail !== user.email) {
                    Swal.fire('Access Denied', 'You can only update your own vehicles.', 'error');
                    navigate('/myvehicles');
                    return;
                }
                setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching vehicle:", err);
                Swal.fire('Error!', 'Failed to load vehicle data.', 'error');
                navigate('/myvehicles');
                setLoading(false);
            });
    }, [id, user, navigate]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire('Login Required', 'Please log in to update vehicle.', 'warning');
            return;
        }

        setSubmitLoading(true);
        try {
            const response = await axios.put(`https://travel-ease-server-self.vercel.app/cars/${id}`, formData);
            if (response.data.matchedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Vehicle updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate('/dashboard/myvehicles'); 
            }
        } catch (error) {
            console.error("Error updating vehicle:", error);
            Swal.fire('Error!', 'Failed to update vehicle. Please try again.', 'error');
        } finally {
            setSubmitLoading(false);
        }
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
            <h2 className="text-3xl font-bold text-center mb-8">Update Vehicle</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-base-100 p-6 rounded-lg shadow-xl">
                {/* Vehicle Name */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Vehicle Name</span></label>
                    <input
                        type="text"
                        name="vehicleName"
                        value={formData.vehicleName}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Owner Name */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Owner Name</span></label>
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Category */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Category</span></label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="SUV">SUV</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Electric">Electric</option>
                        <option value="Van">Van</option>
                        <option value="Luxury">Luxury</option>
                    </select>
                </div>

                {/* Price Per Day */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Price Per Day ($)</span></label>
                    <input
                        type="number"
                        name="pricePerDay"
                        value={formData.pricePerDay}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Location */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Location</span></label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Availability */}
                <div className="form-control mb-4">
                    <label className="label cursor-pointer">
                        <span className="label-text">Available</span>
                        <input
                            type="checkbox"
                            name="availability"
                            checked={formData.availability}
                            onChange={handleInputChange}
                            className="checkbox checkbox-primary ml-2"
                        />
                    </label>
                </div>

                {/* Description */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="textarea textarea-bordered w-full"
                        rows={3}
                        placeholder="Enter vehicle description..."
                    />
                </div>

                {/* Cover Image URL */}
                <div className="form-control mb-4">
                    <label className="label"><span className="label-text">Cover Image URL</span></label>
                    <input
                        type="url"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>

                {/* User Email*/}
                <div className="form-control mb-6">
                    <label className="label"><span className="label-text">User Email</span></label>
                    <input
                        type="email"
                        value={formData.userEmail}
                        readOnly
                        className="input input-bordered w-full bg-base-200"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitLoading}
                    className="btn btn-primary bg-green-500 border-0 w-full"
                >
                    {submitLoading ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        'Update Vehicle'
                    )}
                </button>
            </form>
        </div>
    );
};

export default UpdateVehicle;