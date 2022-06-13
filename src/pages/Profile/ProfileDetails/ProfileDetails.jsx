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
      <TextField fullWidth type="email" label="Email" />
      <TextField fullWidth type="password" label="Hasło" />
      <Button fullWidth variant="contained" sx={{ m: 1 }}>
        Zapisz
      </Button>
    </Box>
  );
}
