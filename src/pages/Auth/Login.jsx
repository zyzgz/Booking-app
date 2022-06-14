import { Box, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ButtonLoading } from "../../components/UI/ButtonLoading/ButtonLoading";

export function Login() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Logowanie
      setAuth(true);
      navigate("/");
    }, 500);
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={submit}
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { m: 1 },
          justifyContent: "center",
          alignItems: "center",
        }}
        autoComplete="off"
      >
        <Typography variant="h3" sx={{ m: 2 }}>
          Logowanie
        </Typography>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          sx={{ minWidth: 430 }}
        />
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Hasło"
          sx={{ minWidth: 430 }}
        />
        {<ButtonLoading loading={loading} label="Zaloguj" />}
      </Box>
    </Container>
  );
}
