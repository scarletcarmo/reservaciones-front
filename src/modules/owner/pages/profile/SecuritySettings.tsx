import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Stack,
    Alert,
} from '@mui/material';

const SecuritySettings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = () => {
        setError('');
        setSuccess('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('La nueva contraseña y la confirmación no coinciden.');
            return;
        }

        setSuccess('Contraseña cambiada exitosamente.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

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
            <Paper elevation={6} sx={{ p: 5, maxWidth: 600, width: '100%', borderRadius: 3 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    color="primary"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ mb: 3 }}
                >
                    Configuración de Seguridad
                </Typography>

                <Stack spacing={3} mt={3}>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}

                    <TextField
                        label="Contraseña actual"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <TextField
                        label="Nueva contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirmar nueva contraseña"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Cambiar contraseña
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
};

export default SecuritySettings;
