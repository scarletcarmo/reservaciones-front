import { Box, Typography } from "@mui/material";
import { useAuth } from "../../../auth/context/AuthContext";
import Filter from "../../../base/components/Filter";
import RoomsCard from "../components/RoomsCard";
import useRooms from "../hooks/useRooms";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import img1 from "../../../assets/logo.png";
import img2 from "../../../assets/logo192.png";
import img3 from "../../../assets/logo512.png";

const Home = () => {
  const { user } = useAuth();
  const { rooms } = useRooms();

  console.log("HABITACIONES___", rooms);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2
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

    <>
      <Box
        sx={{
          px: 0,
          py: 4,
          display: "flex",
          flexDirection: "column",
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 3,
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            textAlign: "center"
          }}
        >
          Hola <span style={{ color: "#1976d2" }}>{user?.username}</span>, ¿Dónde quieres hospedarte hoy?
        </Typography>
        {/**FILTRO */}
        <Filter />
        {/**CARD HABITACIONES */}
        <Box sx={{ width: "80%" }}>
          <Carousel responsive={responsive} arrows={true}>
            {rooms.map((room: any) => (
              <RoomsCard
                id={room.id}
                name={room.name}
                type={room.type}
                price_per_night={room.price_per_night}
                max_users={room.max_users}
                num_beds={room.num_beds}
                images={[img1, img2, img3]}
              />
            ))}
          </Carousel>
        </Box>
      </Box>
    </>
  );
};

export default Home;
