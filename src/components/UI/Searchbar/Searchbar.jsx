import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Searchbar(props) {
  const [term, setTerm] = useState("");
  const history = useNavigate(props);

  const search = () => {
    // props.onSearch(term);
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
    <>
      <TextField
        value={term}
        onKeyDown={onKeyDownHandler}
        onChange={updateTerm}
        size="small"
        sx={{ mr: 1 }}
        label="Search..."
      />
      <Button variant="contained" onClick={search}>
        Search
      </Button>
    </>
  );
}
