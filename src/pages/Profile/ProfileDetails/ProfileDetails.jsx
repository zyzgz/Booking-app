import { Box, Button, TextField } from "@mui/material";

export function ProfileDetails(props) {
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": { m: 1 },
      }}
      autoComplete="off"
    >
      <TextField type="email" label="email" value="somemail@gmail.com" />
      <TextField type="password" label="password" />
      <Button variant="contained" sx={{ m: 1, width: "15ch" }}>
        Zapisz
      </Button>
    </Box>
  );
}
