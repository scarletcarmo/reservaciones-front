import { api } from "./userApi";


export async function getById(id: number) {
    try {
        const response = await api.get(`/hotel/getById/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el hotel por ID:", error);
        throw error;
    }
}


export async function getByAllHotel() {
    try {
        const response = await api.get('/hotel');
        return response.data;
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        throw error;
    }
}

export async function getByUsers(user_id: number) {
    try {
        const response = await api.get(`/hotel/users/${user_id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el hotel por ID:', error);
        throw error;
    }
}

export const getCities = async (): Promise<string[]> => {
    const response = await fetch("/cities");
    if (!response.ok) throw new Error("Error al cargar ciudades");
    return await response.json();
};

export const getStatus = async (): Promise<string[]> => {
    const response = await fetch("/status");
    if (!response.ok) throw new Error("Error al cargar estados");
    return await response.json();
};

export async function post(hotel: any) {
    try {
        const response = await api.post('/hotel', hotel);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Respuesta del servidor:", error.response);
        }
        throw error;
    }
}

export async function put(hotel: any, id: number) {
    try {
        if (!id) return
        const response = await api.put(`/hotel/${id}`, hotel);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Respuesta del servidor:", error.response);
        }
        throw error;
    }
}