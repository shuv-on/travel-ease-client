import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <p>I'm Home</p>,
    }
]);