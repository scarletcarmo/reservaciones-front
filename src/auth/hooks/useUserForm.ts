import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getByIdUsers, getRols, post, update } from '../../api/userApi';
import { RoleModel } from '../../models/RoleModels';

export type FormErrors = {
    username?: string;
    email?: string;
    password?: string;
    role_id?: string;
};

export function useUserForm<T>(initialForm: T) {
    const [userForm, setUserForm] = useState(initialForm);
    const [roleList, setRoleList] = useState<RoleModel[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
    }, [userForm]);

    //devuelve el value del input
    const onChange = ({ target }) => {
        const { name, value } = target;
        setUserForm((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    const onResetForm = () => {
        setUserForm(initialForm);
    }

    const getUserById = async (id: number) => {
        try {
            const response = await getByIdUsers(id);

            if (response.code === 200) {
                setUserForm(response.data.user);
            } else {
                console.warn("Usuario no encontrado");
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            return null;
        }
    }

    const getRoles = async () => {
        try {
            const response = await getRols();
            if (response.code === 200) {
                setRoleList(response.data.roles);
            } else {
                console.warn("Roles no encontrado");
            }
        } catch (error) {
            console.error("Error al obtener los roles:", error);
            return null;
        }
    }

    const createUser = async (e: any) => {
        //evita que el formulario se envíe y que la página se recargue
        //e.preventDefault();
        const response = await post(userForm);
        try {
            if (response.code === 200) {
                setTimeout(() => navigate("/users/list"), 1500);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            return false;
        }
    }

    const updateUser = async (e: any) => {
        //evita que el formulario se envíe y que la página se recargue
        e.preventDefault();
        try {
            const response = await update(userForm);
            if (response.code === 200) {
                //setTimeout(() => navigate("/users/list"), 1500);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Error al editar el usuario:", error);
            return false;
        }

    }

    return {
        userForm,
        roleList,
        getUserById,
        updateUser,
        onChange,
        onResetForm,
        navigate
    };
}

export default useUserForm
