import { Link, Outlet } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";

export function Profile(props) {
  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <CardHeader title="Mój profil" />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Toolbar sx={{ backgroundColor: "#f0f0f0", width: "90%" }}>
            <Button component={Link} to="">
              Profil
            </Button>
            <Button component={Link} to="hotele">
              Hotele
            </Button>
          </Toolbar>

          <Box
            sx={{
              minHeight: "27vh",
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Outlet />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
