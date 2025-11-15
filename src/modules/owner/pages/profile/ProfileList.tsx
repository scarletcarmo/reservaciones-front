import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    TextField,
    Grid,
    Paper,
    Button,
    Stack,
} from '@mui/material';

const ProfileList: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e3f2fd',
                p: 3,
            }}
        >
            <Paper elevation={6} sx={{ p: 5, maxWidth: 700, width: '100%', borderRadius: 3 }}>
                <Typography variant="h5" gutterBottom color="primary" fontWeight="bold" textAlign="center" sx={{mb: 3}}>
                    Perfil del Propietario
                </Typography>

                <Grid container spacing={4} alignItems="center" justifyContent="center">
                    <Grid>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Avatar
                                alt="Hotel Owner"
                                src="/assets/user.png"
                                sx={{ width: 120, height: 120, mb: 2, borderRadius: 2 }}
                            />
                            <Button variant="outlined" size="small" color="primary">
                                Cambiar foto
                            </Button>
                        </Box>
                    </Grid>

                    <Grid>
                        <Stack spacing={3}>
                            <TextField
                                label="Nombre completo"
                                defaultValue="Juan Pérez"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Correo electrónico"
                                defaultValue="juan@email.com"
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Teléfono"
                                defaultValue="+34 123 456 789"
                                fullWidth
                                variant="outlined"
                            />
                            <Box display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary">
                                    Guardar cambios
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ProfileList;
