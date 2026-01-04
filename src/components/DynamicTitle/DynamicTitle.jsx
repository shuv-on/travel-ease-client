import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const DynamicTitle = () => {
    const location = useLocation();
    const path = location.pathname;

    let title = 'Travel Ease | Rent a Car'; 

   
    if (path === '/') title = 'Home | Travel Ease';
    else if (path === '/allvehicles') title = 'All Vehicles | Travel Ease';
    else if (path === '/login') title = 'Login | Travel Ease';
    else if (path === '/register') title = 'Register | Travel Ease';
    
    // Dashboard 
    else if (path === '/dashboard') title = 'Dashboard Overview | Travel Ease';
    else if (path === '/dashboard/mybookings') title = 'My Bookings | Travel Ease';
    else if (path === '/dashboard/addvehicle') title = 'Add Vehicle | Travel Ease';
    else if (path === '/dashboard/myvehicles') title = 'My Vehicles | Travel Ease';
    else if (path === '/dashboard/profile') title = 'My Profile | Travel Ease';

   
    else if (path.startsWith('/vehicle/')) {
        title = 'Vehicle Details | Travel Ease';
    }
    
    else if (path.startsWith('/dashboard/update-vehicle/')) {
        title = 'Update Vehicle | Travel Ease';
    }

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default DynamicTitle;