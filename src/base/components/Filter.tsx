import { useState } from "react";
import { Box, Button } from "@mui/material";
import ReservationButton from "../../modules/owner/components/ReservationButton";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

import MUISelect from "./Select";

interface Place {
  title: string;
}

const Filter = () => {
  const [days, setDays] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [destination, setDestination] = useState<Place | null>(null);

  const onFilter = () => {
    console.log("fechas seleccionadas:", days);
    console.log("destino seleccionado:", destination);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Box sx={{ width: "90%" }}>
        {/* CONTENEDOR EN FILA */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">

            {/* FECHAS */}
            <Box sx={{ flex: 4, width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <DateRangePicker
                  localeText={{ start: "Entrada", end: "Salida" }}
                  value={days}
                  onChange={(newValue) => setDays(newValue)}
                  sx={{ width: "100%" }}
                />
              </Box>
            </Box>

            {/* DESTINO */}
            <Box sx={{ flex: 4, width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <MUISelect
                  value={destination}
                  setValue={setDestination}
                />
              </Box>
            </Box>

            {/* BOTÓN */}
            <Box sx={{ flex: 2, width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={onFilter}
                sx={{
                  backgroundColor: "#3E9AF0",
                  "&:hover": { backgroundColor: "#227ACC" },
                  height: "56px",
                }}
              >
                Filtrar
              </Button>
            </Box>

          </LocalizationProvider>
        </Box>

        {/* RESERVATION BUTTON */}
        <Box mt={3}>
          <ReservationButton />
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;
