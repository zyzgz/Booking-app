import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { objectToArray } from "../../helpers/objects";
import axios from "axios";
import { useEffect, useState } from "react";
import { Hotels } from "../../components/Hotels/Hotels";
import { Searchbar } from "../../components/UI/Searchbar/Searchbar";

export function Search(props) {
  const { term } = useParams();
  const [hotels, setHotels] = useState([]);

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

  return (
    <Box>
      <Searchbar />
      <Typography variant="h4">Wyniki dla frazy "{term}": </Typography>
      <Hotels hotels={hotels} />
    </Box>
  );
}
