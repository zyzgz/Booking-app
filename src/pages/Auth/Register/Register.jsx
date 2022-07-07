import {
  Alert,
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { ButtonLoading } from "../../../components/UI/ButtonLoading/ButtonLoading";
import useAuth from "../../../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useState, useEffect } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email musi być prawidłowym adresem email")
    .required("Email jest wymagany"),
  password: yup
    .string()
    .min(6, "Hasło musi zawierac co najmniej 6 znaków")
    .required("Hasło jest wymagane"),
});

export function Register(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState();

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formSubmitHandler = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_SIGN_UP_KEY}`,
        {
          email: data.email,
          password: data.password,
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
      if (err.response.data.error.message === "EMAIL_EXISTS")
        setError("Konto o podanym emailu już istnieje");
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
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            component="form"
            onSubmit={handleSubmit(formSubmitHandler)}
            sx={{
              display: "flex",
              flexDirection: "column",
              "& .MuiTextField-root": { m: 1 },
              justifyContent: "center",
              alignItems: "center",
              py: 5,
            }}
            autoComplete="off"
            xs={10}
            sm={6}
            md={5}
            lg={4}
          >
            {error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : null}{" "}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ""}
                  fullWidth
                  autoComplete="off"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Hasło"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password?.message : ""}
                  fullWidth
                  autoComplete="off"
                />
              )}
            />
            <ButtonLoading
              loading={loading}
              label="Zarejestruj"
              color="success"
            />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
