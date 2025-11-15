import { Alert, Avatar, Box, Button, CircularProgress, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import LockIcon from "@mui/icons-material/Lock";
import { useEffect, useState } from "react";
import messages from "../base/constants/messages.json";
import { useAuthActions } from "./hooks/useAuthActions";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export interface FormData {
  username: string;
  password: string;
  email: string;
  role_id: string | number;
}

const Register = () => {
  const { isLoading, userForm, roleList, register, getRoles, onChange, isPasswordVisible, handleMouseDownPassword, handleClickShowPassword } =
    useAuthActions<FormData>({
      username: "",
      password: "",
      email: "",
      role_id: "",
    });

  const [message, setMessage] = useState("");

  useEffect(() => {
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register();
    console.log("sms - resView: ", response);

    //e.preventDefault();
    try {

      if (response) {
        setMessage(messages.common.register.success.replace("{email}", userForm.email));
      } else {
        setMessage(messages.common.register.error);
      }

    } catch (error) {
      setMessage(messages.common.register.error);
    }
  }

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ marginTop: 8, padding: 2 }}>
          <Avatar
            sx={{
              mx: "auto",
              bgcolor: "secondary.main",
              textAlign: "center",
              mb: 1,
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
            Registrate
          </Typography>
          {/* Mensaje */}
          {message && (
            <Alert severity="success" sx={{ mt: 1, mb: 2, textAlign: "center" }}>
              {message}
            </Alert>
          )}
          <Box component="form" sx={{ mt: 2 }} noValidate>
            <TextField
              name="username"
              placeholder="Ingrese su usuario"
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
              value={userForm.username}
              onChange={onChange}
            />
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
              autoFocus
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
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-simple-select-autowidth-label">Rol</InputLabel>
              <Select
                id="role-select"
                labelId="role-select-label"
                value={userForm.role_id}
                label="roles"
                name="role_id"
                onChange={onChange}
              >
                {roleList.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              onClick={onRegister}
              fullWidth
              sx={{ mt: 1 }}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            >
              {isLoading ? "Cargando..." : "Registrarse"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Register
