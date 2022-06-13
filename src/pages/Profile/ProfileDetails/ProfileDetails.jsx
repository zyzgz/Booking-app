import { Box, Button, TextField, Typography } from "@mui/material";

export function ProfileDetails(props) {
  return (
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Edytuj dane logowania
      </Typography>
      <TextField type="email" label="Email" sx={{ minWidth: 400 }} />
      <TextField type="password" label="Hasło" sx={{ minWidth: 400 }} />
      <Button variant="contained" sx={{ m: 1, minWidth: 400 }}>
        Zapisz
      </Button>
    </Box>
  );
}
