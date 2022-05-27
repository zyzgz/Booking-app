import { Container, Typography, Grid } from "@mui/material";

import { Hotel } from "./Hotel/Hotel";

export function Hotels(props) {
  return (
    <Container>
      <Typography component="div" variant="h5" sx={{ m: 1 }}>
        Offers:
      </Typography>
      <Grid container spacing={2}>
        {props.hotels.map((hotel) => (
          <Hotel key={hotel.id} {...hotel} />
        ))}
      </Grid>
    </Container>
  );
}
