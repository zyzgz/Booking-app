import { AppBar, Box, Toolbar, Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";

export function Menu() {
  const [auth, setAuth] = useAuth();

  const login = (e) => {
    setAuth(true);
  };

  const logout = (e) => {
    setAuth(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit">Home</Button>
          {auth ? (
            <Button color="inherit" onClick={logout}>
              Wyloguj
            </Button>
          ) : (
            <Button color="inherit" onClick={login}>
              Zaloguj
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
