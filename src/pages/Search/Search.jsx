import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { objectToArray } from "../../helpers/objects";
import axios from "axios";
import { useEffect, useState } from "react";
import { Hotels } from "../../components/Hotels/Hotels";

export function Search(props) {
  const { term } = useParams();
  const [hotels, setHotels] = useState([]);

  const searchHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/hotels.json`
      );

      const newHotel = objectToArray(res.data).filter((hotel) =>
        hotel.name.includes(term)
      );

      setHotels(newHotel);
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    searchHandler();
  }, [term]);

  return (
    <Box>
      <Typography variant="h4">Wyniki dla frazy "{term}": </Typography>
      <Hotels hotels={hotels} />
    </Box>
  );
}
