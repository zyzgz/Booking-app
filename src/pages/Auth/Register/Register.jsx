import {
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { ButtonLoading } from "../../../components/UI/ButtonLoading/ButtonLoading";
import { validateEmail } from "../../../helpers/validations";
import axios from "../../../axios";

import { useState, useEffect } from "react";

export function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (validateEmail(email)) {
      setErrorMessage({ ...errorMessage, email: "" });
    } else {
      setErrorMessage({ ...errorMessage, email: "Niepoprawny email" });
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 4 || !password) {
      setErrorMessage({ ...errorMessage, password: "" });
    } else {
      setErrorMessage({
        ...errorMessage,
        password: "Wymagane co najmniej 5 znaków",
      });
    }
  }, [password]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await axios.get("/users.json");
    console.log(res.data);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <CardHeader title="Rejestracja" />
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
          <TextField
            type="email"
            error={errorMessage.email !== ""}
            helperText={errorMessage.email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            sx={{ minWidth: 400 }}
          />
          <TextField
            type="password"
            helperText={errorMessage.password}
            error={errorMessage.password !== ""}
            onChange={(e) => setPassword(e.target.value)}
            label="Hasło"
            sx={{ minWidth: 400 }}
          />
          {
            <ButtonLoading
              loading={loading}
              label="Zarejestruj"
              color="success"
            />
          }
        </Box>
      </Card>
    </Container>
  );
}
