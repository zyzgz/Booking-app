import { AppBar, Box, Toolbar, Button } from "@mui/material";

export function Menu() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button color="inherit">Home</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
