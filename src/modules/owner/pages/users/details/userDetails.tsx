import { Container, Typography } from "@mui/material";
import CardInformation from "../../../../../base/components/CardInformation";

const UserDetails = () => {
  return (
    <>
      <Container>
        <CardInformation />
        <Typography>Elije un avatar</Typography>
        <Typography>Informacion personal</Typography>
      </Container>
    </>
  );
};

export default UserDetails;
