
import React from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';


const Root = () => {
    const location = useLocation();
    const showFooter = ['/', '/allvehicles', '/addvehicles', '/myvehicles', '/mybookings'].includes(location.pathname);
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
           {showFooter && <Footer></Footer>}
        </div>
    );
};

export default Root;