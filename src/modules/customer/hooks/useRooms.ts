import { useEffect, useState } from "react"
import { getByAllRooms } from "../../../api/roomApi";

const useRooms = () => {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getAll = async () => {
        try {
            setLoading(true);
            const response = await getByAllRooms();
            console.error("response ", response);

            if (response.code == 200) {
                setRooms(response.data.rooms);
            } else {
                console.log(response)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        getAll();
    }, []);

    return { rooms, loading };

}

export default useRooms
