
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthResponse from '../types/Auth';
import { getRols, loginUser, post } from '../../api/userApi';
import { RoleModel } from '../../models/RoleModels';

//<T> → define un tipo genérico. puede adaptarse a distintos tipos según el contexto.
//initialForm: T → el parámetro debe coincidir con ese tipo.
export function useAuthActions<T>(initialForm: T) {
    //extrae la funcion login del contexto
    const { login: auth, logout: logoutContext } = useAuth();

    //guarda los datos del formulario
    const [userForm, setUserForm] = useState(initialForm);
    const [roleList, setRoleList] = useState<RoleModel[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();

    //se ejecuta cada vez que el formulario cambia
    useEffect(() => {
    }, [userForm]);

    //devuelve el value del input
    const onChange = ({ target }) => {
        //extrae el nombre y el valor del input
        const { name, value } = target;
        //actualiza el valor de userForm
        setUserForm((prevFormData) => ({
            ...prevFormData, //...prevFormData copiamos los valores anteriores
            [name]: value, //reemplazamos el campo que cambio
        }));
    }

    const login = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await loginUser(userForm);

        if (response.code === 200) {
            const data = {
                id: response.data.user.id,
                username: response.data.user.username,
                email: response.data.user.email,
                role: response.data.user.role.name,
                token: response.data.token,
            };

            auth(data);

            data.role === "owner"
                ? navigate("/owner/dashboard")
                : navigate("/customer/home");
        }
        setIsLoading(false);
        return response;
    };

    const onLogout = () => {
        logoutContext();
        navigate("/login");
    }

    const register = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await post(userForm);

            if (response.code === 201) {
                setTimeout(() => navigate("/owner/dashboard"), 1500);
                return {
                    token: response.token,
                    code: response.data.code,
                    body: {
                        user: response.data.user,
                        accessToken: response.data.accessToken,
                    },
                };
            } else {
                throw new Error('Login failed with code: ' + response.code);
            }
        } catch (error) {
            setIsLoading(false);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const getRoles = async () => {
        try {
            const response = await getRols();
            if (response.code === 200) {
                setRoleList(response.data.roles);
            } else {
                console.warn("roles no encontrado");
            }
        } catch (error) {
            console.error("Error al obtener los roles:", error);
            return null;
        }
    }

    const update = async (e: any) => {
        //evita que el formulario se envíe y que la página se recargue
        e.preventDefault();
        const response = await update(userForm);
        try {
        } catch (error) {
            console.error("Error al editar el usuario:", error);
            return false;
        }

    }

    const handleClickShowPassword = () => setIsPasswordVisible((prev) => !prev);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // evita que el botón enfoque el campo
    };

    return {
        isLoading,
        userForm,
        roleList,
        getRoles,
        login,
        register,
        update,
        onChange,
        onLogout,
        handleClickShowPassword,
        handleMouseDownPassword,
        isPasswordVisible
    }
}

