import { api } from "./userApi";

export async function getByAllRooms() {
    try {
        const response = await api.get(`/rooms`);
        return response.data;
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        throw error;
    }
}