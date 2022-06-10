import { Link, Outlet } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export function Profile(props) {
  return (
    <Card>
      <CardHeader title="Mój profil" />
      <CardContent>
        <Toolbar>
          <Button component={Link} to="">
            Profil
          </Button>
          <Button component={Link} to="hotele">
            Hotele
          </Button>
        </Toolbar>

        <Box>
          <Outlet />
        </Box>
      </CardContent>
    </Card>
  );
}
