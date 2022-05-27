import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
  Chip,
} from "@mui/material";

import hotelImg from "../../../assets/images/PrzykladowyHotel.jpg";

export function Hotel(props) {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ backgroundColor: "#f0f0f0" }}>
        <CardActionArea>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <CardMedia
                component="img"
                height="170"
                image={hotelImg}
                alt="Hotel image"
              />
            </Grid>
            <Grid item xs={5}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {props.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {props.city}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item>
              <CardContent sx={{ pr: 0 }}>
                <Chip label={props.rating} color="primary" />
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
