import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
  Chip,
  Stack,
} from "@mui/material";

import hotelImg from "../../../assets/images/PrzykladowyHotel.jpg";

export function Hotel(props) {
  const clickHandler = () => {
    if (props.onOpen) {
      props.onOpen(props);
    }
  };

  return (
    <Grid item xs={12} md={props.medium}>
      <Card>
        <CardActionArea
          onClick={clickHandler}
          component={Link}
          to={`/hotele/${props.id}`}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
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
            <Grid item xs={3}>
              <CardContent>
                <Stack justifyContent="end">
                  <Chip label={props.rating ?? 0} color="primary" />
                </Stack>
              </CardContent>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
