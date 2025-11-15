import React from 'react';
import { Tabs, Tab, Paper, Box } from '@mui/material';
import ProfileList from './ProfileList';
import HotelProfile from './HotelProfile';
import SecuritySettings from './SecuritySettings';
import PreferencesSettings from './PreferencesSettings';

const ProfilePage: React.FC = () => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                <Tab label="Perfil" />
                <Tab label="Hotel" />
                <Tab label="Seguridad" />
                <Tab label="Preferencias" />
            </Tabs>

            <Box sx={{ mt: 3 }}>
                {tabIndex === 0 && <ProfileList />}
                {tabIndex === 1 && <HotelProfile />}
                {tabIndex === 2 && <SecuritySettings />}
                {tabIndex === 3 && <PreferencesSettings />}
            </Box>
        </Paper>
    );
};

export default ProfilePage;
