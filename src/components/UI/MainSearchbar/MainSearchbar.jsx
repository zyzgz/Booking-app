// import { useState } from "react";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  IconButton,
  TextField,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Container } from "@mui/system";
import styles from "./MainSearchbar.module.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export function MainSearchbar(props) {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });
  const [term, setTerm] = useState("");
  const history = useNavigate(props);

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const search = () => {
    history(`/wyszukaj/${term}`);
  };

  const updateTerm = (e) => {
    setTerm(e.target.value);
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:
          operation === "increase" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <Container>
      <AppBar sx={{ backgroundColor: "white" }} position="static">
        <Toolbar className={styles.toolbar}>
          <Box className={styles.searchItem}>
            <HotelIcon className={styles.icon} />
            <TextField
              onChange={updateTerm}
              onKeyDown={onKeyDownHandler}
              size="small"
              label="Dokąd się wybierasz?"
            />
          </Box>
          <Box className={styles.searchItem}>
            <CalendarMonthIcon className={styles.icon} />
            <span
              onClick={() => setOpenDate(!openDate)}
              className={styles.span}
            >{`od ${format(date[0].startDate, "dd/MM/yyyy")} do ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <ClickAwayListener onClickAway={() => setOpenDate(false)}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className={styles.date}
                />
              </ClickAwayListener>
            )}
          </Box>
          <Box className={styles.searchItem}>
            <PersonIcon className={styles.icon} />
            <span
              onClick={() => setOpenOptions(!openOptions)}
              className={styles.span}
            >
              {`${options.adult}`}{" "}
              {options.adult === 1 ? "dorosły" : "dorosłych"} ·{" "}
              {`${options.children}`}{" "}
              {options.children === 1 ? "dziecko" : "dzieci"} ·{" "}
              {`${options.room}`} {options.room === 1 ? "pokój" : "pokoje"}
            </span>
            {openOptions && (
              <ClickAwayListener onClickAway={() => setOpenOptions(false)}>
                <Box className={styles.options}>
                  <Box className={styles.optionItem}>
                    <span className={styles.optionText}>Dorosli</span>
                    <Box className={styles.optionCounter}>
                      <IconButton
                        disabled={options.adult <= 1}
                        onClick={() => handleOption("adult", "decrease")}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <span className={styles.optionCounterNumber}>
                        {options.adult}
                      </span>
                      <IconButton
                        onClick={() => handleOption("adult", "increase")}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box className={styles.optionItem}>
                    <span className={styles.optionText}>Dzieci</span>
                    <Box className={styles.optionCounter}>
                      <IconButton
                        disabled={options.children <= 0}
                        onClick={() => handleOption("children", "decrease")}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <span className={styles.optionCounterNumber}>
                        {options.children}
                      </span>
                      <IconButton
                        onClick={() => handleOption("children", "increase")}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box className={styles.optionItem}>
                    <span className={styles.optionText}>Pokoje</span>
                    <Box className={styles.optionCounter}>
                      <IconButton
                        disabled={options.room <= 1}
                        onClick={() => handleOption("room", "decrease")}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <span className={styles.optionCounterNumber}>
                        {options.room}
                      </span>
                      <IconButton
                        disabled={options.room >= 4}
                        onClick={() => handleOption("room", "increase")}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </ClickAwayListener>
            )}
          </Box>
          <Box className={styles.searchItem}>
            <Button
              onClick={search}
              variant="contained"
              color="success"
              sx={{ ml: 3 }}
            >
              Szukaj
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
}
