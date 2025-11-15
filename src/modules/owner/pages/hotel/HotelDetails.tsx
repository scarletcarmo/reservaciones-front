import { Box, Fade, Modal, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from "@mui/icons-material/Close";

interface HotelProps {
    openDetails: boolean;
    onClose: () => void;
    selectedRow?: Record<string, any> | null;
    fieldTranslations?: Record<string, string>;
}
const HotelDetails: React.FC<HotelProps> = ({
    openDetails,
    onClose,
    selectedRow,
    fieldTranslations,
}) => {
    // Ubica el Box al 50% desde arriba del contenedorleft: '50%',   
    // Ubica el Box al 50% desde la izquierda del contenedor
    return (
        <>
            <Modal open={openDetails} onClose={onClose}>
                <Fade in={openDetails}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '90vw',
                            maxWidth: 350,
                            maxHeight: 450,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 24,
                            overflow: 'hidden', // importante para que la barra azul quede dentro
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                color: 'grey.500',
                                '&:hover': {
                                    color: 'grey.600',
                                    backgroundColor: 'transparent'
                                }
                            }}
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="small" />
                        </Box>
                        {/* Barra superior azul */}
                        <Box
                            sx={{
                                bgcolor: 'primary.main',
                                color: '#fff',
                                p: 2,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                        >
                            Detalles del registro
                        </Box>

                        <Box sx={{ p: 4, overflowY: 'auto' }}>
                            {selectedRow ? (
                                <Box>
                                    {Object.entries(selectedRow)
                                        .filter(([key]) => key !== 'id'  && key !== 'user')
                                        .map(([key, value]) => (
                                            <Box
                                                key={key}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    py: 1,
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    {fieldTranslations?.[key] || key}
                                                </Typography>
                                                <Typography variant="body2">{String(value)}</Typography>
                                            </Box>
                                        ))}
                                </Box>
                            ) : (
                                <Typography>No hay datos seleccionados.</Typography>
                            )}

                            {/* Botón de cerrar */}
                            {/*<Box sx={{ mt: 2, textAlign: 'right' }}>
                                <Button variant="contained" onClick={onClose}>
                                    Cerrar
                                </Button>
                            </Box>*/}
                        </Box>
                    </Box>
                </Fade>
            </Modal>

        </>
    )
}

export default HotelDetails
