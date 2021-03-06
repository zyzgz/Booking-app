import { Container, Typography, Grid } from "@mui/material";
import { useMemo } from "react";

import { Hotel } from "./Hotel/Hotel";

export function Hotels(props) {
  const count = useMemo(() => {
    return props.hotels.length;
  }, [props.hotels.length]);

  return (
    <Container>
      <Typography component="div" variant="h5" sx={{ m: 1 }}>
        Oferty ({count}):
      </Typography>
      <Grid container spacing={2}>
        {props.hotels.map((hotel) => (
          <Hotel
            onOpen={props.onOpen}
            key={hotel.id}
            {...hotel}
            medium={props.medium}
          />
        ))}
      </Grid>
    </Container>
  );
}
