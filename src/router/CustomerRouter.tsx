import { RouteObject } from "react-router-dom";
import RequireRole from "./RequireRole";
import CustomerLayout from "../modules/customer/layouts/CustomerLayout";
import Home from "../modules/customer/pages/Home";

const customerRoutes: RouteObject = {
    path: "/customer",
    element: (
        <RequireRole role="customer">
            <CustomerLayout />
        </RequireRole>
    ),
    children: [
        { path: "home", element: <Home /> },
    ],
};

export default customerRoutes;
