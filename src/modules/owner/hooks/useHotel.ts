import { useState } from 'react'
import { getById, post, put } from '../../../api/hotelApi';
import { useAuth } from '../../../auth/context/AuthContext';

export function useHotel<T>(initialForm: T) {
    const [formData, setFormData] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const { user, isAuthenticated } = useAuth();
    //devuelve el value del input
    const onChange = ({ target }) => {
        const { name, value } = target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const getByHotelId = async (id: number) => {
        try {
            if (!id) return false
            const response = await getById(id);
            if (response.code === 200) {
                setFormData(response.data.hotel);
            } else {
                console.warn("Hoteles no encontrados");
            }
        } catch (error) {
            console.error("Error al obtener los hoteles:", error);
        }
    }

    const register = async () => {
        if (!isAuthenticated || !user) {
            console.warn("Debes iniciar sesión para registrar un hotel");
            return false;
        }

        setLoading(true);
        try {
            const response = await post({ ...formData, user_id: user.id });

            if (response.code === 201) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                setLoading(false);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            setLoading(false);
            console.error("Error al crear el hotel:", error);
            return false;
        }
    }

    const updated = async (id: number) => {
        setLoading(true);
        try {
            if (!id) {
                setLoading(false);
                console.error("No se proporcionó id");
                return false;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await put(formData, id);
            if (response.code === 200) {
                setLoading(false);
                return true;
            } else {
                setLoading(false);
                console.error("Error al actualizar:", response);
                return false;
            }
        } catch (error) {
            setLoading(false);
            console.error("Error en la solicitud PUT:", error);
            return false;
        }
    }

    return {
        loading,
        formData,
        getByHotelId,
        register,
        updated,
        onChange
    }
}

