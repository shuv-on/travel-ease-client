import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2'; 
import { useLocation } from 'react-router-dom';
import DynamicTitle from '../../components/DynamicTitle/DynamicTitle';

const Profile = () => {
    const location = useLocation();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    
   
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateProfile(user, {
                displayName: displayName,
                photoURL: photoURL
            });
            
            setLoading(false);

            // Success alert
            Swal.fire({
                title: 'Success!',
                text: 'Profile updated successfully!',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#22c55e' 
            }).then(() => {
                
                window.location.reload();
            });

        } catch (error) {
            console.error(error);
            setLoading(false);

            // Error alert
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Failed to update profile.',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
             <DynamicTitle key={location.pathname} />
            <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
         
                <div className="card bg-base-100 shadow-xl border border-gray-200">
                    <div className="card-body items-center text-center">
                        <div className="avatar mb-4">
                            <div className="w-32 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL || "https://i.ibb.co/MBtqXQp/user.png"} alt="Profile" />
                            </div>
                        </div>
                        <h2 className="card-title text-2xl">{user?.displayName || 'No Name Set'}</h2>
                        <p className="text-gray-500 badge badge-ghost">{user?.email}</p>
                        
                        <div className="divider"></div>
                        
                        <div className="w-full text-left space-y-2">
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-gray-700">User ID:</span> {user?.uid}
                            </p>
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-gray-700">Last Login:</span> {user?.metadata?.lastSignInTime}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl border border-gray-200">
                    <div className="card-body">
                        <h3 className="card-title mb-4 text-green-600">Update Profile Information</h3>
                        
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Full Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    className="input input-bordered w-full focus:input-success" 
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Photo URL</span>
                                </label>
                                <input 
                                    type="url" 
                                    placeholder="https://example.com/photo.jpg" 
                                    className="input input-bordered w-full focus:input-success" 
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    required
                                />
                                <label className="label">
                                    <span className="label-text-alt text-gray-400">Provide a direct image link</span>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button disabled={loading} className="btn btn-success text-white">
                                    {loading ? <span className="loading loading-spinner"></span> : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;