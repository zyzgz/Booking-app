import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingIcon } from "../../components/UI/LoadingIcon/LoadingIcon";
import axios from "axios";
import {
  Container,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import hotelImg from "../../assets/images/PrzykladowyHotel.jpg";
import { ContactForm } from "./ContactForm/ContactForm";

export function Hotel() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchHotel = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/hotels/${id}.json`
      );

      setHotel(res.data);
    } catch (err) {
      console.log(err.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotel();
  });

  return loading ? (
    <LoadingIcon />
  ) : (
    <Container>
      <Card sx={{ mt: 2 }}>
        <CardMedia
          component="img"
          height="370"
          image={hotelImg}
          alt="Hotel image"
        />

        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5">
              {hotel.name}
            </Typography>
            <Typography>
              Miejscowość:{" "}
              <Chip label={hotel.city} variant="outlined" component="span" />
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography color="text.secondary">{hotel.description}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>
            Dostępna liczba pokoi:{" "}
            <Chip label={hotel.rooms} variant="outlined" component="span" />
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>Udogodnienia: {hotel.features + " "}</Typography>
          <Divider sx={{ mt: 2, mb: 1 }} />
        </CardContent>
        <CardActions sx={{ pt: 0, mb: 2 }}>
          <Button variant="outlined">Zarezerwuj</Button>
          <ContactForm />
        </CardActions>
      </Card>
    </Container>
  );
}
