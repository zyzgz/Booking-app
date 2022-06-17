import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function MyHotels(props) {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/profil/hotele/dodaj-nowy-hotel");
  };

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
      <Button
        onClick={navigateTo}
        variant="contained"
        sx={{ m: 1, width: "25ch" }}
      >
        Dodaj hotel
      </Button>
    </Box>
  );
}
