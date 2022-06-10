import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export function Search(props) {
  const { term } = useParams();

  //   const searchHandler = (term) => {
  //     const newHotels = [...hotel].filter((x) =>
  //       x.name.toLowerCase().includes(term.toLowerCase())
  //     );
  //   };

  return (
    <Box>
      <Typography variant="h4">Wyniki dla frazy "{term}": </Typography>
    </Box>
  );
}
