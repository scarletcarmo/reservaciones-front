import { useEffect, useState } from "react";
import { Box, Button, Divider, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import HotelPost from "./HotelPost";
import { HotelResponseData } from "../../../../models/HotelModel";
import { useAuth } from "../../../../auth/context/AuthContext";
import { getByUsers } from "../../../../api/hotelApi";
import TblInformation from "../../components/TblInformation";

const HotelList = () => {
    const [hotel, setHotel] = useState<HotelResponseData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const { user, isAuthenticated } = useAuth();

    const fieldTranslations: Record<string, string> = {
        //id: "ID",
        name: "Nombre",
        address: "Dirección",
        city: "Ciudad",
        status: "Estado",
    };

    const fetchHotels = async () => {
        try {
            if (!isAuthenticated || !user) {
                setError("Usuario no logueado");
                return;
            }
            const userId = user.id;
            const response = await getByUsers(userId);
            const hotelData = response?.data.hotel

            if (Array.isArray(hotelData)) {
                setHotel(hotelData);
                setError(null);
            } else {
                setError("Respuesta inválida del servidor.");
            }
        } catch (error) {
            console.error(error);
            setError("Error al cargar los datos");
        }
    };

    useEffect(() => {
        fetchHotels();
    }, [isAuthenticated]);

    const onOpen = () => setOpenModal(true);
    const onClose = () => setOpenModal(false);

    if (error) return <div>{error}</div>;

    return (
        <>
            <Paper elevation={4} sx={{ marginTop: 2, padding: 2 }}>
                <Typography sx={{ mb: 1 }}>Hoteles</Typography>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, mt: 2 }}>
                    <TextField
                        label="Buscar"
                        variant="outlined"
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onOpen}
                    >
                        Nuevo
                    </Button>
                </Box>
                <TblInformation
                    data={hotel}
                    fieldTranslations={fieldTranslations} />
            </Paper >

            {/* Modal para crear nuevo hotel */}
            <HotelPost onCreated={fetchHotels} open={openModal} onOpen={onOpen} onClose={onClose} />
        </>
    );
}

export default HotelList
