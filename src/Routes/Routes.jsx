import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllVehicles from "../pages/AllVehicles/AllVehicles";
import AddVehicles from "../pages/AddVehicles/AddVehicles";
import MyVehicles from "../pages/MyVehicles/MyVehicles";
import MyBookings from "../pages/MyBookings/MyBookings";
import { useAuth } from "../context/AuthContext";
import React, { useEffect } from "react"; 

const ProtectedRoute = ({ children }) => {
  const { user, loading, openLoginModal } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      openLoginModal();
    }
  }, [user, loading, openLoginModal]);

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
                element: (
                  <ProtectedRoute>
                    <AllVehicles />
                  </ProtectedRoute>
                ),
            },
            {
                path: "/addvehicles",
                element: (
                  <ProtectedRoute>
                    <AddVehicles />
                  </ProtectedRoute>
                ),
            },
            {
                path: "/myvehicles",
                element: (
                  <ProtectedRoute>
                    <MyVehicles />
                  </ProtectedRoute>
                ),
            },
            {
                path: "/mybookings",
                element: (
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <ErrorPage />,
            }
        ]
    }
]);