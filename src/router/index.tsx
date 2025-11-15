import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../auth/Login.page";
import Register from "../auth/Register.page";
import NotFound from "../modules/NotFound";

// Sub-rutas
import ownerRoutes from "./OwnerRouter";
import customerRoutes from "./CustomerRouter";

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, element: <Login /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
        ],
    },

    ownerRoutes,
    customerRoutes,

    { path: "*", element: <NotFound /> },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
