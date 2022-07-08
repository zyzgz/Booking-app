// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar, Box, Button, TextField, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import styles from "./Searchbar.module.css";

export function Searchbar(props) {
  return (
    <Container>
      <AppBar sx={{ backgroundColor: "white" }} position="static">
        <Toolbar className={styles.toolbar}>
          <Box className={styles.searchItem}>
            <HotelIcon className={styles.icon} />
            <TextField size="small" label="Dokąd się wybierasz?" />
          </Box>
          <Box className={styles.searchItem}>
            <CalendarMonthIcon className={styles.icon} />
            <span className={styles.span}>Zameldowanie - Wymeldowanie</span>
          </Box>
          <Box className={styles.searchItem}>
            <PersonIcon className={styles.icon} />
            <span className={styles.span}>
              2 dorosłych · 0 dzieci · 1 pokój
            </span>
          </Box>
          <Box className={styles.searchItem}>
            <Button variant="contained" color="success">
              Szukaj
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
  // const [term, setTerm] = useState("");
  // const history = useNavigate(props);

  // const search = () => {
  //   history(`/wyszukaj/${term}`);
  // };

  // const updateTerm = (e) => {
  //   setTerm(e.target.value);
  // };

  // const onKeyDownHandler = (e) => {
  //   if (e.key === "Enter") {
  //     search();
  //   }
  // };

  // return (
  //   <Box sx={{ backgroundColor: "#fefb", px: 1, py: 1.3, borderRadius: 3.5 }}>
  //     <TextField
  //       value={term}
  //       onKeyDown={onKeyDownHandler}
  //       onChange={updateTerm}
  //       size="small"
  //       sx={{ mr: 1 }}
  //       label="Wyszukaj hotelu..."
  //     />
  //     <Button variant="contained" onClick={search}>
  //       Szukaj
  //     </Button>
  //   </Box>
  // );
}
