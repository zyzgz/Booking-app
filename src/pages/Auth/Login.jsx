import { Box, Button, Container, TextField, Typography } from "@mui/material";

export function Login() {
  return (
    <Container>
      <Box
        component="form"
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
        <TextField type="email" label="Email" sx={{ minWidth: 430 }} />
        <TextField type="password" label="Hasło" sx={{ minWidth: 430 }} />
        <Button variant="contained" sx={{ m: 1, minWidth: 430 }}>
          Zaloguj
        </Button>
      </Box>
    </Container>
  );
}
