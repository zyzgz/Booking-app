import { Box, Button, Typography } from "@mui/material";

export function MyHotels(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Nie masz jeszcze żadnego hotelu.</Typography>
      <Button variant="contained" sx={{ m: 1, width: "25ch" }}>
        Dodaj hotel
      </Button>
    </Box>
  );
}
