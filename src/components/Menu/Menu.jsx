import { NavLink } from "react-router-dom";
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
          <Button component={NavLink} to="/" color="inherit">
            Home
          </Button>
          {auth ? (
            <>
              <Button component={NavLink} to="/profil" color="inherit">
                Mój profil
              </Button>
              <Button color="inherit" onClick={logout}>
                Wyloguj
              </Button>
            </>
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
