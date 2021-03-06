import { NavLink } from "react-router-dom";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import useAuth from "../../../hooks/useAuth";

export function Menu() {
  const [auth, setAuth] = useAuth();

  const logout = (e) => {
    setAuth(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button component={NavLink} to="/" color="inherit">
            Hotele
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
            <>
              <Button component={NavLink} to="/rejestracja" color="inherit">
                Zarejestruj
              </Button>
              <Button component={NavLink} to="/zaloguj" color="inherit">
                Zaloguj
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
