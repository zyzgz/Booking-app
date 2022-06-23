import { Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export function ButtonLoading(props) {
  const buttonProps = { ...props };
  delete buttonProps.loading;

  return props.loading ? (
    <LoadingButton loading variant="contained" sx={{ m: 1, minWidth: 400 }}>
      Ładowanie...
    </LoadingButton>
  ) : (
    <Button
      {...buttonProps}
      type="submit"
      variant="contained"
      sx={{ m: 1, minWidth: 400 }}
    >
      {props.label}
    </Button>
  );
}
