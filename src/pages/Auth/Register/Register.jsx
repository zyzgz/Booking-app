import {
  Alert,
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  TextField,
} from "@mui/material";
import { ButtonLoading } from "../../../components/UI/ButtonLoading/ButtonLoading";
import { validateEmail } from "../../../helpers/validations";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useState, useEffect } from "react";

export function Register(props) {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();

  useEffect(() => {
    if (validateEmail(email)) {
      setErrorMessage({ ...errorMessage, email: "" });
    } else {
      setErrorMessage({ ...errorMessage, email: "Niepoprawny email" });
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 5 || !password) {
      setErrorMessage({ ...errorMessage, password: "" });
    } else {
      setErrorMessage({
        ...errorMessage,
        password: "Wymagane co najmniej 6 znaków",
      });
    }
  }, [password]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_SIGN_UP_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      navigate("/");
    } catch (err) {
      setError(err.response.data.error.message);
    }

    if (auth) {
      navigate("/");
    }

    setLoading(false);
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
          {error ? (
            <Alert severity="error" sx={{ mb: 2, width: 370 }}>
              {error}
            </Alert>
          ) : null}
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
