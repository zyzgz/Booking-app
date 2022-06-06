import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

export function Menu() {
  const auth = useContext(authContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit">Home</Button>
          {auth.isAuthenticated ? (
            <Button color="inherit" onClick={auth.logout}>
              Wyloguj
            </Button>
          ) : (
            <Button color="inherit" onClick={auth.login}>
              Zaloguj
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
