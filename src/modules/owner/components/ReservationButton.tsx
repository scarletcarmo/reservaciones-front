import BedIcon from "@mui/icons-material/Bed";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
//import Favorite from "@mui/icons-material/FavoriteBorderOutlined";
import Favorite from "@mui/icons-material/Favorite";

const ReservationButton = () => {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [pet, setPets] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onCheckboxPets = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPets(e.target.checked);
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        onClick={onOpen}
        startIcon={<BedIcon />}
        endIcon={<PersonIcon />}
        sx={{
          backgroundColor: "#3E9AF0",
          "&:hover": { backgroundColor: "#227ACC" }
        }}
      >
        {rooms} Habitación{rooms > 1 ? "es" : ""} · {adults + kids} Persona
        {adults + kids > 1 ? "s" : ""}
      </Button>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Sección habitaciones */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography>Habitaciones</Typography>
              <Box>
                <IconButton onClick={() => setRooms(Math.max(1, rooms - 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography component="span">{rooms}</Typography>
                <IconButton onClick={() => setRooms(rooms + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            {/* Sección Adultos */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            //mt={2}
            >
              <Typography>Adultos</Typography>
              <Box>
                <IconButton onClick={() => setAdults(Math.max(1, adults - 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography component="span">{adults}</Typography>
                <IconButton onClick={() => setAdults(adults + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            {/* Sección Niños */}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            //mt={2}
            >
              <Typography>Niños</Typography>
              <Box>
                <IconButton onClick={() => setKids(Math.max(1, kids - 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography component="span">{kids}</Typography>
                <IconButton onClick={() => setKids(kids + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            {/* Sección mascotas */}
            <FormControlLabel
              label="¿Viajas con mascotas?"
              labelPlacement="start"
              control={
                <Checkbox
                  checked={pet}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  onChange={onCheckboxPets}
                  name="pets"
                  color="error"
                />
              }
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationButton;
