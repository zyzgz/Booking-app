import { useEffect, useState } from "react";
import { Box, TextField, Typography, Alert, Grid } from "@mui/material";
import { ButtonLoading } from "../../../components/UI/ButtonLoading/ButtonLoading";
import { validateEmail } from "../../../helpers/validations";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

export function ProfileDetails(props) {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const buttonDisabled = Object.values(errorMessage).filter((x) => x).length;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        idToken: auth.token,
        email: email,
        returnSecureToken: true,
      };
      if (password) {
        data.password = password;
      }

      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_SIGN_UP_KEY}`,
        data
      );

      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      setSuccess(true);
    } catch (err) {
      setError(true);
      setSuccess(false);
    }

    setLoading(false);
  };

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

  return (
    <Grid
      item
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
      xs={10}
      sm={6}
      md={5}
      lg={4}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Edytuj dane logowania
      </Typography>
      {success ? (
        <Alert sx={{ mb: 2, width: 370 }}>
          Dane logowania zostały zmienione
        </Alert>
      ) : null}
      {error ? (
        <Alert severity="error" sx={{ mb: 2, width: 370 }}>
          Wystąpił błąd - spróbuj ponownie później
        </Alert>
      ) : null}
      <TextField
        type="email"
        value={email}
        error={errorMessage.email !== ""}
        helperText={errorMessage.email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        fullWidth
      />
      <TextField
        type="password"
        helperText={errorMessage.password}
        error={errorMessage.password !== ""}
        onChange={(e) => setPassword(e.target.value)}
        label="Hasło"
        fullWidth
      />
      <ButtonLoading
        disabled={buttonDisabled}
        loading={loading}
        label="Zapisz"
      />
    </Grid>
  );
}
