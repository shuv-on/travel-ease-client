import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllVehicles from "../pages/AllVehicles/AllVehicles";
import AddVehicles from "../pages/AddVehicles/AddVehicles";
import MyVehicles from "../pages/MyVehicles/MyVehicles";
import MyBookings from "../pages/MyBookings/MyBookings";
import VehicleDetails from "../pages/VehicleDetails/VehicleDetails";
import UpdateVehicle from "../pages/UpdateVehicle/UpdateVehicle";
import { useAuth } from "../context/AuthContext";
import React, { useEffect } from "react";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../pages/Profile/Profile";

const ProtectedRoute = ({ children }) => {
  const { user, loading, openLoginModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      openLoginModal(location);
    }
  }, [user, loading, openLoginModal, location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allvehicles",
       
        element: <AllVehicles />, 
      },
      {
        path: "/vehicle/:id",
        
        element: <VehicleDetails />, 
      },
    ],
  },
  
  
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout /> 
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, 
        element: <Dashboard />,
      },
      {
        path: "addvehicle", 
        element: <AddVehicles />,
      },
      {
        path: "myvehicles",
        element: <MyVehicles />,
      },
      {
        path: "mybookings", 
        element: <MyBookings />,
      },
      {
        path: "update-vehicle/:id", 
        element: <UpdateVehicle />,
      },
      {
        path: "profile", 
        element: <Profile/>, 
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);