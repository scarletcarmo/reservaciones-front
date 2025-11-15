
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Stack,
  Chip,
  Divider,
  Grid
} from '@mui/material';
import { useAuth } from '../../../auth/context/AuthContext';
import { BarChart } from '@mui/x-charts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import HotelIcon from '@mui/icons-material/Hotel';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';

const OwnerDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  const reservas = [
    { cliente: 'Juan Pérez', fecha: '2025-08-20', estado: 'Confirmada' },
    { cliente: 'María Gómez', fecha: '2025-08-25', estado: 'Pendiente' },
    { cliente: 'Carlos Ruiz', fecha: '2025-08-27', estado: 'Cancelada' },
  ];

  const getEstadoChipColor = (estado: string) => {
    switch (estado) {
      case 'Confirmada':
        return 'success';
      case 'Pendiente':
        return 'warning';
      case 'Cancelada':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/*<Typography variant="h4" gutterBottom>
        Bienvenido, {isAuth.username}
      </Typography>*/}

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Resumen de Reservas
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#e3f2fd',
              }}
            >
              <HotelIcon color="primary" />
              <Box>
                <Typography variant="body2">Reservas activas</Typography>
                <Typography variant="h6">25</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#f3e5f5',
              }}
            >
              <EventAvailableIcon color="secondary" />
              <Box>
                <Typography variant="body2">Próximas reservas</Typography>
                <Typography variant="h6">5</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#e8f5e9',
              }}
            >
              <AttachMoneyIcon sx={{ color: 'green' }} />
              <Box>
                <Typography variant="body2">Ingresos este mes</Typography>
                <Typography variant="h6">$12,000</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: '#fff3e0',
              }}
            >
              <BedIcon sx={{ color: '#ff9800' }} />
              <Box>
                <Typography variant="body2">Habitaciones ocupadas</Typography>
                <Typography variant="h6">18 / 30</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Reservas recientes
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell><strong>Cliente</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reservas.map((reserva, index) => (
              <TableRow key={index} hover>
                <TableCell>{reserva.cliente}</TableCell>
                <TableCell>
                  {format(new Date(reserva.fecha), "dd 'de' MMMM yyyy", { locale: es })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={reserva.estado}
                    color={getEstadoChipColor(reserva.estado)}
                    variant="filled"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Reservas por Mes
        </Typography>
        <BarChart
          xAxis={[
            {
              id: 'months',
              data: [
                'Ene', 'Feb', 'Mar', 'Abr', 'May',
                'Jun', 'Jul', 'Ago', 'Sep',
              ],
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: [45, 38, 52, 60, 55, 70, 80, 76, 65],
              label: 'Reservas',
              color: '#1976d2',
            },
          ]}
          width={700}
          height={300}
        />
      </Paper>

      {/*<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" color="primary">
          Crear nueva reserva
        </Button>
        <Button variant="outlined" color="primary">
          Gestionar habitaciones
        </Button>
        <Button variant="outlined" color="secondary">
          Ver reportes
        </Button>
      </Stack>*/}
    </Box>
  );
};

export default OwnerDashboard;

/**Es la página principal o la página de inicio que puede ver cualquier usuario (o visitante).

Puede tener contenido general, bienvenida, promoción, búsqueda, etc.

En apps grandes, la Home suele ser más genérica o pública (por ejemplo, la página principal de un sitio web).

Dashboard

Es una página más especializada, enfocada en mostrar un resumen, métricas, controles o información relevante para el usuario autenticado.

Se usa normalmente en apps internas o paneles de administración.

Suele tener gráficos, estadísticas, listas rápidas de tareas o datos importantes.

Acceso restringido a usuarios con permisos o roles específicos (por ejemplo, dueños, admins, managers). */