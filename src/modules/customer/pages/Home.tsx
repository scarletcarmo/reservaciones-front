import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../auth/context/AuthContext";
import Filter from "../../../base/components/Filter";
import RoomsCard from "../components/RoomsCard";
import useRooms from "../hooks/useRooms";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const Home = () => {
  const { user } = useAuth();
  const { rooms, loading } = useRooms();

  console.log("HABITACIONES___", rooms);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        Hola <span style={{ color: "#1976d2" }}>{user?.username}</span>, ¿Dónde quieres hospedarte hoy?
      </Typography>
      {/**FILTRO */}
      <Filter />
      {/**CARD HABITACIONES */}
      {  /*<Carousel
        responsive={responsive}
      >
         <Box
          sx={{
            mt: 4
          }}
        >
          {rooms.map((room: any) => (
            <RoomsCard
              key={room.hotel_id}
              id={room.hotel_id}
              name={room.name}
              type={room.type}
              price_per_night={room.price_per_night}
              max_users={room.max_users}
              num_beds={room.num_beds}
              image="https://images.unsplash.com/photo-1618773928121-c32242e63f88?w=800&q=80"
              onReserve={(id) => console.log("Reservar habitación", id)}
            />
          ))}
        </Box>
      </Carousel>*/}
    </Box >
  );
};

export default Home;
