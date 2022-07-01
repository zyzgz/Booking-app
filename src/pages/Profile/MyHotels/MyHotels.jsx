import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Paper,
  TableRow,
  Chip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { objectToArray } from "../../../helpers/objects";
import useAuth from "../../../hooks/useAuth";

export function MyHotels(props) {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);

  const navigateTo = () => {
    navigate("/profil/hotele/dodaj-nowy-hotel");
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/hotels/${id}.json`);
      setHotels(hotels.filter((x) => x.id !== id));
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/hotels.json`
        );

        const newHotel = objectToArray(res.data).filter(
          (hotel) => hotel.user_id === auth.userId
        );

        setHotels(newHotel);
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchHotels();
  }, [auth.userId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {hotels ? (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table sx={{ minWidth: 400 }}>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>Nazwa</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Opcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hotels.map((hotel) => (
                <TableRow key={hotel.id}>
                  <TableCell>{hotel.name}</TableCell>
                  <TableCell>
                    {hotel.status === "1" ? (
                      <Chip
                        color="success"
                        label="aktywny"
                        variant="outlined"
                      />
                    ) : (
                      <Chip
                        sx={{ color: "#bdbdbd" }}
                        label="ukryty"
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      <Button
                        component={Link}
                        to={`/profil/hotele/edytuj/${hotel.id}`}
                        variant="contained"
                        color="warning"
                      >
                        Edytuj
                      </Button>
                      <Button
                        onClick={() => deleteHandler(hotel.id)}
                        variant="contained"
                        color="error"
                      >
                        Usuń
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Nie masz jeszcze żadnego hotelu.</Typography>
      )}
      <Button
        onClick={navigateTo}
        variant="contained"
        sx={{ m: 1, width: "25ch" }}
      >
        Dodaj hotel
      </Button>
    </Box>
  );
}
