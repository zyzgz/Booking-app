import {
  Box,
  Container,
  TextField,
  Alert,
  Card,
  CardHeader,
  Divider,
} from "@mui/material";
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
  const [valid, setValid] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (true) {
        setAuth(true);
        navigate("/");
      } else {
        setValid(false);
        setPassword("");
      }

      setLoading(false);
    }, 500);
  };

  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <CardHeader title="Logowanie" />
        <Divider />

        <Box
          component="form"
          onSubmit={submit}
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { m: 1 },
            justifyContent: "center",
            alignItems: "center",
            py: 5,
          }}
          autoComplete="off"
        >
          {valid === false ? (
            <Alert severity="error" sx={{ mb: 2, minWidth: 400 }}>
              Niepoprawne dane logowania
            </Alert>
          ) : null}
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            sx={{ minWidth: 400 }}
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Hasło"
            sx={{ minWidth: 400 }}
          />
          {<ButtonLoading loading={loading} label="Zaloguj" />}
        </Box>
      </Card>
    </Container>
  );
}
