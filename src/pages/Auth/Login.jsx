import {
  Container,
  TextField,
  Alert,
  Card,
  CardHeader,
  Divider,
  Grid,
} from "@mui/material";
import { ButtonLoading } from "../../components/UI/ButtonLoading/ButtonLoading";
import useAuth from "../../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Login() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(null);

  const { control, handleSubmit } = useForm();

  const formSubmitHandler = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_SIGN_UP_KEY}`,
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
      setValid(false);
      setLoading(false);
    }
    setLoading(false);
  };

  if (auth) {
    navigate("/");
  }

  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <CardHeader title="Logowanie" />
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
            {valid === false ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                Niepoprawne dane logowania
              </Alert>
            ) : null}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
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
                  fullWidth
                  autoComplete="off"
                />
              )}
            />
            <ButtonLoading loading={loading} label="Zaloguj" />
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
