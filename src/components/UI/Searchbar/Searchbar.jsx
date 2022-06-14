import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Searchbar(props) {
  const [term, setTerm] = useState("");
  const history = useNavigate(props);

  const search = () => {
    history(`/wyszukaj/${term}`);
  };

  const updateTerm = (e) => {
    setTerm(e.target.value);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fefb", px: 8, py: 1.3, borderRadius: 3.5 }}>
      <TextField
        value={term}
        onKeyDown={onKeyDownHandler}
        onChange={updateTerm}
        size="small"
        sx={{ mr: 1 }}
        label="Wyszukaj hotelu..."
      />
      <Button variant="contained" onClick={search}>
        Szukaj
      </Button>
    </Box>
  );
}
