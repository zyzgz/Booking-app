import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export function ButtonLoading(props) {
  return props.loading ? (
    <LoadingButton loading variant="contained" sx={{ m: 1, minWidth: 430 }}>
      Ładowanie...
    </LoadingButton>
  ) : (
    <Button type="submit" variant="contained" sx={{ m: 1, minWidth: 430 }}>
      {props.label}
    </Button>
  );
}
