import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    FormControlLabel,
    Switch,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
    Button,
} from '@mui/material';

const PreferencesSettings: React.FC = () => {
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('es');
    const [theme, setTheme] = useState('light');

    const handleSave = () => {
        console.log('Preferencias guardadas:', {
            notifications,
            language,
            theme,
        });
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
                >
                    Preferencias del Usuario
                </Typography>

                <Stack spacing={4} mt={4}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                            />
                        }
                        label="Recibir notificaciones por correo"
                    />

                    <FormControl fullWidth>
                        <InputLabel id="language-label">Idioma</InputLabel>
                        <Select
                            labelId="language-label"
                            value={language}
                            label="Idioma"
                            onChange={(e) => setLanguage(e.target.value)}
                        >
                            <MenuItem value="es">Español</MenuItem>
                            <MenuItem value="en">Inglés</MenuItem>
                            <MenuItem value="fr">Francés</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="theme-label">Tema</InputLabel>
                        <Select
                            labelId="theme-label"
                            value={theme}
                            label="Tema"
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <MenuItem value="light">Claro</MenuItem>
                            <MenuItem value="dark">Oscuro</MenuItem>
                        </Select>
                    </FormControl>

                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Guardar preferencias
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
};

export default PreferencesSettings;
