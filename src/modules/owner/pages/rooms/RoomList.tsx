import { useState } from "react"
import { RoomResponse } from "../../../../models/RoomModel";
import { useAuth } from "../../../../auth/context/AuthContext";

const RoomList = () => {
    const [room, setRoom] = useState<RoomResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fieldTranslations: Record<string, string> = {
        //id: "ID",
        name: "Nombre",
        address: "Dirección",
        city: "Ciudad",
        status: "Estado",
    };
    
    return (
        <>

        </>
    )
}

export default RoomList

/**
 * SELECT id, room_number, type, 
 * price_per_night, status, hotel_id, name, 
 * description, max_users, num_beds, created_at, updated_at
    FROM public.rooms;
 */