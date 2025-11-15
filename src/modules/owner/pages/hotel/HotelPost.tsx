import { Alert, Autocomplete, Box, Button, Container, Divider, Fade, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../../../auth/context/AuthContext";
import { useHotel } from "../../hooks/useHotel";
import messages from "../../../../base/constants/messages.json";

export interface FormData {
    user_id: number,
    name: string;
    address: string;
    city: string;
    country: string;
    status: string;
}

interface HotelPostProps {
    onCreated?: () => void;
    open: boolean,
    onOpen: () => void;
    onClose?: () => void;
}

const HotelPost: React.FC<HotelPostProps> = ({ onCreated, open, onClose }) => {
    const { user, isAuthenticated } = useAuth();


    const { formData, register, onChange } =
        useHotel<FormData>({
            user_id: user?.id,
            name: "",
            address: "",
            city: "",
            country: "",
            status: "",
        });
    const [message, setMessage] = useState("");

    const ecuadorCities = [
        "Quito",
        "Guayaquil",
        "Cuenca",
        "Santo Domingo",
        "Machala",
        "Durán",
        "Portoviejo",
        "Manta",
        "Loja",
        "Ambato",
        "Esmeraldas",
        "Riobamba",
        "Ibarra",
        "Quevedo",
        "Milagro"
    ];

    const hotelStatusOptions = [
        "Activo",
        "Inactivo",
        "En mantenimiento",
        "Cerrado",
        "Próxima apertura"
    ];

    const onPost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await register();
            console.log("response", response);

            if (response) {
                setMessage(messages.common.register.success);
                onCreated();
                onClose?.();
            } else {
                setMessage(messages.common.register.error);
            }
        } catch (error) {

        }

    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Fade in={open}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80vw', //acho
                        maxWidth: 400,
                        height: 450,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24, //sombra
                        overflow: 'hidden'
                    }}>
                        {/**Btn x */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'grey.500',
                                '&:hover': {
                                    color: 'grey.600',
                                    backgroundColor: 'transparent',
                                },
                            }}
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="small" />
                        </Box>
                        {/* Barra superior azul */}
                        <Box sx={{ bgcolor: 'primary.main', color: '#fff', p: 2, fontWeight: 'bold', textAlign: 'center' }}>
                            Crear Hotel
                        </Box>
                        {/* Mensaje */}
                        <Box sx={{ p: 3, overFlowY: 'auto' }}>
                            {message && (
                                <Alert severity="success" sx={{ mb: 2, textAlign: "center" }}>
                                    {message}
                                </Alert>
                            )}
                            <Box component="form" onSubmit={onPost} sx={{ mt: 2 }} noValidate>
                                <TextField
                                    name="name"
                                    placeholder="Ingrese el nombre"
                                    fullWidth
                                    required
                                    autoFocus
                                    sx={{ mb: 2 }}
                                    value={formData.name}
                                    onChange={onChange}
                                />
                                <TextField
                                    name="address"
                                    placeholder="Ingrese al direccion"
                                    fullWidth
                                    required
                                    autoFocus
                                    sx={{ mb: 2 }}
                                    value={formData.address}
                                    onChange={onChange}
                                />
                                <Autocomplete
                                    disablePortal
                                    options={ecuadorCities}
                                    value={formData.city}
                                    sx={{ width: 350 }}
                                    onChange={(event, newValue) =>
                                        onChange({
                                            target: {
                                                name: "city",
                                                value: newValue || "",
                                            },
                                        })
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="city"
                                            label="Ciudad"
                                            placeholder="Selecciona una ciudad"
                                            fullWidth
                                            required
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                                <Autocomplete
                                    disablePortal
                                    options={hotelStatusOptions}
                                    value={formData.status}
                                    sx={{ width: 350 }}
                                    onChange={(event, newValue) =>
                                        onChange({
                                            target: {
                                                name: "status",
                                                value: newValue || "",
                                            },
                                        })
                                    } renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="status"
                                            label="Estado"
                                            placeholder="Selecciona el estado"
                                            fullWidth
                                            required
                                            sx={{ mb: 2 }}
                                        />
                                    )}

                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        textAlign: "center",
                                        display: 'block',
                                        mx: 'auto',
                                    }}
                                >
                                    Enviar
                                </Button>
                            </Box>
                        </Box>

                    </Box>
                </Fade>

            </Modal>

        </>
    )
}

export default HotelPost
