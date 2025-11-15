import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const CardInformation = () => {
  return (
    <Box
      sx={{
        //height: "100vh", // Altura de la pantalla
        display: "flex",
        justifyContent: "center", // Centra horizontalmente
        alignItems: "center", // Centra verticalmente
        //backgroundColor: "#f5f5f5", // Opcional: fondo claro
      }}
    >
      <Card sx={{ maxWidth: 550, maxHeight: 350 }}>

        <CardMedia component="img" height="194" image="/logo.png" alt="Logo" />
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "text.primary" }}
            
          >
            ¿Qué buscas cuando reservas un hotel?
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Contesta cinco preguntas básicas sobre tus preferencias para que
            podamos personalizar tu próxima búsqueda de hotel.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            sx={{
              background: "#1976d2",
              width: "100%",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1565c0", // Azul más oscuro para el hover
              },
            }}
          >
            Comenzar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CardInformation;
