import {
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  InputLabel,
  Divider,
} from "@mui/material";
import { ButtonLoading } from "../../../../components/UI/ButtonLoading/ButtonLoading";

export function AddHotel(props) {
  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <Box
          component="form"
          sx={
            {
              // display: "flex",
              // flexDirection: "column",
              // "& .MuiTextField-root": { m: 1 },
              // justifyContent: "center",
              // alignItems: "center",
            }
          }
          autoComplete="off"
        >
          <CardHeader title="Nowy hotel" />
          <Divider />

          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                "& .MuiTextField-root": { my: 1 },
              }}
            >
              <FormGroup>
                <FormLabel>Uzupełnij dane hotelu</FormLabel>
                <TextField type="text" label="Nazwa" fullWidth />
                <TextField type="text" label="Miejscowość" fullWidth />
              </FormGroup>

              <FormGroup sx={{ my: 1 }}>
                <InputLabel id="number-of-rooms">Ilość pokoi</InputLabel>
                <Select
                  labelId="number-of-rooms "
                  fullWidth
                  label="Ilość pokoi"
                  defaultValue={1}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormGroup>

              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <FormGroup sx={{ my: 1 }}>
                  <FormLabel>Udogodnienia</FormLabel>
                  <FormControlLabel control={<Checkbox />} label="TV" />
                  <FormControlLabel control={<Checkbox />} label="WiFi" />
                  <FormControlLabel control={<Checkbox />} label="Parking" />
                </FormGroup>

                <FormGroup sx={{ my: 1 }}>
                  <FormLabel>Dodaj zdjęcie</FormLabel>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="raised-button-file">
                    <Button
                      fullWidth
                      variant="contained"
                      component="span"
                      sx={{ mt: 1 }}
                    >
                      Dodaj
                    </Button>
                  </label>
                </FormGroup>

                <FormGroup sx={{ my: 1 }}>
                  <FormLabel>Aktywny</FormLabel>
                  <RadioGroup name="radio-buttons-group" defaultValue="Tak">
                    <FormControlLabel
                      value="Tak"
                      control={<Radio />}
                      label="Tak"
                    />
                    <FormControlLabel
                      value="Nie"
                      control={<Radio />}
                      label="Nie"
                    />
                  </RadioGroup>
                </FormGroup>
              </Box>

              <Button variant="contained">Zapisz</Button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
}
