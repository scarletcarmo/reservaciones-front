import { Box, IconButton, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { format } from "date-fns";

interface Props {
    currentMonth: Date;
    gotoPrevious: () => void;
    gotoNext: () => void;
    gotoToday: () => void;
}

const CalendarHeader = ({ currentMonth, gotoPrevious, gotoNext, gotoToday }: Props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
                <IconButton onClick={gotoPrevious} size="small">
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton onClick={gotoNext} size="small">
                    <ArrowForwardIosIcon />
                </IconButton>
                <Button onClick={gotoToday} sx={{ ml: 1 }} size="small">
                    Hoy
                </Button>
            </Box>
            <Typography variant="h6">
                {format(currentMonth, 'MMMM yyyy')}
            </Typography>
            <Box />
        </Box>
    )
}

export default CalendarHeader
