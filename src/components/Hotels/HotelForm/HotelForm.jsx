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
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../../hooks/useAuth";
import { ButtonLoading } from "../../UI/ButtonLoading/ButtonLoading";

const schema = yup.object().shape({
  name: yup.string().required("Nazwa hotelu jest wymagana"),
  city: yup.string().required("Miejscowość jest wymagana"),
  description: yup.string().required("Opis jest wymagany"),
  price: yup
    .number()
    .typeError("Cena musi składać się z cyfr")
    .required("Cena jest wymagana"),
});

export function HotelForm(props) {
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const featuresOptions = [
    {
      label: "TV",
      value: "tv",
    },
    {
      label: "Wi-Fi",
      value: "wifi",
    },
    {
      label: "Parking",
      value: "parking",
    },
  ];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => {
      return props.hotel;
    }, [props]),
  });

  const formSubmitHandler = async (data) => {
    setLoading(true);

    try {
      props.onSubmit({
        name: data.name,
        description: data.description,
        city: data.city,
        rooms: data.rooms,
        features: data.features,
        status: data.status,
        user_id: auth.userId,
      });
    } catch (err) {
      console.log(err.response);
    }

    setLoading(false);
  };

  useEffect(() => {
    reset(props.hotel);
  }, [props.hotel, reset]);

  return (
    <Container>
      <Card sx={{ mt: 2 }}>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(formSubmitHandler)}
        >
          <CardHeader title={props.title} />
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
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nazwa"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name?.message : ""}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Miejscowość"
                      error={!!errors.city}
                      helperText={errors.city ? errors.city?.message : ""}
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Opis"
                      error={!!errors.description}
                      helperText={
                        errors.description ? errors.description?.message : ""
                      }
                      multiline
                      autoComplete="off"
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cena za noc"
                      error={!!errors.price}
                      helperText={errors.price ? errors.price?.message : ""}
                      autoComplete="off"
                    />
                  )}
                />
              </FormGroup>

              <FormGroup sx={{ my: 1 }}>
                <InputLabel id="number-of-rooms">Ilość pokoi</InputLabel>
                <Controller
                  name="rooms"
                  id="number-of-rooms"
                  defaultValue={2}
                  control={control}
                  render={({ field }) => (
                    <Select labelId="number-of-rooms" {...field}>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  )}
                />
              </FormGroup>

              <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <FormGroup sx={{ my: 1 }}>
                  <FormLabel>Udogodnienia</FormLabel>
                  <Controller
                    name="features"
                    defaultValue={[]}
                    control={control}
                    render={({ field }) => (
                      <>
                        {featuresOptions.map((featureOption) => (
                          <FormControlLabel
                            key={featureOption.value}
                            label={featureOption.label}
                            control={
                              <Checkbox
                                value={featureOption.value}
                                checked={field.value.some(
                                  (existingValue) =>
                                    existingValue === featureOption.value
                                )}
                                onChange={(event, checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...field.value,
                                      event.target.value,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (value) => value !== event.target.value
                                      )
                                    );
                                  }
                                }}
                              />
                            }
                          />
                        ))}
                      </>
                    )}
                  />
                </FormGroup>

                <FormGroup sx={{ my: 1 }}>
                  <FormLabel>Dodaj zdjęcie</FormLabel>
                  <Controller
                    name="img"
                    control={control}
                    defaultValue={""}
                    render={({ field }) => (
                      <label htmlFor="contained-button-file">
                        <input
                          {...field}
                          id="contained-button-file"
                          accept="image/*"
                          type="file"
                          style={{ display: "none" }}
                        />
                        <Button
                          fullWidth
                          variant="contained"
                          component="span"
                          sx={{ mt: 1 }}
                        >
                          Dodaj
                        </Button>
                      </label>
                    )}
                  />
                </FormGroup>

                <FormGroup sx={{ my: 1 }}>
                  <FormLabel>Status</FormLabel>
                  <Controller
                    control={control}
                    name="status"
                    defaultValue={"1"}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="Aktywny"
                        />
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="Ukryty"
                        />
                      </RadioGroup>
                    )}
                  />
                </FormGroup>
              </Box>

              <ButtonLoading
                loading={loading}
                label={props.buttonText}
                color="success"
              />
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
}
