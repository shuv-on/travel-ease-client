import { createBrowserRouter } from "react-router-dom"; 
import Root from "../pages/Root/Root";  
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllVehicles from "../pages/AllVehicles/AllVehicles";
import AddVehicles from "../pages/AddVehicles/AddVehicles";
import MyVehicles from "../pages/MyVehicles/MyVehicles";
import MyBookings from "../pages/MyBookings/MyBookings";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <ErrorPage />,  

        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/allvehicles",
                Component: AllVehicles,
            },
            {
                path: "/addvehicles",
                Component: AddVehicles,
            },
            {
                path: "/myvehicles",
                Component: MyVehicles,
            },
            {
                path: "/mybookings",
                Component: MyBookings,
            },
            {
                path: "*", 
                Component: ErrorPage,
            }
        ]
    }
]);