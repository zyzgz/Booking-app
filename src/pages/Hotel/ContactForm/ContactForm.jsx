import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Divider } from "@mui/material";

export function ContactForm(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Zadaj pytanie
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Skontaktuj się z właścicielem obiektu</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Zadzwoń pod numer: +48 665 667 153
          </DialogContentText>
          <Divider />
          <DialogContentText>
            lub wypełnij formularz kontaktowy:{" "}
          </DialogContentText>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              "& .MuiTextField-root": { m: 1 },
              justifyContent: "center",
              alignItems: "center",
            }}
            autoComplete="off"
          >
            <TextField
              id="name"
              label="Twój adres email"
              placeholder="Wpisz adres email"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              id="name"
              label="Numer telefonu"
              placeholder="Wpisz numer telefonu"
              variant="standard"
              fullWidth
            />
            <TextField
              id="name"
              label="Temat"
              placeholder="Wpisz temat wiadomości"
              variant="standard"
              fullWidth
            />
            <TextField
              label="Wiadomość"
              placeholder="Wpisz treść wiadomości"
              variant="standard"
              multiline
              fullWidth
              rowsMax={4}
              type="text"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button onClick={handleClose}>Wyślij</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
