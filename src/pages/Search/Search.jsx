import { useParams } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import { objectToArray } from "../../helpers/objects";
import axios from "axios";
import { useEffect, useState } from "react";
import { Hotels } from "../../components/Hotels/Hotels";
import styles from "./Search.module.css";
import { SideSearchbar } from "../../components/UI/SideSearchbar/SideSearchbar";

export function Search(props) {
  const { term } = useParams();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const searchHandler = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/hotels.json`
        );

        const newHotel = objectToArray(res.data).filter(
          (hotel) => hotel.city.includes(term) && hotel.status === "1"
        );

        setHotels(newHotel);
      } catch (err) {
        console.log(err.response);
      }
    };

    searchHandler();
  }, [term]);

  return (
    <Container>
      <Box className={styles.listContainer}>
        <SideSearchbar />
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
