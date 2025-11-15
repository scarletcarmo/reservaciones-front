// src/api.ts
import { config } from '../config/config';
import axios from 'axios';

console.log("config.apiUrl", config.API_URL);

export const api = axios.create({
    baseURL: config.API_URL,
    //timeout: 1000,
    withCredentials: true, //cookies
    headers: {
        'Content-Type': 'application/json',
        //Authorization: token ? `Bearer ${token}` : '',
    },
});

export async function getUsers() {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        throw error;
    }
}

export async function getRols() {
    try {
        const response = await api.get('/rol');
        return response.data;
    } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        throw error;
    }
}

export async function getByIdUsers(id: number) {
    try {
        const response = await api.get(`/users/${id}`);

        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error);
        throw error;
    }
}

export async function loginUser(credentials: any) {
    try {
        const response = await api.post('/users/login', credentials);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return {
            code: 500,
            message: "Error en el servidor. Intenta más tarde.",
            data: null,
        };
    }
}

export async function post(user: any) {
    try {
        const response = await api.post('/users', user);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Respuesta del servidor:", error.response);
        }
        throw error;
    }
}

export async function update(user: any) {
    try {
        const response = await api.put(`/users/${user.id}`, user);

        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
}

export async function deleteUser(id: string) {
    const response = await api.delete(`/${id}`);
    return response.data
}