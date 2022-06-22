import {
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
  Select,
  MenuItem,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  InputLabel,
  Divider,
  TextareaAutosize,
} from "@mui/material";
import { useState, useRef } from "react";
import { ButtonLoading } from "../../../../components/UI/ButtonLoading/ButtonLoading";

export function AddHotel(props) {
  const imageRef = useRef();
  const [form, setForm] = useState({
    name: "",
    description: "",
    city: "",
    rooms: 2,
    features: [],
    image: null,
    status: "0",
  });

  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    setLoading(true);
    e.preventDefault();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const changeFeatureHandler = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const newFeatures = [...form.features, value];
      setForm({ ...form, features: newFeatures });
    } else {
      const newFeatures = form.features.filter((x) => x !== value);
      setForm({ ...form, features: newFeatures });
    }
  };

  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <Box component="form" autoComplete="off" onSubmit={submit}>
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
                <TextField
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  type="text"
                  label="Nazwa"
                  fullWidth
                />
                <TextField
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  type="text"
                  label="Miejscowość"
                  fullWidth
                />
                <TextareaAutosize
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  minRows={5}
                  placeholder="Opis"
                  fullWidth
                />
              </FormGroup>

              <FormGroup sx={{ my: 1 }}>
                <InputLabel id="number-of-rooms">Ilość pokoi</InputLabel>
                <Select
                  value={form.rooms}
                  onChange={(e) => setForm({ ...form, rooms: e.target.value })}
                  labelId="number-of-rooms "
                  fullWidth
                  label="Ilość pokoi"
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
                  <FormControlLabel
                    value="tv"
                    checked={form.features.find((x) => x === "tv")}
                    onChange={changeFeatureHandler}
                    control={<Checkbox />}
                    label="TV"
                  />
                  <FormControlLabel
                    value="wifi"
                    checked={form.features.find((x) => x === "wifi")}
                    onChange={changeFeatureHandler}
                    control={<Checkbox />}
                    label="WiFi"
                  />
                  <FormControlLabel
                    value="parking"
                    checked={form.features.find((x) => x === "parking")}
                    onChange={changeFeatureHandler}
                    control={<Checkbox />}
                    label="Parking"
                  />
                </FormGroup>

                <FormGroup sx={{ my: 1 }}>
                  <FormLabel>Dodaj zdjęcie</FormLabel>
                  <input
                    ref={imageRef}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files })
                    }
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
                  <FormLabel>Status</FormLabel>
                  <RadioGroup name="radio-buttons-group" defaultValue="Tak">
                    <FormControlLabel
                      value="1"
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      checked={form.status === "1"}
                      control={<Radio />}
                      label="Aktywny"
                    />
                    <FormControlLabel
                      value="0"
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                      checked={form.status === "0"}
                      control={<Radio />}
                      label="Ukryty"
                    />
                  </RadioGroup>
                </FormGroup>
              </Box>

              <ButtonLoading loading={loading} label="Zapisz" color="success" />
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
}
