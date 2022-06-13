import { Box, Container, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export function NotFound(props) {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "15vh",
        }}
      >
        <WarningAmberIcon fontSize="large" color="warning" />
        <Typography variant="h4" mt={2} sx={{ textDecoration: "underline" }}>
          Nie znaleziono takiej strony
        </Typography>
      </Box>
    </Container>
  );
}
