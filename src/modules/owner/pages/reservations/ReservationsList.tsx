import { Paper, Typography, Divider, List, ListItem, ListItemText, Button, Box } from "@mui/material";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from "react";
import { es } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, parseISO } from "date-fns";

interface Reservation {
    id: string;
    title: string;
    start: string;
    end: string;
}

const locales = { 'es': es };

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => 1, // Lunes como primer día
    getDay,
    locales,
});

const ReservationsList = () => {
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');

    const [reservations, setReservations] = useState<Reservation[]>([
        {
            id: "1",
            title: "Check-in: Familia Pérez - Hotel Hilton",
            start: "2025-09-02",
            end: "2025-09-05",
        },
        {
            id: "2",
            title: "Check-in: Sr. Gómez - Hotel Oro Verde",
            start: "2025-09-07",
            end: "2025-09-10",
        },
        {
            id: "3",
            title: "Check-in: Sra. Martínez - Hotel Wyndham",
            start: "2025-10-06",
            end: "2025-10-08",
        },
    ]);

    const deleteReservation = (id: string) => {
        setReservations((prev) => prev.filter((r) => r.id !== id));
    };

    const events = reservations.map((r) => ({
        id: r.id,
        title: r.title,
        start: new Date(r.start),
        end: new Date(r.end),
    }));

    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    Reservas
                </Typography>
                <Button variant="text" onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}>
                    {viewMode === 'list' ? 'Ver Calendario' : 'Ver Lista'}
                </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {viewMode === 'list' ? (
                reservations.length === 0 ? (
                    <Typography variant="body2">No hay reservas aún.</Typography>
                ) : (
                    <List>
                        {reservations
                            .slice()
                            .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                            .map((r) => (
                                <ListItem
                                    key={r.id}
                                    secondaryAction={
                                        <Button color="error" onClick={() => deleteReservation(r.id)}>
                                            Eliminar
                                        </Button>
                                    }
                                >
                                    <ListItemText
                                        primary={r.title}
                                        secondary={`Desde ${format(parseISO(r.start), 'dd/MM/yyyy')} hasta ${format(parseISO(r.end), 'dd/MM/yyyy')}`}
                                    />
                                </ListItem>
                            ))}
                    </List>
                )
            ) : (
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="month"
                    views={['month']}
                    style={{ height: 500 }}
                    messages={{
                        date: 'Fecha',
                        time: 'Hora',
                        event: 'Evento',
                        allDay: 'Todo el día',
                        week: 'Semana',
                        work_week: 'Semana laboral',
                        day: 'Día',
                        month: 'Mes',
                        previous: 'Anterior',
                        next: 'Siguiente',
                        yesterday: 'Ayer',
                        tomorrow: 'Mañana',
                        today: 'Hoy',
                        agenda: 'Agenda',
                        noEventsInRange: 'No hay eventos en este rango.',
                        showMore: total => `+ Ver más (${total})`,
                    }}
                />
            )}
        </Paper>
    );
};

export default ReservationsList;
