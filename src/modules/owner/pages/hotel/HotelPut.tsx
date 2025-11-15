import { useEffect, useState } from "react";
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Modal,
    TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useHotel } from "../../hooks/useHotel";
import messages from "../../../../base/constants/messages.json";

export interface FormData {
    name: string;
    address: string;
    city: string;
    status: string;
}

interface HotelProps {
    id: number;
    onUpdated?: () => void;
    openEdit: boolean;
    onCloseEdit: () => void;
}


const HotelPut: React.FC<HotelProps> = ({ id, onUpdated, openEdit, onCloseEdit }) => {
    const { formData, updated, onChange, getByHotelId } =
        useHotel<FormData>({
            name: "",
            address: "",
            city: "",
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

    useEffect(() => {
        const fetchHotel = async () => {
            console.log("id-select", id);
            await getByHotelId(id);
        };
        if (id && openEdit) fetchHotel();
    }, [id, openEdit]);

    const onPut = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) {
            setMessage(messages.common.general.notFound);
            return;
        }
        const response = await updated(id);
        if (response) {
            setMessage(messages.common.general.put);
            onUpdated && onUpdated();
        } else {
            setMessage(messages.common.general.errPut);
        }
    };

    return (
        <Modal open={openEdit} onClose={onCloseEdit}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                maxWidth: 400,
                maxHeight: 500,
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                overflow: 'hidden'
            }}>
                {/* Botón X */}
                <Box sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'grey.500',
                    '&:hover': {
                        color: 'grey.600',
                        backgroundColor: 'transparent',
                    },
                }}
                    onClick={onCloseEdit}
                >
                    <CloseIcon fontSize="small" />
                </Box>

                {/* Barra azul superior */}
                <Box sx={{ bgcolor: 'primary.main', color: '#fff', p: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    Editar Hotel
                </Box>

                {/* Contenido del formulario */}
                <Box sx={{ p: 3, overflowY: 'auto' }}>
                    {message && (
                        <Alert
                            severity={message === messages.common.general.put ? "success" : "error"}
                            sx={{ mb: 2, textAlign: "center" }}
                        >
                            {message}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={onPut} sx={{ mt: 2 }} noValidate>
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
                            placeholder="Ingrese la dirección"
                            fullWidth
                            required
                            sx={{ mb: 2 }}
                            value={formData.address}
                            onChange={onChange}
                        />

                        <Autocomplete
                            disablePortal
                            options={ecuadorCities}
                            value={formData.city}
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
                            onChange={(event, newValue) =>
                                onChange({
                                    target: {
                                        name: "status",
                                        value: newValue || "",
                                    },
                                })
                            }
                            renderInput={(params) => (
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
                            Actualizar
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default HotelPut;
