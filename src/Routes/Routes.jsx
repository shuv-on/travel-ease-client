import { createBrowserRouter } from "react-router-dom"; 
import Root from "../pages/Root/Root";  
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

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
                path: "*", 
                Component: ErrorPage,
            }
        ]
    }
]);