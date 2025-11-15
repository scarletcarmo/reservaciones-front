import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserForm from "../../../../../auth/hooks/useUserForm";

interface FormData {
  id?: number;
  username: string;
  password: string;
  email: string;
  role_id: number;
}
const UserPut = () => {
  const { userForm, onChange, updateUser, getUserById } = useUserForm<FormData>({
    id: 0,
    username: "",
    password: "",
    email: "",
    role_id: 0,
  });
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { id } = useParams();

  //id: se obtiene de useParams(), y si cambia
  //(por ejemplo, el componente se vuelve a montar con otra URL),
  //se vuelve a ejecutar el efecto.
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await getUserById(Number(id));
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  //se ejecuta cada vez que cambia userForm
  useEffect(() => {
    console.log("userForm updated:", userForm);
  }, [userForm]);

  const onSubmit = async (e: React.FormEvent) => {
    const success = await updateUser(e);
    if (success) {
      setSnackbarMessage("Usuario editado exitosamente");
      setOpenSnackbar(true);
      //setTimeout(() => navigate("/users/list"), 1500);
    } else {
      setSnackbarMessage("Hubo un error al editar el usuario");
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return <Typography>Cargando datos del usuario...</Typography>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#ffffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: 4,
        p: 3,
      }}
    >
      <form key={userForm.id} onSubmit={onSubmit}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Editar usuario: {userForm.username}
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Usuario"
            name="username"
            value={userForm.username || ""}
            onChange={onChange}
            required
          />
        </FormControl>
        {/*<FormControl fullWidth margin="normal">
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={userForm.password}
          onChange={onChange}
          required
        />
      </FormControl>*/}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Correo Electrónico"
            name="email"
            type="email"
            value={userForm.email || ""}
            onChange={onChange}
            required
          />
        </FormControl>

        {/*<FormControl fullWidth margin="normal">
        <FormLabel component="legend">Rol</FormLabel>
        <Select name="rol" value={userForm.rol} onChange={onChange} required>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="guest">Guest</MenuItem>
        </Select>
      </FormControl>*/}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Enviar
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        {/*<button type="button" onClick={onResetForm}>
        Limpiar formulario
      </button>*/}
      </form>
    </Box>
  );
};

export default UserPut;
