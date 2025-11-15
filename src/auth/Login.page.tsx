import {
  TextField,
  Typography,
  Container,
  Paper,
  Avatar,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
//import GoogleIcon from "@mui/icons-material/Google";
//import FacebookIcon from "@mui/icons-material/Facebook";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import messages from "../base/constants/messages.json";
import { useAuthActions } from "./hooks/useAuthActions";

//definimos la estructura de nuestra data
export interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { userForm, login, onChange, isLoading, handleClickShowPassword, handleMouseDownPassword, isPasswordVisible } =
    useAuthActions<FormData>({
      password: "",
      email: "",
    });

  const [message, setMessage] = useState("");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login();
    
    console.log("login ", response);
    
    if (response.code === 200) {
      setMessage(messages.common.login.success.replace("{email}", userForm.email));
    } else if (response.code === 401) {
      setMessage(response.message);
    } else {
      setMessage(response.message || "Error al iniciar sesión");
    }
  };


  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ marginTop: 8, padding: 2 }}>
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "primary.main",
              textAlign: "center",
              mb: 1,
              mt: 2,
            }}
          >
            <LockIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: "center",
            }}
          >
            Iniciar Sesion
          </Typography>
          {/* Mensaje de bienvenida */}
          {message && (
            <Alert severity="success" sx={{ mb: 2, textAlign: "center" }}>
              {message}
            </Alert>
          )}
          <Box component="form" onSubmit={onLogin} sx={{ mt: 2 }} noValidate>
            <TextField
              name="email"
              placeholder="Ingrese su correo"
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
              value={userForm.email}
              onChange={onChange}
            />
            <TextField
              name="password"
              placeholder="Ingrese la contraseña"
              fullWidth
              required
              type={isPasswordVisible ? "text" : "password"}
              value={userForm.password}
              onChange={onChange}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar contraseña"
            ></FormControlLabel>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            >
              {isLoading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
            <Grid container justifyContent={"space-between"} sx={{ mt: 2 }}>
              <Link variant="caption">No tienes cuenta? Registrate</Link>
              <Link variant="caption">Olvidaste la contraseña</Link>
            </Grid>{" "}
            {/* <Button
              type="button"
              variant="contained"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => login({ provider: "google" })}
            >
              Iniciar Sesión con Google
            </Button>*/}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
