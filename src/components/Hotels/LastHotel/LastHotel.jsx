import { Card, Grid } from "@mui/material";
import { Container } from "@mui/system";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function LastHotel(props) {
  return (
    <Container>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: "#ffc107" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Ostatnio oglądałeś ten hotel. Wciąż zainteresowany?
              </Typography>
            </CardContent>
            <CardContent
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
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
            <CardActions sx={{ ml: "auto", width: 150 }}>
              <Button
                size="small"
                variant="contained"
                sx={{ backgroundColor: "#b28704" }}
              >
                Tak
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ backgroundColor: "#b28704" }}
                onClick={props.onRemove}
              >
                Nie
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
