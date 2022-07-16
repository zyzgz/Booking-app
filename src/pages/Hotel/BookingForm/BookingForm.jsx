import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { Divider } from "@mui/material";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import styles from "./BookingForm.module.css";

export function BookingForm() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Zarezerwuj
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Zarezerwuj obiekt</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText sx={{ mb: 1 }}>
            Kiedy chcesz zatrzymać się w obiekcie?
          </DialogContentText>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
          />
          <DialogContentText sx={{ mb: 1 }}>
            Wybierz odpowiednią liczbę osób i pokoi
          </DialogContentText>
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
                <IconButton onClick={() => handleOption("adult", "increase")}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleClose}>Zarezerwuj</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
