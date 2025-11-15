import { RouteObject } from 'react-router-dom'
import RequireRole from './RequireRole'
import OwnerLayout from '../modules/owner/layouts/OwnerLayout'

import Dashboard from "../modules/owner/components/OwnerDashboard";
import ProfilePage from "../modules/owner/pages/profile/ProfilePage";
import HotelList from "../modules/owner/pages/hotel/HotelList";
import RoomList from "../modules/owner/pages/rooms/RoomList";
import RoomPost from "../modules/owner/pages/rooms/RoomPost";
import ReservationsList from "../modules/owner/pages/reservations/ReservationsList";
import ReservationsPost from "../modules/owner/pages/reservations/ReservationsPost";
import Reports from "../modules/owner/pages/reports/Reports";
import OwnerDashboard from '../modules/owner/components/OwnerDashboard';

const ownerRoutes: RouteObject = {
    path: "/owner",
    element: (
        <RequireRole role="owner">
            <OwnerLayout />
        </RequireRole>
    ),
    children: [
        { path: "dashboard", element: <OwnerDashboard /> },
        { path: "hotel/list", element: <HotelList /> },
        { path: "rooms/list", element: <RoomList /> },
        { path: "rooms/post", element: <RoomPost /> },
        { path: "rooms/put", element: <div>Gestión de habitaciones</div> },
        { path: "rooms/list/detail", element: <div>Gestión de habitaciones</div> },
        { path: "reservations", element: <ReservationsList /> },
        { path: "reservations/post", element: <ReservationsPost /> },
        { path: "perfil", element: <ProfilePage /> },
        { path: "reports", element: <Reports /> },
    ],
}

export default ownerRoutes;
