import { useParams } from "react-router-dom";
import { Container, Box, Typography, IconButton, Button } from "@mui/material";
import { objectToArray } from "../../helpers/objects";
import axios from "axios";
import { useEffect, useState } from "react";
import { Hotels } from "../../components/Hotels/Hotels";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./Search.module.css";

export function Search(props) {
  const { term } = useParams();
  const [hotels, setHotels] = useState([]);
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

  useEffect(() => {
    const searchHandler = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/hotels.json`
        );

        const newHotel = objectToArray(res.data).filter((hotel) =>
          hotel.city.includes(term)
        );

        setHotels(newHotel);
      } catch (err) {
        console.log(err.response);
      }
    };

    searchHandler();
  }, [term]);

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
      <Box className={styles.listContainer}>
        <Box className={styles.listSearch}>
          <Typography className={styles.listTitle}>Szukaj</Typography>
          <Box className={styles.listItem}>
            <label>Cel podróży</label>
            <input type="text" />
          </Box>
          <Box className={styles.listItem}>
            <label>Data podróży</label>
            <span
              onClick={() => setOpenDate(!openDate)}
              className={styles.span}
            >{`od ${format(date[0].startDate, "dd/MM/yyyy")} do ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                className={styles.date}
              />
            )}
          </Box>
          <Box className={styles.listItem}>
            <label>Liczba osób i pokoi</label>
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
            )}
          </Box>
          <Button variant="contained" color="primary" fullWidth>
            Szukaj
          </Button>
        </Box>
        <Box className={styles.listResult}>
          <Typography variant="h4" sx={{ ml: 1 }}>
            Wyniki dla {term}:{" "}
          </Typography>
          <Hotels hotels={hotels} medium={12} />
        </Box>
      </Box>
    </Container>
  );
}
