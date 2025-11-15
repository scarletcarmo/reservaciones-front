import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    useTheme,
} from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import * as XLSX from 'xlsx';

const Reports: React.FC = () => {
    const theme = useTheme();

    const ingresosMensuales = [
        { month: 'Ene', total: 8000 },
        { month: 'Feb', total: 9500 },
        { month: 'Mar', total: 7200 },
        { month: 'Abr', total: 10200 },
        { month: 'May', total: 11000 },
        { month: 'Jun', total: 8700 },
    ];

    const ocupacionDiaria = [
        { day: 'Lun', value: 60 },
        { day: 'Mar', value: 72 },
        { day: 'Mié', value: 80 },
        { day: 'Jue', value: 68 },
        { day: 'Vie', value: 85 },
        { day: 'Sáb', value: 90 },
        { day: 'Dom', value: 75 },
    ];

    const habitacionesPopulares = [
        { label: 'Suite', value: 35 },
        { label: 'Doble', value: 40 },
        { label: 'Individual', value: 25 },
    ];

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();

        const ingresosSheet = XLSX.utils.json_to_sheet(ingresosMensuales);
        const ocupacionSheet = XLSX.utils.json_to_sheet(ocupacionDiaria);
        const habitacionesSheet = XLSX.utils.json_to_sheet(habitacionesPopulares);

        XLSX.utils.book_append_sheet(workbook, ingresosSheet, 'IngresosMensuales');
        XLSX.utils.book_append_sheet(workbook, ocupacionSheet, 'OcupacionSemanal');
        XLSX.utils.book_append_sheet(workbook, habitacionesSheet, 'HabitacionesPopulares');

        XLSX.writeFile(workbook, 'reportes_hotel.xlsx');
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                    Reportes del Hotel
                </Typography>
                <Button variant="outlined" color="primary" onClick={exportToExcel}>
                    Exportar a Excel
                </Button>
            </Box>

            <Grid container spacing={4}>
                <Grid>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Ingresos por Mes
                        </Typography>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ingresosMensuales.map(i => i.month) }]}
                            series={[{ data: ingresosMensuales.map(i => i.total), label: 'USD' }]}
                            width={500}
                            height={300}
                            colors={[theme.palette.primary.main]}
                        />
                    </Paper>
                </Grid>

                <Grid>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Ocupación semanal (%)
                        </Typography>
                        <LineChart
                            xAxis={[{ scaleType: 'point', data: ocupacionDiaria.map(o => o.day) }]}
                            series={[{ data: ocupacionDiaria.map(o => o.value), label: 'Ocupación' }]}
                            width={500}
                            height={300}
                            colors={[theme.palette.secondary.main]}
                        />
                    </Paper>
                </Grid>

                <Grid>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Tipos de habitaciones más reservadas
                        </Typography>
                        <PieChart
                            series={[{ data: habitacionesPopulares }]}
                            width={400}
                            height={300}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Reports;
