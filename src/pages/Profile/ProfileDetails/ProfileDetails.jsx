import { useEffect, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { ButtonLoading } from "../../../components/UI/ButtonLoading/ButtonLoading";
import { validateEmail } from "../../../helpers/validations";

export function ProfileDetails(props) {
  const [email, setEmail] = useState("backendemail@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const buttonDisabled = Object.values(errorMessage).filter((x) => x).length;

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

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

  return (
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Edytuj dane logowania
      </Typography>
      <TextField
        type="email"
        value={email}
        error={errorMessage.email !== ""}
        helperText={errorMessage.email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        sx={{ minWidth: 430 }}
      />
      <TextField
        type="password"
        helperText={errorMessage.password}
        error={errorMessage.password !== ""}
        onChange={(e) => setPassword(e.target.value)}
        label="Hasło"
        sx={{ minWidth: 430 }}
      />
      {
        <ButtonLoading
          disabled={buttonDisabled}
          loading={loading}
          label="Zapisz"
        />
      }
    </Box>
  );
}
